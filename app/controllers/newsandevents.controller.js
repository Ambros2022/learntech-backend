const db = require("../models");
const newsandevents = db.news_and_events;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");
const path = require("path");
const fileTypes = require("../config/fileTypes");
// / Function to remove a file
const fs = require("fs").promises;

async function removeFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }
}

// Array of allowed files
const array_of_allowed_file_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
  "image/webp",
  "application/pdf"  // Added PDF file type
];
// Allowed file size in mb
const allowed_file_size = 10;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: newsandevents } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, newsandevents, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let bannerimages = "";
    let pdffiles = "";

    if (req.files && req.files.banner_image) {
      let avatar = req.files.banner_image;

      // Check if the uploaded file is allowed
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type ",
          errors: {},
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large ",
          errors: {},
          status: 0,
        });
      }

      let logoname = "logo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/news_banner_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        bannerimages = "news_banner_image/" + logoname;
      }
    }

    if (req.files && req.files.pdf_file) {
      let avatar = req.files.pdf_file;

      // Check if the uploaded file is allowed
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type ",
          errors: {},
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large ",
          errors: {},
          status: 0,
        });
      }

      let logoname = "logo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/news_pdf_file/" + logoname) ? 1 : 0;

      if (IsUpload) {
        pdffiles = "news_pdf_file/" + logoname;
      }
    }


    const newsandeventsDetails = await newsandevents.create({
      category_id: req.body.category_id,
      name: req.body.name,
      slug: req.body.slug,
      banner_image: bannerimages,
      pdf_file: pdffiles,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      overview: req.body.overview,
      status: req.body.status,
    });
    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: newsandeventsDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = async (req, res) => {

  try {

    const existingRecord = await newsandevents.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }


    const newsandeventsUpdates = {
      category_id: req.body.category_id || existingRecord.category_id,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      overview: req.body.overview || existingRecord.overview,
      status: req.body.status || existingRecord.status,

    };
    if (req.files && req.files.banner_image) {
      const avatar = req.files.banner_image;

      // Check if the uploaded file is allowed
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type ",
          errors: {},
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large ",
          errors: {},
          status: 0,
        });
      }

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const UploadPath = "./storage/news_banner_image/" + logoname;

      await avatar.mv(UploadPath);

      newsandeventsUpdates.banner_image = "news_banner_image/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.banner_image) {
        const oldLogoPath = "./storage/" + existingRecord.banner_image;
        await removeFile(oldLogoPath);
      }
    }
    if (req.files && req.files.pdf_file) {
      const avatar = req.files.pdf_file;

      // Check if the uploaded file is allowed
      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type ",
          errors: {},
          status: 0,
        });
      }

      if (avatar.size / (1024 * 1024) > allowed_file_size) {
        return res.status(400).send({
          message: "File too large ",
          errors: {},
          status: 0,
        });
      }

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const UploadPath = "./storage/news_pdf_file/" + logoname;

      await avatar.mv(UploadPath);

      newsandeventsUpdates.pdf_file = "news_pdf_file/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.pdf_file) {
        const oldLogoPath = "./storage/" + existingRecord.pdf_file;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await newsandevents.update(newsandeventsUpdates, { where: { id: req.body.id } });


    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 0,
    });
  }
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, columnname, searchfrom, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];
  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  const { limit, offset } = getPagination(page, size);
  newsandevents
    .findAndCountAll({
      where: condition, limit, offset,
      include: [
        {
          required: false,
          association: "newscategories",
          attributes: ["id", "name"],
        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.newsandevents,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving newsandevents.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  newsandevents
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "newsandevents  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete newsandevents with id=${id} maybe not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete newsandevents  with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  newsandevents
    .findByPk(id, {
      include: [
        {
          required: false,
          association: "newscategories",
          attributes: ["id", "name"],
        },


      ],
    })
    .then((data) => {
      if (data) {
        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find newsandevents with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving newsandevents with id=" + id,
      });
    });
};
