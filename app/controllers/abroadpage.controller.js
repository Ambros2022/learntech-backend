const db = require("../models");
const path = require("path");
const abroadpage = db.abroadpages;
const abroadpage_faq = db.abroadpage_faqs;
const _ = require("lodash");
const Op = db.Sequelize.Op;

const groups = db.groups;
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
    const { count: totalItems, rows: abroadpage } = data;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, abroadpage, totalPages, currentPage };
};

exports.create = async (req, res) => {

    try {
        let backgroundimages = "";


        if (req.files && req.files.backgroundimage) {
            let avatar = req.files.backgroundimage;

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

            let logoname = "image" + Date.now() + path.extname(avatar.name);

            let IsUpload = avatar.mv("./storage/image/" + logoname)
                ? 1
                : 0;

            if (IsUpload) {
                backgroundimages = "image/" + logoname;
            }
        }

        const abroadpageDetails = await abroadpage.create({
            country_id: req.body.country_id,
            name: req.body.name,
            slug: req.body.slug,
            info: req.body.info,
            backgroundimage: backgroundimages,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            meta_keyword: req.body.meta_keyword,
            status: req.body.status,
        });


        res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
            data: abroadpageDetails,
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
    abroadpage
        .findAndCountAll({ where: condition, limit, offset, 
            include: [
                {
                    required: false,
                    association: "country",
                    attributes: ["id", "name"],
                },
                {
                    required: false,
                    association: "abroadpagefaqs",
                    attributes: ["id", "questions", "answers"],
                  },
    
            ],
            order: [orderconfig] })
        .then((data) => {
            const response = getPagingData(data, page, limit);

            res.status(200).send({
                status: 1,
                message: "success",
                totalItems: response.totalItems,
                currentPage: response.currentPage,
                totalPages: response.totalPages,
                data: response.abroadpage,
            });
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: err.message || "Some error occurred while retrieving abroadpages.",
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.id;
    abroadpage
        .destroy({
            where: { id: id },
        })
        .then((num) => {
            if (num == 1) {
                res.status(200).send({
                    status: 1,
                    message: "abroad page  deleted successfully",
                });
            } else {
                res.status(400).send({
                    status: 0,
                    message: `delete abroad page with id=${id}. Maybe abroad page was not found!`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Could not delete abroad page with id=" + id,
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    abroadpage.findByPk(id, {
        include: [
            {
                required: false,
                association: "country",
                attributes: ["id", "name"],
            },
            {
                required: false,
                association: "abroadpagefaqs",
                attributes: ["id", "questions", "answers"],
              },

        ],
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
                    message: `Cannot find abroadpages with id=${id}.`,
                });
            }
        })
        .catch((err) => {
            res.status(500).send({
                status: 0,
                message: "Error retrieving abroadpages with id=" + id,
            });
        });
};


exports.update = async (req, res) => {

    try {

        const existingRecord = await abroadpage.findOne({
            where: { id: req.body.id },
        });

        if (!existingRecord) {
            return res.status(404).send({
                message: "Record not found",
                status: 0,
            });
        }

        const abroadpageUpdates = {
            country_id: req.body.country_id || existingRecord.country_id,
            name: req.body.name || existingRecord.name,
            slug: req.body.slug || existingRecord.slug,
            info: req.body.info || existingRecord.info,
            meta_title: req.body.meta_title || existingRecord.meta_title,
            meta_description: req.body.meta_description || existingRecord.meta_description,
            meta_keyword: req.body.meta_keyword || existingRecord.meta_keyword,
            status: req.body.status || existingRecord.status,
        };

        if (req.files && req.files.backgroundimage) {
            const avatar = req.files.backgroundimage;

            // Check file type and size
            if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
                return res.status(400).send({
                    message: "Invalid file type",
                    errors: {},
                    status: 0,
                });
            }
            if (avatar.size / (1024 * 1024) > allowed_file_size) {
                return res.status(400).send({
                    message: "File too large",
                    errors: {},
                    status: 0,
                });
            }

            const logoname = "image" + Date.now() + path.extname(avatar.name);
            const uploadPath = "./storage/image/" + logoname;

            await avatar.mv(uploadPath);

            abroadpageUpdates.backgroundimage = "image/" + logoname;

            if (existingRecord.backgroundimage) {
                console.log("existingRecord.backgroundimage", existingRecord.backgroundimage);
                const oldLogoPath = "./storage/" + existingRecord.backgroundimage;
                await removeFile(oldLogoPath);
            }
        }

        // Update database record
        await abroadpage.update(abroadpageUpdates, { where: { id: req.body.id } });

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


exports.updatefaqs = async (req, res) => {

    try {
        if (req.body.faqs && req.body.id) {
            await abroadpage_faq.destroy({
                where: { abroad_page_id: req.body.id },
            });
            const faqss = JSON.parse(req.body.faqs);
            await _.forEach(faqss, function (value) {
                abroadpage_faq.create({
                    abroad_page_id: req.body.id,
                    questions: value.questions ? value.questions : null,
                    answers: value.answers ? value.answers : null,
                });
            });
        }

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
