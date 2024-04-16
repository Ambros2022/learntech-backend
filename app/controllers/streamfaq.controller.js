const db = require("../models");
const path = require('path');
const stream_faqs = db.stream_faq;
const sendsearch = require("../utility/Customsearch");

const Op = db.Sequelize.Op;
// Array of allowed files




const getPagination = (page, size) => {

    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: stream_faqs } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, stream_faqs, totalPages, currentPage };
};


exports.create = async (req, res) => {

    try {

        const stream_faqDetails = await stream_faqs.create({
            stream_id: req.body.stream_id,
            questions: req.body.questions,
            answers: req.body.answers,
        });


        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: stream_faqDetails
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

    var condition = sendsearch.customseacrh(searchtext, searchfrom);

    const { limit, offset } = getPagination(page, size);
    stream_faqs.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] },)
        .then(data => {
            const response = getPagingData(data, page, limit);

            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.stream_faqs
            });

        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving Page."
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.id;
    stream_faqs.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {

                res.status(200).send({
                    status: 1,
                    message: 'stream faqs  deleted successfully',

                });

            } else {

                res.status(400).send({
                    status: 0,
                    message: ` delete stream faqs with id=${id}. Maybe stream faqs was not found!`

                });

            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Could not delete stream faqs with id=" + id
            });
        });
};


exports.findOne = (req, res) => {
    const id = req.params.id;
    stream_faqs.findByPk(id)
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
                    message: `Cannot find stream faqs with id=${id}.`

                });
            }
        })
        .catch(err => {

            res.status(500).send({
                status: 0,
                message: "Error retrieving Page with id=" + id

            });
        });
};


exports.update = (req, res) => {
    const id = req.body.id;

    try {

        stream_faqs.update({
            stream_id: req.body.stream_id,
            questions: req.body.questions,
            answers: req.body.answers,
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