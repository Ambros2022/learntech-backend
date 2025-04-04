const db = require("../models");
const path = require('path');
const state = db.state;
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
    const { count: totalItems, rows: state } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, state, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        console.log("req.body", req.body);
        const stateDetails = await state.create({
            name: req.body.name,
            country_id: req.body.country_id,
            is_top: req.body.is_top,

        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: stateDetails

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
    const { page, size, searchtext, searchfrom, columnname, orderby,country_id } = req.query;

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
    let conditioncountry_id = country_id ? { country_id: country_id } : null;


    let condition = sendsearch.customseacrh(searchtext, searchfrom);
    condition ? data_array.push(condition) : null;
    
    conditioncountry_id ? data_array.push(conditioncountry_id) : null;

    const { limit, offset } = getPagination(page, size);
    state.findAndCountAll({
        where: data_array, limit, offset,

        include: [
            {
                required: false,
                association: "country",
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
                data: response.state
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving state."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    state.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'state deleted successfully',

                });

            } else {
                res.status(400).send({
                    status: 0,
                    message: `state  with id=${id}. Maybe state id  was not found!`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Could not delete state with id=" + id

            });

        });
};
exports.update = (req, res) => {
    const id = req.body.id;
    try {
        state.update
            ({
                name: req.body.name,
                country_id: req.body.country_id,
                is_top: req.body.is_top,
       
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

    state
        .findOne({
            where: {
                [Op.or]: [
                    {
                        id: {
                            [Op.eq]: id,
                        },
                    },
                    // {
                    //   stream_slug: {
                    //     [Op.eq]: id,
                    //   },
                    // },
                ],
            },
            include: [
                {

                    required: false,
                    association: "country",
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
