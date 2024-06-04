const db = require("../models");
const path = require("path");
const video_testimonials = db.video_testimonials;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const fileTypes = require("../config/fileTypes");

// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const array_of_allowed_file_types = fileTypes.Imageformat;

// Allowed file size in mb
const allowed_file_size = 2;

const getPagination = (page, size) => {
    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: video_testimonials } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, video_testimonials, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        const video_testimonialsDetails = await video_testimonials.create({
            title: req.body.title,
            name: req.body.name,
            designation: req.body.designation,
            video_url: req.body.video_url,
            full_url: req.body.full_url,

        });

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: video_testimonialsDetails
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

    var column = columnname ? columnname : "id";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
        var table = myArray[0];
        column = myArray[1];
        orderconfig = [table, column, order];
    }
    var condition = sendsearch.customseacrh(searchtext, searchfrom);

    const { limit, offset } = getPagination(page, size);
    video_testimonials
        .findAndCountAll({
            where: condition, limit, offset,

            order: [orderconfig]
        })
        .then((data) => {
            const response = getPagingData(data, page, limit);

            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.video_testimonials,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Some error occurred while retrieving video testimonials.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    video_testimonials
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "video testimonials  deleted successfully",
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `delete video testimonials with id=${id}. Maybe video testimonials was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Could not delete video testimonials with id=" + id,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    video_testimonials.findByPk(id, {
    })
        .then((data) => {
            if (data) {



                res.status(200).send({
                    status: 1,
                    message: "successfully retrieved",
                    data: data,
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `Cannot find video testimonials with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving video testimonials with id=" + id,
            });
        });
};

exports.update = (req, res) => {
    const id = req.body.id;
    try {
        video_testimonials.update
            ({
                title: req.body.title,
                name: req.body.name,
                designation: req.body.designation,
                video_url: req.body.video_url,
                full_url: req.body.full_url,
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