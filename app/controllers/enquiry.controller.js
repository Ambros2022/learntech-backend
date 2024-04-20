const db = require("../models");
const enquiry = db.enquiry;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");





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



exports.findAll = async (req, res) => {

    const { page, size, searchtext,searchfrom, columnname,orderby} = req.query;
 
    var column = columnname ? columnname : 'id';
    var order = orderby ? orderby : 'ASC';
    var orderconfig = [column,order];
  
  
    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }
    var condition = sendsearch.customseacrh(searchtext, searchfrom);

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

