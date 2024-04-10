const db = require("../models");
const path = require("path");
const abroad_universities = db.abroad_universities;
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: abroad_universities } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, abroad_universities, totalPages, currentPage };
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, country_id, searchfrom, columnname, orderby } =
    req.query;
  // console.log(req.query);
  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var conditioncountry_id = country_id ? { country_id: country_id } : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditioncountry_id ? data_array.push(conditioncountry_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  abroad_universities
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: { association: "country", attributes: ["id", "country_name"] },
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
        data: response.abroad_universities,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving abroad_universities.",
      });
    });
};

exports.create = async (req, res) => {
  try {
    const abroad_universitiesDetails = await abroad_universities.create({
      university_name: req.body.university_name,
      country_id: req.body.country_id,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: abroad_universitiesDetails,
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
  abroad_universities
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "abroad_universities deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `abroad_universities  with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete abroad_universities with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.body.id;

  try {
    abroad_universities.update(
      {
        university_name: req.body.university_name,
        country_id: req.body.country_id,
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
  abroad_universities
    .findByPk(id, {
      include: { association: "country", attributes: ["id", "country_name"]  },
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
          message: `Cannot find abroad_universities with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving abroad_universities with id=" + id,
      });
    });
};
