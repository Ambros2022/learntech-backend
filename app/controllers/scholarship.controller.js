const db = require("../models");
const path = require("path");
const scholarships = db.scholarships;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");

const Op = db.Sequelize.Op;
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
  const { count: totalItems, rows: scholarships } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, scholarships, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.logo) {
      let avatar = req.files.logo;

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

      let IsUpload = avatar.mv("./storage/scholarships_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        logonames = "scholarships_logo/" + logoname;
      }
    }

    const scholarshipsDetails = await scholarships.create({
      name: req.body.name,
      slug: req.body.slug,
      conducted_by: req.body.conducted_by ? req.body.conducted_by : null,
      region: req.body.region ? req.body.region : null,
      rewards: req.body.rewards ? req.body.rewards : null,
      last_date: req.body.last_date ? req.body.last_date : null,
      status: req.body.status ? req.body.status : null,
      logo: logonames,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: scholarshipsDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = (req, res) => {
  const id = req.body.id;

  try {
    let logonames = "";
    let STREAD = {
      name: req.body.name,
      slug: req.body.slug,
      conducted_by: req.body.conducted_by,
      region: req.body.region ,
      rewards: req.body.rewards ,
      last_date: req.body.last_date && req.body.last_date !="null" ? req.body.last_date : null,
      status: req.body.status ? req.body.status : null,
    };

    if (req.files && req.files.logo) {
      let avatar = req.files.logo;

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

      let IsUpload = avatar.mv("./storage/scholarships_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        logonames = "scholarships_logo/" + logoname;
      }
      STREAD["logo"] = logonames;
    }

    scholarships.update(STREAD, {
      where: { id },
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

  let data_array = [];

  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  scholarships
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      subQuery: false,
      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.scholarships,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving scholarships.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  scholarships
    .findByPk(id, {})
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
          message: `Cannot find scholarships with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving scholarships with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  scholarships
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "scholarships  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete scholarships with id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete scholarships with id=" + id,
      });
    });
};
