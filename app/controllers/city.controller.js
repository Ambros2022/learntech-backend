const db = require("../models");
const path = require('path');
const city = db.city;
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
    const { count: totalItems, rows: city } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, city, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        const cityDetails = await city.create({
            name: req.body.name,
            // city_slug: req.body.city_slug,
            state_id: req.body.state_id,
            // city_description: req.body.city_description,

        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: cityDetails
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

    var column = columnname ? columnname : 'name';
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
    city.findAndCountAll({
        where: condition, limit, offset, 

        include: [
            {
                required: false,
                association: "state",
                attributes: ["id", "name"],
            },
           

        ],
        
        
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
                data: response.city
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving city."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    city.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'city deleted successfully',

                });

            } else {
                res.status(400).send({
                    status: 0,
                    message: `city  with id=${id}. Maybe city id  was not found!`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Could not delete city with id=" + id

            });

        });
};
exports.update = (req, res) => {
    const id = req.body.id;
    try {
        city.update
            ({
                name: req.body.name,
                state_id: req.body.state_id,
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

    city
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
            include: [
                {

                    required: false,
                    association: "state",
                    attributes: [
                        "id",
                        "name",

                    ],
                }

            ],

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
                message: "Error retrieving stream with id=" + id,
            });
        });
};
