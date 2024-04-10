const db = require("../models");
const path = require('path');
const pages = db.page;
const sendsearch = require("../utility/Customsearch");

const Op = db.Sequelize.Op;
// Array of allowed files




const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: pages } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, pages, totalPages, currentPage };
};


exports.create = async (req, res) => {

  try {





    const PageDetails = await pages.create({
      url: req.body.url ? req.body.url : null,
      top_description: req.body.top_description ? req.body.top_description : null,
      bottom_description: req.body.bottom_description ? req.body.bottom_description : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_description: req.body.meta_description ? req.body.meta_description : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
      // meta_description: req.body.meta_description?req.body.meta_description:null,
    });


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: PageDetails
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

  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }


  var condition = sendsearch.customseacrh(searchtext, searchfrom);






  const { limit, offset } = getPagination(page, size);
  pages.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] },)
    .then(data => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.pages
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving Page."
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  pages.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'Page  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: ` delete Page with id=${id}. Maybe Stream was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete Page with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  pages.findByPk(id)
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
          message: `Cannot find page with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving Page with id=" + id

      });
    });
};


exports.update = (req, res) => {
  const id = req.body.id;


  try {


    pages.update({
      url: req.body.url ? req.body.url : null,
      top_description: req.body.top_description ? req.body.top_description : null,
      bottom_description: req.body.bottom_description ? req.body.bottom_description : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_description: req.body.meta_description ? req.body.meta_description : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
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