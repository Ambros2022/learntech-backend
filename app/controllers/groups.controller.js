const db = require("../models");
const path = require('path');
const groups = db.groups;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");

const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: groups } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, groups, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {


        const groupsDetails = await groups.create({
            title: req.body.title,
            group: req.body.group,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description ? req.body.meta_description : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null,
            listing_status: req.body.listing_status ? req.body.listing_status : null,
            order: req.body.order ? req.body.order : null,

        });



        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: groupsDetails
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

    const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

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
    groups.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
        .then(data => {
            const response = getPagingData(data, page, limit);




            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.groups
            });





        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving groupss."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    groups.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'groups  deleted successfully',

                });


            } else {

                res.status(400).send({
                    status: 0,
                    message: `delete  groups with id=${id}. Maybe groups was not found!`

                });


            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Could not delete groups with id=" + id

            });

        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    groups.findByPk(id)
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
                    message: `Cannot find groups with id=${id}.`

                });


            }
        })
        .catch(err => {


            res.status(500).send({
                status: 0,
                message: "Error retrieving groups with id=" + id

            });
        });
};


exports.update = (req, res) => {



    try {


        groups.update({
            title: req.body.title,
            group: req.body.group,
            slug: req.body.slug,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description ? req.body.meta_description : null,
            description: req.body.description ? req.body.description : null,
            status: req.body.status ? req.body.status : null,
            listing_status: req.body.listing_status ? req.body.listing_status : null,
            order: req.body.order ? req.body.order : null,
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