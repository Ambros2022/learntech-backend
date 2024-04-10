const db = require("../models");
const newsandevents = db.newsandevents;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");
const path = require("path");
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
  const { count: totalItems, rows: newsandevents } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, newsandevents, totalPages, currentPage };
};
exports.create = async (req, res) => {
  try {
    let logonames = "";

    if (req.files && req.files.cover_image) {
      let avatar = req.files.cover_image;

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
      console.log(logoname);

      let IsUpload = avatar.mv("./storage/news_event_cover/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        logonames = "news_event_cover/" + logoname;
      }
    }

    const newsandeventsDetails = await newsandevents.create({
      title: req.body.title,
      news_type: req.body.news_type,
      exam_id: req.body.exam_id ? req.body.exam_id : null,
      top_featured_order: req.body.top_featured_order,
      is_top_featured: req.body.is_top_featured,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      slug: req.body.slug,
      cover_image: logonames,
      body: req.body.body,
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
exports.update = (req, res) => {
  const id = req.body.id;
  try {
    let images = " ";
    let STREAD = {
      title: req.body.title,
      news_type: req.body.news_type,
      top_featured_order: req.body.top_featured_order,
      is_top_featured: req.body.is_top_featured,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      slug: req.body.slug,
      body: req.body.body,
      status: req.body.status,
      exam_id: req.body.exam_id ? req.body.exam_id : null,
    };
    if (req.files && req.files.cover_image) {
      let avatar = req.files.cover_image;

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

      let IsUpload = avatar.mv("./storage/news_event_cover/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "news_event_cover/" + image;
      }
      STREAD["cover_image"] = images;
    }

    newsandevents.update(STREAD, {
      where: { id: req.body.id },
    });

    res.status(200).send({
      status: 1,
      message: "Data updated Successfully",
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
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
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
      include: [{ association: "examnews", attributes: ["id", "exam_title"] }],
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
