const db = require("../models");
const path = require('path');
const collegestream = db.college_stream;
// const stream = db.stream;
const Op = db.Sequelize.Op;

const sendsearch = require("../utility/Customsearch");

const _ = require('lodash');


const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: collegestream } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, collegestream, totalPages, currentPage };
};


exports.create = async (req, res) => {

  try {

    const collegestreamDetails = await collegestream.create({
      stream_id: req.body.stream_id,
      college_id: req.body.college_id,
    });


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: collegestreamDetails
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

exports.findAll = async (req, res, next) => {



  const { page, size, searchtext, searchfrom, stream_id, columnname, orderby } = req.query;


  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];

    orderconfig = [table, column, order];
  }

  var conditionStreamId = stream_id ? { stream_id: stream_id } : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);




  var data_array = [];
  conditionStreamId ? data_array.push(conditionStreamId) : null;
  condition ? data_array.push(condition) : null;



  const { limit, offset } = getPagination(page, size);
  College.findAndCountAll({
    where: data_array, limit, offset,
    // include: { association: 'stream', attributes: ['id', 'name']} ,
    order: [orderconfig]
  })
    .then(data => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.collegestream
      });


    });

};


exports.delete = (req, res) => {
  const id = req.params.id;
  collegestream.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'college stream  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: ` delete college stream with id=${id}. Maybe college stream was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete college stream with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  collegestream.findByPk(id,

    { include: { association: 'stream', attributes: ['id', 'name'] } })

    .then(data => {
      if (data) {


        res.status(200).send({
          status: 1,
          message: 'successfully retrieved',
          data: data

        });

      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find college stream with id=${id}.`

        });


      }
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving college stream with id=" + id

      });
    });
};


exports.update = (req, res) => {
  const id = req.body.id;

  try {

    collegestream.update({
      stream_id: req.body.stream_id,
      college_id: req.body.college_id,
    }, {
      where: { id: req.body.id }
    });


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully'
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to update data',
      errors: error,
      status: 0
    });
  }

};