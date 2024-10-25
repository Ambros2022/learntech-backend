const db = require("../models");
const path = require('path');
const videotestimonial = db.videotestimonial;
const Collegetestimonial = db.college_testimonials;
const Streamtestimonial = db.stream_testimonials;
const GeneralCoursetestimonial = db.general_course_testimonials;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");




const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: videotestimonial } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, videotestimonial, totalPages, currentPage };
};

exports.create = async (req, res) => {


  try {
    const videotestimonialDetails = await videotestimonial.create({
      name: req.body.name,
      video_url: req.body.video_url,
      full_url: req.body.full_url,
      tag: req.body.tag,
      title: req.body.title ? req.body.title : null,
      designation: req.body.designation ? req.body.designation : null,
      description: req.body.description ? req.body.description : null,
    });
    console.log(req.body.colleges, "s");

    if (req.body.colleges && videotestimonialDetails.id) {
      const stream = JSON.parse(req.body.colleges);
      console.log(stream, "s");
      _.forEach(stream, async function (value) {
        await Collegetestimonial.create({
          college_id: value.id,
          video_id: videotestimonialDetails.id,
        });
      });
    }
    if (req.body.streams && videotestimonialDetails.id) {
      const stream = JSON.parse(req.body.streams);
      _.forEach(stream, async function (value) {
        await Streamtestimonial.create({
          stream_id: value.id,
          video_id: videotestimonialDetails.id,
        });
      });
    }

    if (req.body.courses && videotestimonialDetails.id) {
      const stream = JSON.parse(req.body.courses);
      _.forEach(stream, async function (value) {
        await GeneralCoursetestimonial.create({
          general_course_id: value.id,
          video_id: videotestimonialDetails.id,
        });
      });
    }

    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: videotestimonialDetails
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
  videotestimonial.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);




      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.videotestimonial
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving videotestimonials."
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  videotestimonial.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'videotestimonial  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: `delete  videotestimonial with id=${id}. Maybe videotestimonial was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete videotestimonial with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  videotestimonial.findByPk(id, {
    include: [

      {
        required: false,
        association: "collegetestis",
        attributes: ["id", "college_id"],
        include: [
          {
            association: "clgtestis",
            attributes: ["id", "name"],
          },
        ],
      },


    ]
  })
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
          message: `Cannot find videotestimonial with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving videotestimonial with id=" + id

      });
    });
};


exports.update = async (req, res) => {



  try {


    await videotestimonial.update({
      name: req.body.name,
      video_url: req.body.video_url,
      full_url: req.body.full_url,
      tag: req.body.tag,
      title: req.body.title ? req.body.title : null,
      designation: req.body.designation ? req.body.designation : null,
      description: req.body.description ? req.body.description : null,
    }, {
      where: { id: req.body.id }
    });


    if (req.body.colleges && req.body.id) {

      await Collegetestimonial.destroy({
        where: { video_id: req.body.id },
      });

      const stream = JSON.parse(req.body.colleges);
      _.forEach(stream, async function (value) {
        await Collegetestimonial.create({
          college_id: value.id,
          video_id: req.body.id,


        });
      });
    }
    if (req.body.streams && req.body.id) {
      await Streamtestimonial.destroy({
        where: { video_id: req.body.id },
      });
      const stream = JSON.parse(req.body.streams);
      _.forEach(stream, async function (value) {
        await Streamtestimonial.create({

          stream_id: value.id,
          video_id: req.body.id,

        });
      });
    }

    if (req.body.courses && req.body.id) {
      await GeneralCoursetestimonial.destroy({
        where: { video_id: req.body.id },
      });
      const stream = JSON.parse(req.body.courses);
      _.forEach(stream, async function (value) {
        await GeneralCoursetestimonial.create({
          general_course_id: value.id,
          video_id: req.body.id,

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