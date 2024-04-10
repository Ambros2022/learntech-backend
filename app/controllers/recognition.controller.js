const db = require("../models");
const path = require('path');
const sendsearch = require("../utility/Customsearch");
const recognition = db.recognition;
const _ = require('lodash');

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: recognition} = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, recognition, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {

   const recognitionDetails = await recognition.create({
            recognition_approval_name: req.body. recognition_approval_name,
            recognition_approval_slug: req.body.recognition_approval_slug,
            recognition_approval_full_name:req.body.recognition_approval_full_name,
            recognition_approval_description: req.body.recognition_approval_description,
            keywords: req.body.keywords,
        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: recognitionDetails
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
exports.findAll = async  (req, res) => {
    const { page, size, searchtext,stream_id, searchfrom,columnname,orderby } = req.query;
  
    var column =columnname ? columnname : 'id';
    var order =orderby ? orderby:'ASC';
      var orderconfig=[column,order];
  
  
      const myArray = column.split(".");
      if (typeof myArray[1] !== "undefined") {
       var table=myArray[0];
        column=myArray[1];
        orderconfig=[table,column,order];
    }
    var conditionStreamId = stream_id ? {stream_id:stream_id}:null;
    var condition = sendsearch.customseacrh(searchtext, searchfrom);
  let data_array = [];
  conditionStreamId?data_array.push(conditionStreamId):null;
  condition?data_array.push(condition):null;  
    const { limit, offset } = getPagination(page, size);
    recognition.findAndCountAll({ where: data_array, limit, offset,order:[orderconfig]})
      .then(data => {
        const response = getPagingData(data, page, limit);
  
        res.status(200).send({
          status:1,
          message:"success",
          totalItems:response.totalItems,
          currentPage:response.currentPage,
          totalPages:response.totalPages,
          data:response.recognition });

      })
      .catch(err => {
        res.status(500).send({
          status: 0,
          message:
  
            err.message || "Some error occurred while retrieving Sub streams."
        });
      });
  };
exports.delete = (req, res) => {
    const id = req.params.id;
    recognition.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'recognition deleted successfully',

                });
            } else {

                res.status(400).send({
                    status: 0,
                    message: `recognition  with id=${id} was not found!`

                });
            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete recognition  with id=" + id

            });

        });
};
exports.update = (req, res) => {
    const id = req.body.id;
    try {
       recognition.update({
            recognition_approval_name: req.body. recognition_approval_name,
            recognition_approval_slug: req.body.recognition_approval_slug,
            recognition_approval_full_name: req.body.recognition_approval_full_name,
            recognition_approval_description: req.body.recognition_approval_description,
            keywords: req.body.keywords,

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

exports.findOne = (req, res) => {
    const id = req.params.id;
    recognition.findByPk(id)
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
                    message: `Cannot find recognition  with id=${id}.`

                });
            }
        })
        .catch(err => {
           res.status(500).send({
                status: 0,
                message: "Error retrieving recognition with id=" + id

            });
        });
};

