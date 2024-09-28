const db = require("../models");
const path = require("path");
const counsellorteam = db.counsellor_teams;
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
    const { count: totalItems, rows: counsellorteam } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, counsellorteam, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        let images = "";

        if (req.files && req.files.image) {
            let avatar = req.files.image;

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

            let logoname = "counsellorteam_image" + Date.now() + path.extname(avatar.name);

            let IsUpload = avatar.mv("./storage/counsellorteam_image/" + logoname)
                ? 1
                : 0;

            if (IsUpload) {
                images = "counsellorteam_image/" + logoname;
            }
        }

        const counsellorteamDetails = await counsellorteam.create({
            name: req.body.name,
            location: req.body.location,
            experience: req.body.experience,
            description: req.body.description,
            info: req.body.info,
            image: images,
        });


        res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
            data: counsellorteamDetails,
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
    counsellorteam
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
                data: response.counsellorteam,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Some error occurred while retrieving counsellor team.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    counsellorteam
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "counsellor team  deleted successfully",
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `delete our teams with id=${id}. Maybe counsellor team was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Could not delete counsellor team with id=" + id,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    counsellorteam.findByPk(id, {
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
                    message: `Cannot find counsellor team with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving counsellor team with id=" + id,
            });
        });
};

exports.update = async (req, res) => {

    try {

        const existingRecord = await counsellorteam.findOne({
            where: { id: req.body.id },
        });

        if (!existingRecord) {
            return res.status(404).send({
                message: "Record not found",
                status: 0,
            });
        }


        const counsellorteamUpdates = {
            name: req.body.name || existingRecord.name,
            location: req.body.location || existingRecord.location,
            experience: req.body.experience || existingRecord.experience,
            description: req.body.description || existingRecord.description,
            info: req.body.info || existingRecord.info,
        };
        if (req.files && req.files.image) {
            const avatar = req.files.image;

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

            const logoname = "counsellorteam_image" + Date.now() + path.extname(avatar.name);
            const UploadPath = "./storage/counsellorteam_image/" + logoname;

            await avatar.mv(UploadPath);

            counsellorteamUpdates.image = "counsellorteam_image/" + logoname;

            // If there's an old logo associated with the record, remove it
            if (existingRecord.image) {
                const oldLogoPath = "./storage/" + existingRecord.image;
                await removeFile(oldLogoPath);
            }
        }

        // Update database record
        await counsellorteam.update(counsellorteamUpdates, { where: { id: req.body.id } });


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
