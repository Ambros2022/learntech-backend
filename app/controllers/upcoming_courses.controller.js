const db = require("../models");
const path = require("path");
const upcoming_courses = db.upcoming_courses;
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
  const { count: totalItems, rows: upcoming_courses } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, upcoming_courses, totalPages, currentPage };
};

exports.create = async (req, res) => {
  //  const obj = JSON.parse(req.body.mac);
  // var messages = Array.prototype.slice.call(req.body.mac);
  //req.body['mac[]'].length

  try {
    let images = " ";

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

      let image = "image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/upcoming_courses/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "upcoming_courses/" + image;
      }
    }

    if (images == " ") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const upcoming_coursesDetails = await upcoming_courses.create({
        course_name: req.body.course_name,
        slug: req.body.slug,

        belongs_to: req.body.belongs_to,
        image: images,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: upcoming_coursesDetails,
      });
    }
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
    let images = " ";
    let STREAD = {
      course_name: req.body.course_name,
      slug: req.body.slug,
      belongs_to: req.body.belongs_to,
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

      let image = "image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/upcoming_courses/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "upcoming_courses/" + image;
      }
      STREAD["image"] = images;
    }

  
      upcoming_courses.update(STREAD, {
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
  upcoming_courses
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.upcoming_courses,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving city.",
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  upcoming_courses
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "upcoming_courses deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `upcoming_courseswith id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete upcoming_courses with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  upcoming_courses
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
          message: `Cannot find upcoming_courses with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving upcoming_courses with id=" + id,
      });
    });
};
