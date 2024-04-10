const db = require("../models");
const path = require("path");
const polytechnic = db.polytechnic;
const polytechnictype = db.polytechnictype;
const _ = require("lodash");
const polytechnicaccreditations = db.polytechnicaccreditations;
const polytechnicamenities = db.polytechnicamenities;
const polytechnicmanagment = db.polytechnicmanagment;
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
  const { count: totalItems, rows: polytechnic } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, polytechnic, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.polytechnic_logo) {
      let avatar = req.files.polytechnic_logo;

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

      let IsUpload = avatar.mv("./storage/polytechnic_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) logonames = "polytechnic_logo/" + logoname;
    }

    const polytechnicDetails = await polytechnic.create({
      polytechnic_name: req.body.polytechnic_name,
      polytechnic_slug: req.body.polytechnic_slug,
      area_id: req.body.area_id,
      city_id: req.body.city_id,
      polytechnic_type_id: req.body.polytechnic_type_id,
      status: req.body.status ? req.body.status : null,
      polytechnic_logo: logonames,
    });

    if (req.body.accreditation_id && polytechnicDetails.id) {
      const acccredations = JSON.parse(req.body.accreditation_id);
      _.forEach(acccredations, function (value) {
        polytechnicaccreditations.create({
          polytechnic_id: polytechnicDetails.id,
          accreditation_id: value.accreditation_id,
        });
      });
    }
    if (req.body.amenities_id && polytechnicDetails.id) {
      const amenities = JSON.parse(req.body.amenities_id);
      _.forEach(amenities, function (value) {
        polytechnicamenities.create({
          polytechnic_id: polytechnicDetails.id,
          amenities_id: value.amenities_id ? value.amenities_id : null,
        });
      });
    }
    if (req.body.management_id && polytechnicDetails.id) {
      const management = JSON.parse(req.body.management_id);
      _.forEach(management, function (value) {
        polytechnicmanagment.create({
          polytechnic_id: polytechnicDetails.id,
          management_id: value.management_id,
        });
      });
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: polytechnicDetails,
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
      polytechnic_name: req.body.polytechnic_name,
      polytechnic_slug: req.body.polytechnic_slug,
      area_id: req.body.area_id,
      city_id: req.body.city_id,
      polytechnic_type_id: req.body.polytechnic_type_id,
      status: req.body.status ? req.body.status : null,
    };

    if (req.files && req.files.polytechnic_logo) {
      let avatar = req.files.polytechnic_logo;

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

      let IsUpload = avatar.mv("./storage/polytechnic_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) logonames = "polytechnic_logo/" + logoname;
      STREAD[" polytechnic_logo"] = logonames;
    }

    polytechnic.update(STREAD, {
      where: { id },
    });

    if (req.body.accreditation_id && id) {
      polytechnicaccreditations.destroy({
        where: { polytechnic_id: id },
      });
      const acccredations = JSON.parse(req.body.accreditation_id);
      _.forEach(acccredations, function (value) {
        polytechnicaccreditations.create({
          polytechnic_id: id,
          accreditation_id: value.accreditation_id,
        });
      });
    }

    if (req.body.amenities_id && id) {
      polytechnicamenities.destroy({
        where: { polytechnic_id: id },
      });
      const acccredations = JSON.parse(req.body.amenities_id);
      _.forEach(acccredations, function (value) {
        polytechnicamenities.create({
          polytechnic_id: id,
          amenities_id: value.amenities_id,
        });
      });
    }

    if (req.body.management_id && id) {
      polytechnicmanagment.destroy({
        where: { polytechnic_id: id },
      });
      const acccredations = JSON.parse(req.body.management_id);
      _.forEach(acccredations, function (value) {
        polytechnicmanagment.create({
          polytechnic_id: id,
          management_id: value.management_id,
        });
      });
    }

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
  const {
    page,
    size,
    searchtext,
    searchfrom,
    city_id,
    area_id,
    polytechnic_type_id,
    columnname,
    orderby,
  } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var conditioncityid = city_id ? { city_id: city_id } : null;
  var conditionarea_id = area_id ? { area_id: area_id } : null;
  var conditionpolytechnic_type_id = polytechnic_type_id
    ? { polytechnic_type_id: polytechnic_type_id }
    : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditioncityid ? data_array.push(conditioncityid) : null;
  conditionarea_id ? data_array.push(conditionarea_id) : null;
  conditionpolytechnic_type_id
    ? data_array.push(conditionpolytechnic_type_id)
    : null;

  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  polytechnic
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      subQuery: false,
      include: [
        { association: "citys", attributes: ["id", "city_name"] },
        { association: "areas", attributes: ["id", "area_name"] },
        { association: "polytechnictype", attributes: ["id", "type"] },
        {
            association: "polytechnicaccreditations",
            attributes: ["id", "accreditation_id"],
          },
          {
            association: "polytechnicamenities",
            attributes: ["id", "amenities_id"],
          },
          {
            association: "polytechnicmanagment",
            attributes: ["id", "management_id"],
          },
      ],
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
        data: response.polytechnic,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving blog.",
      });
    });
};

exports.findOne = (req, res) => { 
  const id = req.params.id;
  polytechnic
    .findByPk(id, {
      include: [
        { association: "citys", attributes: ["id", "city_name"] },
        { association: "areas", attributes: ["id", "area_name"] },
        { association: "polytechnictype", attributes: ["id", "type"] },
        {
          association: "polytechnicaccreditations",
          attributes: ["id", "accreditation_id"],
        },
        {
          association: "polytechnicamenities",
          attributes: ["id", "amenities_id"],
        },
        {
          association: "polytechnicmanagment",
          attributes: ["id", "management_id"],
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
          message: `Cannot find polytechnic with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving polytechnic with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  polytechnic
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "polytechnic  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete polytechnicwith id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete polytechnic with id=" + id,
      });
    });
};

exports.PolytechnictypefindAll = async (req, res) => {
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

  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  polytechnictype
    .findAndCountAll({
      where: data_array,
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
        data: response.polytechnic,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving polytechnictype",
      });
    });
};
