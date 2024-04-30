const db = require("../models");
const path = require('path');
const scholarlevels = db.scholar_levels;
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
    const { count: totalItems, rows: scholarlevels } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, scholarlevels, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        const scholarlevelsDetails = await scholarlevels.create({
            name: req.body.name,

        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: scholarlevelsDetails
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
    const { page, size, searchtext, searchfrom, columnname, orderby, state_id } = req.query;

    var column = columnname ? columnname : 'name';
    var order = orderby ? orderby : 'ASC';
    var orderconfig = [column, order];


    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }
    let data_array = [];


    let condition = sendsearch.customseacrh(searchtext, searchfrom);
    condition ? data_array.push(condition) : null;

    const { limit, offset } = getPagination(page, size);

    scholarlevels.findAndCountAll({
        where: data_array, limit, offset,


        order: [orderconfig]
    })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.scholarlevels
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving scholar levels."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    scholarlevels.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'scholar levels deleted successfully',

                });

            } else {
                res.status(400).send({
                    status: 0,
                    message: `scholar levels  with id=${id}. Maybe scholar levels id  was not found!`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Could not delete scholar levels with id=" + id

            });

        });
};

exports.update = (req, res) => {
    const id = req.body.id;
    try {
        scholarlevels.update
            ({
                name: req.body.name,
            },
                {
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

    scholarlevels
        .findOne({
            where: {
                [Op.or]: [
                    {
                        id: {
                            [Op.eq]: id,
                        },
                    },
                ],
            },

        })
        .then(async (data) => {
            res.status(200).send({
                status: 1,
                message: "successfully retrieved",
                data: data,

            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving scholar levels with id=" + id,
            });
        });
};