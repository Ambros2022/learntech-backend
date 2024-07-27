const db = require("../models");
const youtubevideos = db.youtubevideos;
const sendsearch = require("../utility/Customsearch");
const path = require("path");
// const streamT = db.stream;
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
  const { count: totalItems, rows: youtubevideos } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, youtubevideos, totalPages, currentPage };
};

exports.create = async (req, res) => {
  // return console.log(req.files.Img_thumbnail)
  try {
    let logonames = "";
    if (req.files && req.files.Img_thumbnail) {
      let avatar = req.files.Img_thumbnail;

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

      let logoname = "Img_thumbnail" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/youtubevideo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "youtubevideo/" + logoname;
      }
    }
    // return console.log(logonames);
    let listingvalue =
      req.body.listing_order == 0 || req.body.listing_order == "null"
        ? null
        : req.body.listing_order;

    const youtubevideodetails = await youtubevideos.create({
      name: req.body.name,
      embed_id: req.body.embed_id,
      status:
        req.body.status && req.body.status !== "" ? req.body.status : null,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      listing_order: listingvalue,
      Img_thumbnail: logonames,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: youtubevideodetails,
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
  try {
    let logonames = "";
    let listingvalue =
      req.body.listing_order == 0 || req.body.listing_order == "null"
        ? null
        : req.body.listing_order;
    let STREAD = {
      name: req.body.name,
      embed_id: req.body.embed_id,
      status: req.body.status ? req.body.status : null,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      listing_order: listingvalue,
    };
    if (req.files && req.files.Img_thumbnail) {
      let avatar = req.files.Img_thumbnail;

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

      let IsUpload = avatar.mv("./storage/Img_thumbnail/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "Img_thumbnail/" + logoname;
        STREAD["Img_thumbnail"] = logonames;
      }
    }

    youtubevideos.update(STREAD, {
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

  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  youtubevideos
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
        data: response.youtubevideos,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving youtubevideos.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  youtubevideos
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
        ],
      },
      subQuery: false,
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
          message: `Cannot find youtubevideos with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err.message,
        message: "Error retrieving youtubevideos with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  youtubevideos
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "youtubevideos  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: ` delete youtubevideos with id=${id}. Maybe youtubevideos was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete youtubevideos with id=" + id,
      });
    });
};
