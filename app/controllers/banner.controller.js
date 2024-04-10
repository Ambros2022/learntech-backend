const db = require("../models");
const path = require("path");
const banner = db.banner;
const _ = require("lodash");
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
  const { count: totalItems, rows: banner } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, banner, totalPages, currentPage };
};

exports.create = async (req, res) => {
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

      let IsUpload = avatar.mv("./storage/banners/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "banners/" + image;
      }
    }

    if (images == " ") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const bannerDetails = await banner.create({
        title: req.body.title,
        link: req.body.link,
        description: req.body.description,
        status: req.body.status,
        promo_banner: req.body.promo_banner ? req.body.promo_banner:"Draft",
        image: images,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: bannerDetails,
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

    let addeddata = {
      title: req.body.title,
      link: req.body.link,
      description: req.body.description,
      status: req.body.status,
      promo_banner: req.body.promo_banner ? req.body.promo_banner:"Draft",
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

      let IsUpload = avatar.mv("./storage/banners/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "banners/" + image;

        addeddata.image = images; //req.body.image,
      }
    }

    banner.update(addeddata, {
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
  banner
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.banner,
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
  banner
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "banner deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `banner with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete banner with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  banner
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
          message: `Cannot find banner with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving banner with id=" + id,
      });
    });
};
