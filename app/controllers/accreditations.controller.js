const db = require("../models");
const Accreditation = db.accreditation;
const _ = require('lodash');
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");
const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: accreditation } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, accreditation, totalPages, currentPage };
};
exports.create = async (req, res) => {
  try {
    const AccreditationsDetails = await Accreditation.create
      ({
        accreditation_name: req.body.accreditation_name,
        accreditation_slug: req.body.accreditation_slug,
        accreditation_full_name: req.body.accreditation_full_name ? req.body.accreditation_full_name : null,
        accreditation_description: req.body.accreditation_description ? req.body.accreditation_description : null,
        keywords: req.body.keywords,

      });
    res.status(200).send
      ({
        status: 1,
        message: 'Data Save Successfully',
        data: AccreditationsDetails
      });
  }
  catch (error) {
    return res.status(400).send
      ({
        message: 'Unable to insert data',
        errors: error,
        status: 0
      });
  }


};
exports.update = (req, res) => {
  const id = req.body.id;
  try {
    Accreditation.update
      ({
        accreditation_name: req.body.accreditation_name,
        accreditation_slug: req.body.accreditation_slug,
        accreditation_full_name: req.body.accreditation_full_name ? req.body.accreditation_full_name : null,
        accreditation_description: req.body.accreditation_description ? req.body.accreditation_description : null,
        keywords: req.body.keywords,
      },
        {
          where: { id: req.body.id }
        });

    res.status(200).send
      ({
        status: 1,
        message: 'Data updated Successfully'
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
exports.findAll = async (req, res) => {

  const { page, size, searchtext, columnname, searchfrom, orderby } = req.query;

  var column = columnname ? columnname : 'accreditation_name';
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
  Accreditation.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.status(200).send
        ({
          status: 1,
          message: "success",
          totalItems: response.totalItems,
          currentPage: response.currentPage,
          totalPages: response.totalPages,
          data: response.accreditation
        });

    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving Accreditation."
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Accreditation.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'Stream  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: `delete Sub Stream with id=${id}. Maybe Stream was not found!`

        });
      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete Stream with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  Accreditation.findByPk(id)
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
          message: `Cannot find Accreditation with id=${id}.`

        });
      }
    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving stream with id=" + id

      });
    });
};