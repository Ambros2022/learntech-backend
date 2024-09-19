const db = require("../models");
const path = require("path");
const organizationpagesteps = db.organization_page_steps;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const fileTypes = require("../config/fileTypes");
// / Function to remove a file
const fs = require("fs").promises;
async function removeFile(filePath) {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        if (error.code !== "ENOENT") {
            throw error;
        }
    }
}

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
    const { count: totalItems, rows: organizationpagesteps } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, organizationpagesteps, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        let icons = "";

        if (req.files && req.files.icon) {
            let avatar = req.files.icon;

            // Check if the uploaded file is allowed
            if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
                return res.status(400).send({
                    message: "Invalid File type ",
                    errors: {},
                    status: 0,
                });
            }

            if (avatar.size / (1024 * 1024) > allowed_file_size) {
                return res.status(400).send({
                    message: "File too large ",
                    errors: {},
                    status: 0,
                });
            }

            let logoname = "organizationpagesteps_image" + Date.now() + path.extname(avatar.name);

            let IsUpload = avatar.mv("./storage/organizationpagesteps_image/" + logoname)
                ? 1
                : 0;

            if (IsUpload) {
                icons = "organizationpagesteps_image/" + logoname;
            }
        }

        const organizationpagestepsDetails = await organizationpagesteps.create({
            organization_page_id: req.body.organization_page_id,
            title: req.body.title,
            description: req.body.description,
            order_by: req.body.order_by,
            icon: icons,

        });


        res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
            data: organizationpagestepsDetails,
        });
    } catch (error) {
        return res.status(400).send({
            message: "Unable to insert data",
            errors: error,
            status: 0,
        });
    }
};

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
    organizationpagesteps
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
                data: response.organizationpagesteps,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Some error occurred while retrieving organization page steps.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    organizationpagesteps
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "organization page steps  deleted successfully",
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `delete organization page steps with id=${id}. Maybe organization page steps was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Could not delete organization page steps with id=" + id,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    organizationpagesteps.findByPk(id, {
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
                    message: `Cannot find organization page steps with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving organization page steps with id=" + id,
            });
        });
};

exports.update = async (req, res) => {

    try {

        const existingRecord = await organizationpagesteps.findOne({
            where: { id: req.body.id },
        });

        if (!existingRecord) {
            return res.status(404).send({
                message: "Record not found",
                status: 0,
            });
        }


        const organizationpagestepsUpdates = {
            organization_page_id: req.body.organization_page_id || existingRecord.organization_page_id,
            title: req.body.title || existingRecord.title,
            description: req.body.description || existingRecord.description,
            order_by: req.body.order_by || existingRecord.order_by,
            // image: images,
            // logo: logonames,
        };
        if (req.files && req.files.icon) {
            const avatar = req.files.icon;

            // Check if the uploaded file is allowed
            if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
                return res.status(400).send({
                    message: "Invalid File type ",
                    errors: {},
                    status: 0,
                });
            }

            if (avatar.size / (1024 * 1024) > allowed_file_size) {
                return res.status(400).send({
                    message: "File too large ",
                    errors: {},
                    status: 0,
                });
            }

            const logoname = "organizationpagesteps_image" + Date.now() + path.extname(avatar.name);
            const UploadPath = "./storage/organizationpagesteps_image/" + logoname;

            await avatar.mv(UploadPath);

            organizationpagestepsUpdates.image = "organizationpagesteps_image/" + logoname;

            // If there's an old logo associated with the record, remove it
            if (existingRecord.icon) {
                const oldLogoPath = "./storage/" + existingRecord.icon;
                await removeFile(oldLogoPath);
            }
        }

        // Update database record
        await organizationpagesteps.update(organizationpagestepsUpdates, { where: { id: req.body.id } });


        res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
        });
    } catch (error) {
        return res.status(400).send({
            message: "Unable to update data",
            errors: error,
            status: 0,
        });
    }
};