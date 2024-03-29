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
            city_name: req.body.city_name,
            city_slug: req.body.city_slug,
			state_id: 1,
            city_description: req.body.city_description,

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
    const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

    var column = columnname ? columnname : 'city_name';
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
    city.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
        .then(data =>
        {
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
        .catch(err =>
        {
            res.status(500).send({
                status: 0,
                message:

                    err.message || "Some error occurred while retrieving city."
            });
        });
};

exports.delete = (req, res) =>
 {
    const id = req.params.id;
    city.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) 
            {

                    res.status(200).send({
                    status: 1,
                    message: 'city deleted successfully',

                });

            } else
            {
                   res.status(400).send({
                    status: 0,
                    message: `city  with id=${id}. Maybe city id  was not found!`

                });
            }
        })
        .catch(err =>
             {
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
            city_name: req.body.city_name,
            city_slug: req.body.city_slug,
            city_description: req.body.city_description,
			state_id: 1,
            //state_id: req.body.state_id ? req.body.state_id : null,
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
    city.findByPk(id)
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
                    message: `Cannot find city with id=${id}.`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving city with id=" + id

            });
        });
};

