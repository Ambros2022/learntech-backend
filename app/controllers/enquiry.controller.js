const db = require("../models");
const path = require('path');
const enquiry = db.enquiry;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");
const { Console } = require("console");
const Op = db.Sequelize.Op;




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: enquiry } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, enquiry, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {




        const enquiryDetails = await enquiry.create({
            name: req.body.name,
            email: req.body.email ? req.body.email : null,
            course_name: req.body.course_name ? req.body.course_name : null,
            college_name: req.body.college_name ? req.body.college_name : null,
            gender: req.body.gender ? req.body.gender : null,
            newsletters: req.body.newsletters ? req.body.newsletter : null,
            current_qualification: req.body.current_qualification ? req.body.current_qualification : null,
            course_in_mind: req.body.course_in_mind ? req.body.course_in_mind : null,
            dob: req.body.dob ? req.body.dob : null,
            contact: req.body.contact ? req.body.contact : null,
            current_url: req.body.current_url,
            description: req.body.description ? req.body.description : null,
            location: req.body.location ? req.body.location : null,
            mobile_verified: req.body.mobile_verified,

        });




        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: enquiryDetails
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

    const { page, size, searchText,searchfrom, columnname,orderby} = req.query;
 
    var column = columnname ? columnname : 'id';
    var order = orderby ? orderby : 'ASC';
    var orderconfig = [column,order];
  
  
    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }
    var condition = sendsearch.customseacrh(searchText, searchfrom);

    const { limit, offset } = getPagination(page, size);
    enquiry.findAndCountAll({ where: condition, limit, offset,order:[orderconfig]})
        .then(data => {
            const response = getPagingData(data, page, limit);




            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.enquiry
            });





        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving enquiry."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    enquiry.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'enquiry deleted successfully',

                });


            } else {

                res.status(400).send({
                    status: 0,
                    message: `enquiry  with id=${id} was not found!`

                });


            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete enquiry with id=" + id

            });

        });
};


exports.update = (req, res) => {
    const id = req.body.id;


    try {





        enquiry.update({
            name: req.body.name,
            email: req.body.email ? req.body.email : null,
            course_name: req.body.course_name ? req.body.course_name : null,
            college_name: req.body.college_name ? req.body.college_name : null,
            gender: req.body.gender ? req.body.gender : null,
            newsletters: req.body.newsletters ? req.body.newsletter : null,
            current_qualification: req.body.current_qualification ? req.body.current_qualification : null,
            course_in_mind: req.body.course_in_mind ? req.body.course_in_mind : null,
            dob: req.body.dob ? req.body.dob : null,
            contact: req.body.contact ? req.body.contact : null,
            current_url: req.body.current_url,
            description: req.body.description ? req.body.description : null,
            location: req.body.location ? req.body.location : null,
            mobile_verified: req.body.mobile_verified,
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
    enquiry.findByPk(id)
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
                    message: `Cannot find enquiry with id=${id}.`

                });


            }
        })
        .catch(err => {


            res.status(500).send({
                status: 0,
                message: "Error retrieving enquiry with id=" + id

            });
        });
};

