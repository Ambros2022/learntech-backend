const db = require("../models");
const Redirect = db.redirecturl;
const sendsearch = require("../utility/Customsearch");

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: Redirect } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, Redirect, totalPages, currentPage };
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby } =
    req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }


  let condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  Redirect
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
        data: response.Redirect,
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
    const RedirectDetails = await Redirect.create({
      old_url: req.body.old_url,
      new_url: req.body.new_url,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: RedirectDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  Redirect
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
          message: `Cannot find Redirect with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Redirect with id=" + id,
      });
    });
};

exports.update = (req, res) => {

  try {
    Redirect.update(
      {
        old_url: req.body.old_url,
        new_url: req.body.new_url,
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
exports.delete = (req, res) => {
  const id = req.params.id;
  Redirect
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "Redirect deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Redirect  with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete Redirect with id=" + id,
      });
    });
};


