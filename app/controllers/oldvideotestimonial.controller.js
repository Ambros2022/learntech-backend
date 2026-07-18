const revalidate = require("../utility/revalidate");
const db = require("../models");
const path = require('path');
const videotestimonial = db.videotestimonial;
const Collegetestimonial = db.college_testimonials;
const Streamtestimonial = db.stream_testimonials;
const GeneralCoursetestimonial = db.general_course_testimonials;
const _ = require('lodash');
const sendsearch = require("../utility/Customsearch");




const getPagination = (page, size) => {

  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: videotestimonial } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, videotestimonial, totalPages, currentPage };
};

exports.create = async (req, res) => {


  try {
    const videotestimonialDetails = await videotestimonial.create({
      name: req.body.name,
      video_url: req.body.video_url,
      full_url: req.body.full_url,
      tag: req.body.tag,
      title: req.body.title ? req.body.title : null,
      designation: req.body.designation ? req.body.designation : null,
      description: req.body.description ? req.body.description : null,
    });
    console.log(req.body.colleges, "s");

    if (req.body.colleges && videotestimonialDetails.id) {
      const stream = JSON.parse(req.body.colleges);
      console.log(stream, "s");
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
  videotestimonial.findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(data => {
      const response = getPagingData(data, page, limit);




      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.videotestimonial
      });





    })
    .catch(err => {
      res.status(500).send({
        status: 0,
        message:

          err.message || "Some error occurred while retrieving videotestimonials."
      });
    });
};


exports.delete = async (req, res) => {
  const id = req.params.id;
  try {
    const existingRecord = await videotestimonial.findByPk(id);
    if (!existingRecord) {
      return res.status(404).send({
        status: 0,
        message: `delete  videotestimonial with id=${id}. Maybe videotestimonial was not found!`
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

    const num = await videotestimonial.destroy({
      where: { id: id }
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
        message: 'videotestimonial  deleted successfully',
      });
    } else {
      res.status(400).send({
        status: 0,
        message: `delete  videotestimonial with id=${id}. Maybe videotestimonial was not found!`
      });
    }
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Could not delete videotestimonial with id=" + id
    });
  }
};


exports.findOne = (req, res) => {
  const id = req.params.id;
  videotestimonial.findByPk(id, {
    include: [

      {
        required: false,
        association: "collegetestis",
        attributes: ["id", "college_id"],
        include: [
          {
            association: "clgtestis",
            attributes: ["id", "name"],
          },
        ],
      },


    ]
  })
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
          message: `Cannot find videotestimonial with id=${id}.`

        });


      }
    })
    .catch(err => {


      res.status(500).send({
        status: 0,
        message: "Error retrieving videotestimonial with id=" + id

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


    await videotestimonial.update({
      name: req.body.name,
      video_url: req.body.video_url,
      full_url: req.body.full_url,
      tag: req.body.tag,
      title: req.body.title ? req.body.title : null,
      designation: req.body.designation ? req.body.designation : null,
      description: req.body.description ? req.body.description : null,
    }, {
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