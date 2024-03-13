const db = require("../models");
const path = require("path");
const team = db.team;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
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
  const { count: totalItems, rows: team } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, team, totalPages, currentPage };
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

      let logoname = "photo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/team/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "team/" + logoname;
      }
    }

    const teamDetails = await team.create({
      name: req.body.name,
      designation: req.body.designation,
      type: req.body.type,
      linked_in_link: req.body.linked_in_link ? req.body.linked_in_link : null,
      photo: logonames,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: teamDetails,
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
  team
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.team,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  team
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "team  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete  team with id=${id}. Maybe team was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete team with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  team
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
          message: `Cannot find team with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving team with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  try {
    let logonames = "";
    let STREAD = {
      name: req.body.name,
      designation: req.body.designation,
      type: req.body.type,
      linked_in_link: req.body.linked_in_link ? req.body.linked_in_link : null,
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

      let logoname = "photo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/team/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "team/" + logoname;
      }
      STREAD["photo"] = logonames;
    }
    team.update(STREAD, {
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
