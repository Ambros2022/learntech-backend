const db = require("../models");
const path = require("path");
const generalcourse = db.generalcourse;
const generalcourse_faqs = db.generalcourse_faqs;
const _ = require("lodash");
const Op = db.Sequelize.Op;
// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const fileTypes  = require("../config/fileTypes");
// Array of allowed files
const array_of_allowed_file_types = fileTypes.Imageformat;

// // Allowed file size in mb
const allowed_file_size = 2;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: generalcourse } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, generalcourse, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logonames = "";
    let promo_banner_names = "";

    if (req.files && req.files.promo_banner) {
      let avatar = req.files.promo_banner;

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

      let logoname = "promo_banner" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/courses_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "courses_promo_banner/" + logoname;
      }
    }
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

      let IsUpload = avatar.mv("./storage/course_images/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "course_images/" + logoname;
      }
    }

    const generalcoursesDetails = await generalcourse.create({
      course_stream_name: req.body.course_stream_name,
      course_stream_slug: req.body.course_stream_slug,
      course_short_name: req.body.course_short_name
        ? req.body.course_short_name
        : null,
      description: req.body.description ? req.body.description : null,
      admission: req.body.admission ? req.body.admission : null,
      carrier_opportunities: req.body.carrier_opportunities
        ? req.body.carrier_opportunities
        : null,
      course_type: req.body.course_type ? req.body.course_type : null,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      stream_id: req.body.stream_id,
      sub_stream_id: req.body.sub_stream_id ? req.body.sub_stream_id : null,
      logo: logonames,
      promo_banner: promo_banner_names,
      promo_banner_status: req.body.promo_banner_status,
    });

    if (req.body.faqs && generalcoursesDetails.id) {
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, async function (value) {
        await generalcourse_faqs.create({
          generalcourse_id: generalcoursesDetails.id,
          questions: value.question ? value.question : null,
          answers: value.answer ? value.answer : null,
        });
      });
    }
    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: generalcoursesDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = async (req, res) => {
  const id = req.body.id;
  console.log(req.body.meta_title);

  try {
    let logonames = "";
    let promo_banner_names = "";
    let STREAD = {
      course_stream_name: req.body.course_stream_name,
      course_stream_slug: req.body.course_stream_slug,
      course_short_name:
        req.body.course_short_name && req.body.course_short_name !== "null"
          ? req.body.course_short_name
          : null,
      description:
        req.body.description && req.body.description !== "null"
          ? req.body.description
          : null,
      admission:
        req.body.admission && req.body.admission !== "null"
          ? req.body.admission
          : null,
      carrier_opportunities:
        req.body.carrier_opportunities &&
        req.body.carrier_opportunities !== "null"
          ? req.body.carrier_opportunities
          : null,
      course_type: req.body.course_type ? req.body.course_type : null,
      meta_description:
        req.body.meta_description && req.body.meta_description !== "null"
          ? req.body.meta_description
          : null,
      meta_title:
        req.body.meta_title && req.body.meta_title !== "null"
          ? req.body.meta_title
          : null,
      stream_id: req.body.stream_id,
      sub_stream_id: req.body.sub_stream_id ? req.body.sub_stream_id : null,
      promo_banner_status: req.body.promo_banner_status,
    };

    if (req.files && req.files.promo_banner) {
      let avatar = req.files.promo_banner;

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

      let logoname = "promo_banner" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/courses_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "courses_promo_banner/" + logoname;
        STREAD["promo_banner"] = promo_banner_names;
      }
    }
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

      let IsUpload = avatar.mv("./storage/course_images/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "course_images/" + logoname;
      }
      STREAD["logo"] = logonames;
    }

    generalcourse.update(STREAD, {
      where: { id: req.body.id },
    });

    if (req.body.faqs && req.body.id) {
      await generalcourse_faqs.destroy({
        where: { generalcourse_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, async function (value) {
        await generalcourse_faqs.create({
          generalcourse_id: req.body.id,
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

exports.findAll = async (req, res) => {
  const { page, size, searchText, stream_id, searchfrom, columnname, orderby } =
    req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var conditionStreamId = stream_id ? { stream_id: stream_id } : null;

  var condition = sendsearch.customseacrh(searchText, searchfrom);

  let data_array = [];
  conditionStreamId ? data_array.push(conditionStreamId) : null;
  condition ? data_array.push(condition) : null;
  data_array.push({ is_deleted: 0 });
  const { limit, offset } = getPagination(page, size);
  generalcourse
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        { association: "sub_stream", attributes: ["id", "sub_stream_name"] },
        { association: "streams", attributes: ["id", "stream_name"] },
      ],
      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.generalcourse,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving generalcourse.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  /*generalcourse.findByPk(id, { include: [{ association: 'sub_stream', attributes: ['id', 'sub_stream_name'] },
    { association: 'streams', attributes: ['id', 'stream_name'] }] })
*/

  generalcourse
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
          {
            course_stream_slug: {
              [Op.eq]: id,
            },
          },
        ],
      },
      include: [
        { association: "sub_stream", attributes: ["id", "sub_stream_name"] },
        { association: "streams", attributes: ["id", "stream_name"] },
        {
          required: false,
          association: "faqs",
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
          message: `Cannot find generalcourse with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving generalcourse with id=" + id,
      });
    });
};

exports.delete = async (req, res) => {

  const id = req.params.id;


  try {
    const item =  await generalcourse.update({ is_deleted: 1},{
      where: { id: id},
    });

    // console.log(item);
    // return 
    if (!item) {
      res.status(400).send({
        status: 0,
        message: ` delete generalcourse with id=${id}. Maybe generalcourse was not found!`,
      });
    }
   
   return res.status(200).send({
      status: 1,
      message: "generalcourse  deleted successfully",
   
    });
    // res.json(item);
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: "Could not delete generalcourse with id=" + id,
    });
  }

 
};
// exports.delete = (req, res) => {
//   const id = req.params.id;
//   generalcourse
//     .destroy({
//       where: { id: id },
//     })
//     .then((num) => {
//       if (num == 1) {
//         res.status(200).send({
//           status: 1,
//           message: "generalcourse  deleted successfully",
//         });
//       } else {
//         res.status(400).send({
//           status: 0,
//           message: ` delete generalcourse with id=${id}. Maybe generalcourse was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         status: 0,
//         message: "Could not delete Stream with id=" + id,
//       });
//     });
// };

exports.updatefaq = async (req, res) => {
  // return console.log(req.body);

  try {
    if (req.body.faqs && req.body.id) {
      await generalcourse_faqs.destroy({
        where: { generalcourse_id: req.body.id },
      });
      //  let data=  generalcourse_faqs.create({
      //     generalcourse_id : 2708,
      //     questions: "value.questions ? value.questions : null",
      //     answers: "value.answers ? value.answers : null",
      //   });

      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, async function (value) {
        await generalcourse_faqs.create({
          generalcourse_id: req.body.id,
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
