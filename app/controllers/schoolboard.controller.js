const db = require("../models");
const path = require("path");
const schoolboards = db.schoolboards;


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
  const { count: totalItems, rows: schoolboards } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, schoolboards, totalPages, currentPage };
};



exports.create = async (req, res) => {

  try {
      const schoolboardsDetails = await schoolboards.create({
          name: req.body.name,
          slug: req.body.slug,
      
  });

      res.status(200).send({
          status: 1,
          message: 'Data Save Successfully',
          data: schoolboardsDetails
      });
  }
  catch (error) {
      return res.status(400).send({
          message: 'Unable to insert data',
          errors: error,
          status: 0
      });
  }
}

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
  schoolboards
    .findAndCountAll({
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
        data: response.schoolboards,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving schoolboards.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  schoolboards
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "schoolboards  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete  schoolboards with id=${id}. Maybe schoolboards was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete schoolboards with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  schoolboards
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
          message: `Cannot find schoolboards with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving schoolboards with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  try {
    let logonames = "";

    let STREAD = {
      name: req.body.name,
      city_id: req.body.city_id,
      area_id: req.body.area_id,
      slug: req.body.slug,
      status: req.body.status,
      rank: req.body.rank,
      address: req.body.address,
      established: req.body.established,
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

      let IsUpload = avatar.mv("./storage/schoolboards_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        {
          logonames = "schoolboards_logo/" + logoname;
        }
        STREAD["logo"] = logonames;
      }
    }

    schoolboards.update(STREAD, {
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
