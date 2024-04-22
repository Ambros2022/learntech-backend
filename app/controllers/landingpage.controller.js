const db = require("../models");
const path = require("path");
const landingpage = db.landing_pages;
const _ = require("lodash");
const Op = db.Sequelize.Op;

const groups = db.groups;

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
const array_of_allowed_file_types = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/gif",
    "image/svg+xml",
];

// Allowed file size in mb
const allowed_file_size = 2;

const getPagination = (page, size) => {
    const pages = page > 0 ? page : 1;
    const limit = size ? +size : 10;
    const offset = pages ? (pages - 1) * limit : 0;
    return { limit, offset };
};

const getPagingData = (data, page, limit) => {
    const { count: totalItems, rows: landingpage } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, landingpage, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        let logonames = "";

        if (req.files && req.files.logo) {
            let avatar = req.files.logo;

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

            let logoname = "logo" + Date.now() + path.extname(avatar.name);

            let IsUpload = avatar.mv("./storage/landingpage_logo/" + logoname) ? 1 : 0;

            if (IsUpload) {
                logonames = "landing_logo/" + logoname;
            }
        }

        const landingpageDetails = await landingpage.create({
            name: req.body.name,
            link: req.body.link,
            status: req.body.status,
            logo: logonames,

        });

        res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
            data: landingpageDetails,
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
    landingpage
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
                data: response.landingpage,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Some error occurred while retrieving landing pages.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    landingpage
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "landing page  deleted successfully",
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `delete landing page with id=${id}. Maybe landing page was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Could not delete landing page with id=" + id,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    landingpage.findByPk(id, {
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
                    message: `Cannot find landing page with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving landing page with id=" + id,
            });
        });
};

exports.update = async (req, res) => {

    try {

        const existingRecord = await landingpage.findOne({
            where: { id: req.body.id },
        });

        if (!existingRecord) {
            return res.status(404).send({
                message: "Record not found",
                status: 0,
            });
        }


        const landingpageUpdates = {
            name: req.body.name || existingRecord.name,
            link: req.body.link || existingRecord.link,
            status: req.body.status || existingRecord.status,
            // logo: logonames,
        };
        if (req.files && req.files.logo) {
            const avatar = req.files.logo;

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

            const logoname = "logo" + Date.now() + path.extname(avatar.name);
            const UploadPath = "./storage/landingpage_logo/" + logoname;

            await avatar.mv(UploadPath);

            landingpageUpdates.logo = "landingpage_logo/" + logoname;

            // If there's an old logo associated with the record, remove it
            if (existingRecord.logo) {
                const oldLogoPath = "./storage/" + existingRecord.logo;
                await removeFile(oldLogoPath);
            }
        }

        // Update database record
        await landingpage.update(landingpageUpdates, { where: { id: req.body.id } });


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

