const db = require("../models");
const path = require("path");
const author = db.author;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
// Array of allowed files

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
  const { count: totalItems, rows: author } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, author, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.photo) {
      let avatar = req.files.photo;

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

      let IsUpload = avatar.mv("./storage/author_photo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "author_photo/" + logoname;
      }
    }

    const authorDetails = await author.create({
      author_name: req.body.author_name,
      designation: req.body.designation ? req.body.designation : null,
      photo: logonames ? logonames : null,
      description: req.body.description ? req.body.description : null,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: authorDetails,
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
  const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var condition = sendsearch.customseacrh(searchText, searchfrom);

  const { limit, offset } = getPagination(page, size);
  author
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.author,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving author.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  author
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "author  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete author with id=${id}. Maybe author was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete author with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  author
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
          message: `Cannot find author with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving stream with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  try {
    let logonames = "";
    let STREAD = {
      author_name: req.body.author_name,
      designation: req.body.designation ? req.body.designation : null,
      description: req.body.description ? req.body.description : null,
    };

    if (req.files && req.files.photo) {
      let avatar = req.files.photo;

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

      let IsUpload = avatar.mv("./storage/author_photo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "author_photo/" + logoname;
      }
      STREAD["photo"] = logonames;
    }

    author.update(STREAD, {
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
