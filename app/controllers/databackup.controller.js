const db = require("../models");
const path = require("path");
const databackup = db.databackup;
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
const fs = require("fs");
const mysqldump = require("mysqldump");
require("dotenv").config();

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: databackup } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, databackup, totalPages, currentPage };
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "created_at";
  var order = orderby ? orderby : "DESC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  databackup
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.databackup,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving databackup Files.",
      });
    });
};

exports.downloadfile = async (req, res) => {
  const file = req.params.file;
  // const { file } = req.query;
  var filepath = file ? file : "";
  const diractoryname = "storage/database_backup/";
  const filename = filepath;


  res.download(diractoryname + filename, filename, function (err) {
    if (err) {
      if (!res.headersSent) {
        return res.status(500).send({
          status: 0,
          message: "Could not download the file. " + err,
        });
      } else {
        console.error("Error during download: ", err);
      }
    }
  });
 
};

// Helper to keep only the latest 4 backups and delete older files & records
const cleanupOldBackups = async () => {
  try {
    const backupDir = "./storage/database_backup";
    // Find all database backup records ordered by created_at DESC
    const allBackups = await databackup.findAll({
      order: [["created_at", "DESC"]],
    });

    const keepLimit = 4;
    if (allBackups.length > keepLimit) {
      const toDelete = allBackups.slice(keepLimit);
      for (const item of toDelete) {
        // Delete the file on disk if it exists
        if (item.path) {
          const fileToDel = path.join(backupDir, item.path);
          if (fs.existsSync(fileToDel)) {
            try {
              fs.unlinkSync(fileToDel);
            } catch (unlinkError) {
              console.error(`❌ Failed to delete old backup file: ${fileToDel}`, unlinkError);
            }
          }
        }
        // Delete the database entry
        await databackup.destroy({ where: { id: item.id } });
      }
      console.log(`🧹 Successfully cleaned up ${toDelete.length} old backups, keeping the latest ${keepLimit}.`);
    }
  } catch (error) {
    console.error("❌ Error during database backup cleanup:", error);
  }
};

exports.backuprequest = async (req, res) => {
  let filename = "";
  let filePath = "";
  try {
    let date = new Date();
    var day = date.getDate();
    var month = (date.getMonth() + 1).toString().padStart(2, "0");
    var year = date.getFullYear();
    var h = date.getHours();
    var m = date.getMinutes();
    var s = date.getSeconds();

    let datefromat =
      year + "-" + month + "-" + day + "-" + h + "_" + m + "_" + s;

    // Ensure the backup directory exists recursively
    const backupDir = "./storage/database_backup";
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    filePath = backupDir + "/backup-" + datefromat + ".sql";
    filename = "backup-" + datefromat + ".sql";

    const streamDetails = await databackup.create({
      title: "backup",
      path: filename,
      status: 1, // PROCESSING
    });

    // Configure SSL for remote databases (like DigitalOcean Managed MySQL)
    const isRemoteDb = process.env.DB_HOST && 
      !process.env.DB_HOST.includes("localhost") && 
      !process.env.DB_HOST.includes("127.0.0.1");
    const useSsl = process.env.DB_SSL === "true" || isRemoteDb;

    const result = await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
        ssl: useSsl ? { rejectUnauthorized: false } : undefined,
      },
      dumpToFile: filePath,
    });

    if (result) {
      await databackup.update(
        { status: 2 }, // COMPLETED
        {
          where: { path: filename },
        }
      );
      // Clean up old backups (keep latest 4 completed/failed entries)
      await cleanupOldBackups();
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: filePath,
    });
  } catch (error) {
    console.error("❌ Database backup error:", error);
    
    // Update status to 3 (Cancelled / Failed) in case of error
    if (filename) {
      try {
        await databackup.update(
          { status: 3 },
          {
            where: { path: filename },
          }
        );
      } catch (dbError) {
        console.error("❌ Failed to update backup status to failed:", dbError);
      }
    }

    return res.status(400).send({
      message: "Unable to databackup request",
      errors: error.message || error,
      status: 0,
    });
  }
};
