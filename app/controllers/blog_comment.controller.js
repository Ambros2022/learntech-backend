const db = require("../models");
const path = require('path');
const Op = db.Sequelize.Op;
const blogcomment = db.blog_comment;

const sendsearch = require("../utility/Customsearch");

const _ = require('lodash');


const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: blogcomment } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, blogcomment, totalPages, currentPage };
};


exports.create = async (req, res) => {
  try {

    const blogcommentDetails = await blogcomment.create({
      name: req.body.name,
      blog_id: req.body.blog_id,
      content: req.body.content,
      is_approved: req.body.is_approved,
      is_reported: req.body.is_reported,
    });



    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: blogcommentDetails
    });
  }
  catch (error) {
    return res.status(400).send({
      message: 'Unable to insert data',
      errors: error,
      status: 0
    });
  }
};

exports.findAll = async (req, res) => {
  const { page, size, searchtext, blog_id, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [];

  if (blog_id) {
    data_array.push({ blog_id: blog_id })
  }
  let condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);

  blogcomment
    .findAndCountAll({
      where: data_array, condition, limit, offset,
      include: [
        {
          required: false,
          association: "blogcomment",
          attributes: ["id", "name"],
        },
      ],
      order: [orderconfig]
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);



      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.blogcomment
      });
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving blog comment ."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  blogcomment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'blog comment  deleted successfully',

        });

      } else {
        res.status(400).send({
          status: 0,
          message: ` delete blog comment with id=${id}. Maybe reviews was not found!`
        });
      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete blog comment with id=" + id
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  blogcomment.findByPk(id,)
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
          message: `Cannot find blog comment with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving blog comment with id=" + id

      });
    });
};


exports.update = (req, res) => {
  const id = req.body.id;

  try {
    blogcomment.update({
      name: req.body.name,
      blog_id: req.body.blog_id,
      content: req.body.content,
      is_approved: req.body.is_approved,
      is_reported: req.body.is_reported,
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

exports.statusupdate = async (req, res) => {
  const { id } = req.body;

  if (id === undefined) {
    return res.status(400).send({
      status: 0,
      message: 'ID is a required field'
    });
  }

  try {
    const review = await blogcomment.findOne({ where: { id: id } });

    if (!review) {
      return res.status(404).send({
        status: 0,
        message: 'Review not found'
      });
    }
    if (review.is_approved == 0) {

      await blogcomment.update(
        { is_approved: 1 },
        { where: { id: id } }
      );
    } else {
  
      await blogcomment.update(

        { is_approved: 0 },
        { where: { id: id } }
      );
    }

    res.status(200).send({
      status: 1,
      message: 'Status Updated'
    });

  } catch (error) {
    res.status(500).send({
      status: 0,
      message: 'Unable to update data',
      errors: error.message
    });
  }
};