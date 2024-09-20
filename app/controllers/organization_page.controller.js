const db = require("../models");
const path = require('path');
const organizationpages = db.organization_pages;
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
  const { count: totalItems, rows: organizationpages } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, organizationpages, totalPages, currentPage };
};


exports.create = async (req, res) => {

  try {

    const organizationpagesDetails = await organizationpages.create({
        title: req.body.title,
        content: req.body.content,
        categories: req.body.categories,
 });


    res.status(200).send({
      status: 1,
      message: 'Data Save Successfully',
      data: organizationpagesDetails
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
  organizationpages.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] },)
    .then(data => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.organizationpages
      });


    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving organization pages."
      });
    });
};


exports.delete = (req, res) => {
  const id = req.params.id;
  organizationpages.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {

        res.status(200).send({
          status: 1,
          message: 'organization pages  deleted successfully',

        });


      } else {

        res.status(400).send({
          status: 0,
          message: ` delete organization pages with id=${id}. Maybe organization pages was not found!`

        });


      }
    })
    .catch(err => {

      res.status(500).send({
        status: 0,
        message: "Could not delete organization pages with id=" + id

      });

    });
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  organizationpages.findByPk(id)
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
          message: `Cannot find organization pages with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving organization pages with id=" + id

      });
    });
};


exports.update = (req, res) => {
  const id = req.body.id;

  try {

    organizationpages.update({
        title: req.body.title,
        content: req.body.content,
        categories: req.body.categories,
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

exports.updatesteps = async (req, res) => {

  try {
      if (req.body.faqs && req.body.id) {
          await abroadpage_faq.destroy({
              where: { abroad_page_id: req.body.id },
          });
          const faqss = JSON.parse(req.body.faqs);
          await _.forEach(faqss, function (value) {
              abroadpage_faq.create({
                organization_page_id: req.body.id,
                title: value.title ? value.title : null,
                description: value.description ? value.description : null,
                icon: value.icon ? value.icon : null,
                description: value.description ? value.description : null,
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

// exports.updatesteps = async (req, res) => {

//   try {
//       if (req.body.faqs && req.body.id) {
//           await abroadpage_faq.destroy({
//               where: { abroad_page_id: req.body.id },
//           });
//           const faqss = JSON.parse(req.body.faqs);
//           await _.forEach(faqss, function (value) {
//               abroadpage_faq.create({
//                   abroad_page_id: req.body.id,
//                   questions: value.questions ? value.questions : null,
//                   answers: value.answers ? value.answers : null,
//               });
//           });
//       }

//       res.status(200).send({
//           status: 1,
//           message: "Data Save Successfully",
//       });
//   } catch (error) {
//       return res.status(400).send({
//           message: "Unable to update data",
//           errors: error,
//           status: 0,
//       });
//   }
// }