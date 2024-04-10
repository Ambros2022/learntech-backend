const db = require("../models");
const path = require("path");
const promopage = db.promopage;
const _ = require("lodash");

// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const fileTypes  = require("../config/fileTypes");
// Array of allowed files
const array_of_allowed_file_types = fileTypes.Imageformat;

// Allowed file size in mb
const allowed_file_size = 2;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: promopage } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, promopage, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.image) {
      let avatar = req.files.image;

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

      let logoname = "promo_image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/promo_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "promo_image/" + logoname;
      }
    }

    const promopageDetails = await promopage.create({
      title: req.body.title,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      description: req.body.description ? req.body.description : null,
      url: req.body.url,
      status: req.body.status,
      image: logonames,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: promopageDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

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
  promopage
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.promopage,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving promopages.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  promopage
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "promopage  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete Sub promopage with id=${id}. Maybe promopage was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete promopage with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  promopage
    .findByPk(id)
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
          message: `Cannot find promopage with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving promopage with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  try {
    let logonames = "";
    let STREAD = {
      title: req.body.title,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      description: req.body.description ? req.body.description : null,
      url: req.body.url,
      status: req.body.status,
    };

    if (req.files && req.files.image) {
      let avatar = req.files.image;

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

      let logoname = "promo_image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/promo_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "promo_image/" + logoname;
      }
      STREAD["image"] = logonames;
    }

    promopage.update(STREAD, {
      where: { id: req.body.id },
    });

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
