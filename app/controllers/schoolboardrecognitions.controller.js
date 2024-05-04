const db = require("../models");
const path = require('path');
const schoolboardrecognitions = db.school_board_recognitions;
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
    const { count: totalItems, rows: schoolboardrecognitions } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, schoolboardrecognitions, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        const schoolboardrecognitionsDetails = await schoolboardrecognitions.create({
            recognition_id: req.body.recognition_id,
            school_board_id: req.body.school_board_id,

        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: schoolboardrecognitionsDetails
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
    let data_array = [];


    let condition = sendsearch.customseacrh(searchtext, searchfrom);
    condition ? data_array.push(condition) : null;

    const { limit, offset } = getPagination(page, size);

    schoolboardrecognitions.findAndCountAll({
        where: data_array, limit, offset,
        // include: [
        //     {
        //         required: false,
        //         association: "alljoblocations",
        //         attributes: ["id", "name"],
        //     },
        //     {
        //         required: false,
        //         association: "jobspositions",
        //         attributes: ["id", "name"],
        //     },


        // ],

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
                data: response.schoolboardrecognitions
            });
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving school board recognitions."
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    schoolboardrecognitions.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'school board recognitions deleted successfully',

                });

            } else {
                res.status(400).send({
                    status: 0,
                    message: `school board recognitions  with id=${id}. Maybe school board recognitions id  was not found!`

                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Could not delete school board recognitions with id=" + id

            });

        });
};

exports.update = (req, res) => {
    const id = req.body.id;
    try {
        schoolboardrecognitions.update
            ({
                job_location_id: req.body.job_location_id,
                jobs_position_id: req.body.jobs_position_id,

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

    schoolboardrecognitions
        .findByPk(id, {
            // include: [
            //     {
            //         required: false,
            //         association: "alljoblocations",
            //         attributes: ["id", "name"],
            //     },
            //     {
            //         required: false,
            //         association: "jobspositions",
            //         attributes: ["id", "name"],
            //     },


            // ],
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
                message: "Error retrieving school board recognitions with id=" + id,
            });
        });
};
