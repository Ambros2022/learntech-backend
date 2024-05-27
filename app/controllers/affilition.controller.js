const db = require("../models");
const path = require('path');
const sendsearch = require("../utility/Customsearch");
const affilition = db.affilition;
const _ = require('lodash');

const Op = db.Sequelize.Op;




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: affilition } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, affilition, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        const affilitionDetails = await affilition.create
            ({
                other_affiliations_name: req.body.other_affiliations_name,
                other_affiliations_slug: req.body.other_affiliations_slug,
                other_affiliations_description: req.body.other_affiliations_description,
            });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: affilitionDetails
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


    const { page, size, searchtext, stream_id, searchfrom, columnname, orderby } = req.query;

    var column = columnname ? columnname : 'id';
    var order = orderby ? orderby : 'ASC';
    var orderconfig = [column, order];
    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }


    var conditionStreamId = stream_id ? { stream_id: stream_id } : null;
    var condition = sendsearch.customseacrh(searchtext, searchfrom);
    let data_array = [];
    conditionStreamId ? data_array.push(conditionStreamId) : null;
    condition ? data_array.push(condition) : null;



    const { limit, offset } = getPagination(page, size);
    affilition.findAndCountAll({ where: data_array, limit, offset, order: [orderconfig] })
        .then(data => {
            const response = getPagingData(data, page, limit);

            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.affilition
            });
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
    affilition.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'affilition deleted successfully',

                });


            } else {

                res.status(400).send({
                    status: 0,
                    message: `affilition with id=${id} was not found!`

                });


            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete affilition with id=" + id

            });

        });
};


exports.update = (req, res) => {
    const id = req.body.id;


    try {
        affilition.update({
            other_affiliations_name: req.body.other_affiliations_name,
            other_affiliations_slug: req.body.other_affiliations_slug,
            other_affiliations_description: req.body.other_affiliations_description,
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
    affilition.findByPk(id)
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
                    message: `Cannot find affilition with id=${id}.`

                });


            }
        })
        .catch(err => {


            res.status(500).send({
                status: 0,
                message: "Error retrieving affilition with id=" + id

            });
        });
};

