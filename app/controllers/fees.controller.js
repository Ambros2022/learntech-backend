
const db = require("../models");
const path = require("path");
const courses = db.courses;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;

const fees = db.fees;

const fee_details = db.fee_details; // Array of allowed files




const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: fees } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, fees, totalPages, currentPage };
};

exports.create = async (req, res) => {
  //  const obj = JSON.parse(req.body.mac);
  // var messages = Array.prototype.slice.call(req.body.mac);
  //req.body['mac[]'].length

  try {
    const id1 = req.body.course_id;
    const fee = await fees.create({
      course_id: id1,
      type: req.body.type,
      title: req.body.title,

      note: req.body.note,
      total_amount: req.body.total_amount,
    });

    if (req.body.feedetail && fee.id) {
      const feedetail = JSON.parse(req.body.feedetail);

      _.forEach(feedetail, function (value) {
        fee_details.create({
          fee_id: fee.id,
          sub_title: value.sub_title,
          amount: value.amount,
        });
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: fee_details,
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
  try {
    const id = req.body.id;
    fees.update(
      {
        course_id: req.body.course_id,
        type: req.body.type,
        title: req.body.title,

        note: req.body.note,
        total_amount: req.body.total_amount,
      },
      {
        where: { id },
      }
    );
    if (req.body.feedetail && id) {
      fee_details.destroy({
        where: { fee_id: id },
      });
      const feedetail = JSON.parse(req.body.feedetail);

      _.forEach(feedetail, function (value) {
        fee_details.create({
          fee_id: id,
          sub_title: value.sub_title,
          amount: value.amount,
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
  fees
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.fees,
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
  fees
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "fees deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `fees swith id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete fees with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  fees
    .findByPk(id, {
      include: [
        { association: "feedetails", attributes: ["id","sub_title","amount"] },
       
      ]
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
          message: `Cannot find fees with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving fees with id=" + id,
      });
    });
};
