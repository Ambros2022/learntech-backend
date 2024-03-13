const db = require("../models");
const path = require("path");
const Amenities = db.amenities;
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
  const { count: totalItems, rows: Amenities } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Amenities, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.amenities_logo) {
      let avatar = req.files.amenities_logo;

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

      let IsUpload = avatar.mv("./storage/amenities_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "amenities_logo/" + logoname;
      }
    }
    if (logonames == "") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const AmenitiesDetails = await Amenities.create({
        amenities_name: req.body.amenities_name,
        amenities_slug: req.body.amenities_slug,
        amenities_logo: logonames,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: AmenitiesDetails,
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

exports.findAll = async (req, res) => {
  const { page, size, searchText, columnname, searchfrom, orderby } = req.query;

  var column = columnname ? columnname : "amenities_name";
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
  Amenities.findAndCountAll({
    where: condition,
    limit,
    offset,
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
        data: response.Amenities,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving Streams.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Amenities.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "Stream  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete Sub Stream with id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete Stream with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Amenities.findByPk(id)
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
          message: `Cannot find Stream with id=${id}.`,
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
  const id = req.body.id;

  try {
    let logonames = "";

    if (req.files && req.files.amenities_logo) {
      let avatar = req.files.amenities_logo;

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

      let IsUpload = avatar.mv("./storage/amenities_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "amenities_logo/" + logoname;
      }
    }

    Amenities.update(
      {
        amenities_name: req.body.amenities_name,
        amenities_slug: req.body.amenities_slug,

        amenities_logo: logonames,
      },
      {
        where: { id: req.body.id },
      }
    );

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
