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
  const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "created_at";
  var order = orderby ? orderby : "DESC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var condition = sendsearch.customseacrh(searchText, searchfrom);

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
  const diractoryname = "storage/app/backup/";
  const filename = filepath;


  await res.download(diractoryname + filename, filename, function (err) {
    if (err) {
      return res.status(500).send({
        status: 0,
        message: "Could not download the file. " + err,
      });

    
    }
  
  });
 
};

exports.backuprequest = async (req, res) => {
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

    let filePath = "./storage/app/backup/backup-" + datefromat + ".sql";

    let filename = "backup-" + datefromat + ".sql";
    const streamDetails = await databackup.create({
      title: "backup",
      path: filename,
      status: 1,
    });

    const result = await mysqldump({
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
      },
      dumpToFile: filePath,
    });
    // const result = await mysqldump({
    //   connection: {
    //     host: "localhost",
    //     user: "root",
    //     password: "",
    //     database: "bstudy",
    //   },
    //   dumpToFile: filePath,
    // });
    if (result) {
      await databackup.update(
        { status: 2 },
        {
          where: { path: filename },
        }
      );
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: filePath,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to databackup request",
      errors: error,
      status: 0,
    });
  }
};
