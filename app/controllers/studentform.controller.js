const db = require("../models");
const path = require('path');
const studentform = db.studentform;
const _ = require('lodash');
const commingform = db.commingform;
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");

const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: studentform } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, studentform, totalPages, currentPage };
};

exports.create = async (req, res) => {

  try {

    const studentformDetails = await studentform.create({
      place: req.body.place,
      language: req.body.language,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      page_title: req.body.page_title,
      description: req.body.description,
      order: req.body.order,
      status: req.body.status,
      slug: req.body.slug,
      
   
    });



    if (req.body.form && studentformDetails.id) {

      const forms = JSON.parse(req.body.form);
      _.forEach(forms, function (value) {
        commingform.create({
          students_coming_from_id: studentformDetails.id,
          title: value.title,
          description: value.description ? value.description : null,
          order: value.order ? value.order : null,

        });
      });



    }


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: studentformDetails
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

  const { page, size, searchText,searchfrom,columnname, orderby } = req.query;

  var column = columnname ? columnname : 'id';
  var order = orderby ? orderby : 'ASC';
  var orderconfig = [column, order];


  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  var condition = sendsearch.customseacrh(searchText, searchfrom);

  const { limit, offset } = getPagination(page, size);
  studentform.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);




      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.studentform
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving studentforms."
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  studentform.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        commingform.destroy({
          where: { students_coming_from_id : id }
        })

        res.status(200).send({
          status: 1,
          message: 'studentform  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: `delete  studentform with id=${id}. Maybe studentform was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete studentform with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  studentform.findByPk(id, { include: { association: 'stdform', attributes: ['id', 'title', 'description','order'] } })
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
          message: `Cannot find studentform with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving studentform with id=" + id

      });
    });
};


exports.update = (req, res) => {



  try {

    studentform.update({
      place: req.body.place,
      language: req.body.language,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      page_title: req.body.page_title,
      description: req.body.description,
      order: req.body.order,
      status: req.body.status,
      slug: req.body.slug,
    }, {
      where: { id: req.body.id }
    });



    if (req.body.form && req.body.id) {
      commingform.destroy({
        where: { students_coming_from_id: req.body.id }
      })
      const forms = JSON.parse(req.body.form);
      _.forEach(forms, function (value) {
        commingform.create({
          students_coming_from_id: req.body.id ,
          title: value.title,
          description: value.description ? value.description : null,
          order: value.order ? value.order : null,

        });
      });



    }




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