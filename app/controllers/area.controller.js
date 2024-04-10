const db = require("../models");
const path = require("path");
const area = db.area;
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: area } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, area, totalPages, currentPage };
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, city_id, searchfrom, columnname, orderby } =
    req.query;
  console.log(req.query);
  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var conditioncity_id = city_id ? { city_id: city_id } : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditioncity_id ? data_array.push(conditioncity_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  area
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: { association: "city", attributes: ["id", "city_name"] },
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
        data: response.area,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving Sub streams.",
      });
    });
};

exports.create = async (req, res) => {
  try {
    const areaDetails = await area.create({
      area_name: req.body.area_name,
      area_slug: req.body.area_slug,
      area_description: req.body.area_description,
      city_id: req.body.city_id,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: areaDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  area
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "area deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `area  with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete area with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  try {
    area.update(
      {
        area_name: req.body.area_name,
        area_slug: req.body.area_slug,
        area_description: req.body.area_description,
        city_id: req.body.city_id ? req.body.city_id : null,
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

exports.findOne = (req, res) => {
  const id = req.params.id;
  area
    .findByPk(id, {
      include: { association: "city", attributes: ["id", "city_name"] },
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
          message: `Cannot find area with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving area with id=" + id,
      });
    });
};
