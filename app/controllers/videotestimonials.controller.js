const revalidate = require("../utility/revalidate");
const db = require("../models");
const path = require("path");
const video_testimonials = db.video_testimonials;
const _ = require("lodash");
const Op = db.Sequelize.Op;
const fileTypes = require("../config/fileTypes");
const Collegetestimonial = db.college_testimonials;
const Streamtestimonial = db.stream_testimonials;
const GeneralCoursetestimonial = db.general_course_testimonials;
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
        const videotestimonialDetails = await video_testimonials.create({
            title: req.body.title,
            name: req.body.name,
            designation: req.body.designation,
            video_url: req.body.video_url,
            full_url: req.body.full_url,
            type: req.body.type,
        });


        if (req.body.colleges && videotestimonialDetails.id) {
            const stream = JSON.parse(req.body.colleges);
            _.forEach(stream, async function (value) {
                await Collegetestimonial.create({
                    college_id: value.id,
                    video_id: videotestimonialDetails.id,
                });
            });
        }
        if (req.body.streams && videotestimonialDetails.id) {
            const stream = JSON.parse(req.body.streams);
            _.forEach(stream, async function (value) {
                await Streamtestimonial.create({
                    stream_id: value.id,
                    video_id: videotestimonialDetails.id,
                });
            });
        }

        if (req.body.courses && videotestimonialDetails.id) {
            const stream = JSON.parse(req.body.courses);
            _.forEach(stream, async function (value) {
                await GeneralCoursetestimonial.create({
                    general_course_id: value.id,
                    video_id: videotestimonialDetails.id,
                });
            });
        }

        try {
            revalidate.revalidatePage("video-testimonials");
            revalidate.revalidatePage("about-video-testimonials");
            if (req.body.colleges) {
                try {
                    const parsed = JSON.parse(req.body.colleges);
                    parsed.forEach(c => revalidate.revalidatePage(`testimonials-college-${c.id}`));
                } catch (e) {}
            }
            if (req.body.streams) {
                try {
                    const parsed = JSON.parse(req.body.streams);
                    parsed.forEach(s => revalidate.revalidatePage(`testimonials-stream-${s.id}`));
                } catch (e) {}
            }
            if (req.body.courses) {
                try {
                    const parsed = JSON.parse(req.body.courses);
                    parsed.forEach(c => revalidate.revalidatePage(`testimonials-gc-${c.id}`));
                } catch (e) {}
            }
        } catch (err) {
            console.error("Cache revalidation failed:", err.message);
        }

        res.status(200).send({
            status: 1,
            message: 'Data Save Successfully',
            data: videotestimonialDetails
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

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const existingRecord = await video_testimonials.findByPk(id);
        if (!existingRecord) {
            return res.status(404).send({
                status: 0,
                message: `delete video testimonials with id=${id}. Maybe video testimonials was not found!`,
            });
        }

        // Get college/stream/course associations before deleting
        let collegeIds = [];
        let streamIds = [];
        let courseIds = [];

        try {
            const cts = await Collegetestimonial.findAll({ where: { video_id: id } });
            collegeIds = cts.map(c => c.college_id);
            const sts = await Streamtestimonial.findAll({ where: { video_id: id } });
            streamIds = sts.map(s => s.stream_id);
            const gts = await GeneralCoursetestimonial.findAll({ where: { video_id: id } });
            courseIds = gts.map(g => g.general_course_id);
        } catch (e) {}

        const num = await video_testimonials.destroy({
            where: { id: id },
        });

        if (num == 1) {
            try {
                revalidate.revalidatePage("video-testimonials");
                revalidate.revalidatePage("about-video-testimonials");
                for (const cid of collegeIds) {
                    revalidate.revalidatePage(`testimonials-college-${cid}`);
                }
                for (const sid of streamIds) {
                    revalidate.revalidatePage(`testimonials-stream-${sid}`);
                }
                for (const gcid of courseIds) {
                    revalidate.revalidatePage(`testimonials-gc-${gcid}`);
                }
            } catch (err) {
                console.error("Cache revalidation failed:", err.message);
            }

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
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: "Could not delete video testimonials with id=" + id,
        });
    }
};

exports.findOne = (req, res) => {
    const id = req.params.id;
    video_testimonials.findByPk(id, {
        include: [
            {
                association: "collegeTestimonials",
                attributes: ["id", "college_id"],
                required: false,
                include: [
                    {
                        association: "collegeDetails",
                        attributes: ["id", "name", "slug"],
                        required: false,
                    },
                ],
            },
            {
                association: "streamTestimonials",
                attributes: ["id", "stream_id"],
                required: false,
                include: [
                    {
                        association: "streamDetails",
                        attributes: ["id", "name", "slug"],
                        required: false,
                    },
                ],
            },
            {
                association: "courseTestimonials",
                attributes: ["id", "general_course_id"],
                required: false,
                include: [
                    {
                        association: "courseDetails",
                        attributes: ["id", "name", ],
                        required: false,
                    },
                ],
            },
        ],
    })
        .then((data) => {
            if (data) {
                res.status(200).send({
                    status: 1,
                    message: "Successfully retrieved",
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
                err: err,
                message: "Error retrieving video testimonials with id=" + id,
            });
        });
};

exports.update = async (req, res) => {
    const id = req.body.id;
    try {
        let oldCollegeIds = [];
        let oldStreamIds = [];
        let oldCourseIds = [];
        try {
            const cts = await Collegetestimonial.findAll({ where: { video_id: id } });
            oldCollegeIds = cts.map(c => c.college_id);
            const sts = await Streamtestimonial.findAll({ where: { video_id: id } });
            oldStreamIds = sts.map(s => s.stream_id);
            const gts = await GeneralCoursetestimonial.findAll({ where: { video_id: id } });
            oldCourseIds = gts.map(g => g.general_course_id);
        } catch (e) {}
        await video_testimonials.update
            ({
                title: req.body.title,
                name: req.body.name,
                designation: req.body.designation,
                video_url: req.body.video_url,
                full_url: req.body.full_url,
                type: req.body.type,
            },
                {
                    where: { id: req.body.id }
                });


        if (req.body.colleges && req.body.id) {

            await Collegetestimonial.destroy({
                where: { video_id: req.body.id },
            });

            const stream = JSON.parse(req.body.colleges);
            _.forEach(stream, async function (value) {
                await Collegetestimonial.create({
                    college_id: value.id,
                    video_id: req.body.id,


                });
            });
        }
        if (req.body.streams && req.body.id) {
            await Streamtestimonial.destroy({
                where: { video_id: req.body.id },
            });
            const stream = JSON.parse(req.body.streams);
            _.forEach(stream, async function (value) {
                await Streamtestimonial.create({

                    stream_id: value.id,
                    video_id: req.body.id,

                });
            });
        }

        if (req.body.courses && req.body.id) {
            await GeneralCoursetestimonial.destroy({
                where: { video_id: req.body.id },
            });
            const stream = JSON.parse(req.body.courses);
            _.forEach(stream, async function (value) {
                await GeneralCoursetestimonial.create({
                    general_course_id: value.id,
                    video_id: req.body.id,

                });
            });
        }

        try {
            revalidate.revalidatePage("video-testimonials");
            revalidate.revalidatePage("about-video-testimonials");

            let collegeIds = [...oldCollegeIds];
            if (req.body.colleges) {
                try {
                    const parsed = JSON.parse(req.body.colleges);
                    parsed.forEach(c => {
                        if (!collegeIds.includes(c.id)) collegeIds.push(c.id);
                    });
                } catch (e) {}
            }
            let streamIds = [...oldStreamIds];
            if (req.body.streams) {
                try {
                    const parsed = JSON.parse(req.body.streams);
                    parsed.forEach(s => {
                        if (!streamIds.includes(s.id)) streamIds.push(s.id);
                    });
                } catch (e) {}
            }
            let courseIds = [...oldCourseIds];
            if (req.body.courses) {
                try {
                    const parsed = JSON.parse(req.body.courses);
                    parsed.forEach(c => {
                        if (!courseIds.includes(c.id)) courseIds.push(c.id);
                    });
                } catch (e) {}
            }

            for (const cid of collegeIds) {
                revalidate.revalidatePage(`testimonials-college-${cid}`);
            }
            for (const sid of streamIds) {
                revalidate.revalidatePage(`testimonials-stream-${sid}`);
            }
            for (const gcid of courseIds) {
                revalidate.revalidatePage(`testimonials-gc-${gcid}`);
            }
        } catch (err) {
            console.error("Cache revalidation failed:", err.message);
        }

        return res.status(200).send({
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