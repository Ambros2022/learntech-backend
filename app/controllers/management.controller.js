const db = require("../models");
const path = require('path');
const management = db.management;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: management } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, management, totalPages, currentPage };
};

exports.create = async (req, res) => {
    //  const obj = JSON.parse(req.body.mac);
    // var messages = Array.prototype.slice.call(req.body.mac);
    //req.body['mac[]'].length


    try {

 const managementDetails = await management.create({
            management_name: req.body.management_name,
            slug: req.body.slug,


        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: managementDetails
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

    const { page, size, searchtext, columnname,searchfrom, orderby } = req.query;

    var column = columnname ? columnname : 'management_name';
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
    management.findAndCountAll({ where: condition, limit, offset,order:[orderconfig] })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.management
            });
       })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving management."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    management.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'management deleted successfully',

                });
         } else {
               res.status(400).send({
                    status: 0,
                    message: `management with id=${id} was not found!`

                });
           }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete management with id=" + id

            });

        });
};


exports.update = (req, res) => {
    const id = req.body.id;


    try {

        management.update({
            management_name: req.body.management_name,
            slug: req.body.slug,

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
    management.findByPk(id)
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
                    message: `Cannot find management with id=${id}.`

                });
            }
        })
        .catch(err => {
          res.status(500).send({
                status: 0,
                message: "Error retrieving management with id=" + id

            });
        });
};

