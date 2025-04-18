const db = require("../models");
const job = db.jobvaccancies;
const sendsearch = require("../utility/Customsearch");


const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: job } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, job, totalPages, currentPage };
};

exports.create = async (req, res) => {
  

  try {

    const jobDetails = await job.create({
      position: req.body.position,
      experience: req.body.experience,
      no_of_vacancy: req.body.no_of_vacancy ,
      location: req.body.location,
      slug: req.body.slug,
      description: req.body.description,
     
    });

    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: jobDetails
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

  const { page, size, searchtext,searchfrom,columnname, orderby } = req.query;

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
  job.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);




      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.job
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving jobs."
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  job.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'job  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: `delete job with id=${id}. Maybe job was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete job with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  job.findByPk(id)
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
          message: `Cannot find job with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving job with id=" + id

      });
    });
};


exports.update = (req, res) => {
  


  try {

    job.update({
      position: req.body.position,
      experience: req.body.experience,
      no_of_vacancy: req.body.no_of_vacancy ,
      location: req.body.location,
      slug: req.body.slug,
      description: req.body.description,
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