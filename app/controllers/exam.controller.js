const db = require("../models");
const path = require("path");
const exam = db.exam;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
const fee_details = db.exam_feedetails;
const eligibilities = db.exam_eligibilities;
const examdates = db.exam_dates;
const examage = db.exam_agelimits;
const examid = db.exam_id_proof_details;
const examfaqs = db.exam_faqs;
const fileTypes  = require("../config/fileTypes");
// Array of allowed files
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
  const { count: totalItems, rows: exam } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, exam, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let images = " ";
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

      let IsUpload = avatar.mv("./storage/exam_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "exam_promo_banner/" + logoname;
      }
    }
    if (req.files && req.files.cover_image) {
      let avatar = req.files.cover_image;

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

      let image = "image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/exam_cover/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "exam_cover/" + image;
      }
    }

    if (images == " ") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      let listingvalue =
        req.body.listing_order == 0 || req.body.listing_order == "null" ? null : req.body.listing_order;
        let examshortname = req.body.exam_short_name == "null" ? null : req.body.exam_short_name;
      const examDetails = await exam.create({
        exam_title: req.body.exam_title,
        slug: req.body.slug,
        exam_short_name: examshortname,
        upcoming_date: req.body.upcoming_date  && req.body.upcoming_date != "null"? req.body.upcoming_date : null,
        keywords: req.body.keywords ? req.body.keywords : null,
        meta_title: req.body.meta_title ? req.body.meta_title : null,
        meta_description: req.body.meta_description
          ? req.body.meta_description
          : null,
        meta_keyword: req.body.meta_keyword,
        centers: req.body.centers,
        exam_pattern: req.body.exam_pattern,
        important_dates: req.body.important_dates,
        tips: req.body.tips ,
        card: req.body.card ,
        colleges: req.body.colleges ,
        results: req.body.results ,

        stream_id: req.body.stream_id ? req.body.stream_id : null,
        cover_image: images,
        exam_description: req.body.exam_description,
        eligibility_criteria: req.body.eligibility_criteria,
        home_view_status: req.body.home_view_status,
        listing_order: listingvalue,
        status: req.body.status,
        promo_banner: promo_banner_names,
        promo_banner_status: req.body.promo_banner_status ,
      });

      // if (req.body.course_mode && coursesDetails.id) {
      //   const course_mode = JSON.parse(req.body.course_mode);

      //   await _.forEach(course_mode, function (value) {
      //     course_modes.create({
      //       courses_id: coursesDetails.id,
      //       modes_id: value.course_mode,
      //     });
      //   });
      // }
      // if (req.body.recruiters && coursesDetails.id) {
      //   const recruiters = JSON.parse(req.body.recruiters);

      //   await _.forEach(recruiters, function (value) {
      //     course_companies.create({
      //       courses_id: coursesDetails.id,
      //       companies_id: value.recruiters,
      //     });
      //   });
      // }

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: examDetails,
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.update = (req, res) => {
  const id = req.body.id;
// console.log(typeof req.body.listing_order);
  try {
    let images = " ";
    let promo_banner_names = "";

    let listingvalue =
    req.body.listing_order == 0 || req.body.listing_order == "null" ? null : req.body.listing_order;
    let examshortname = req.body.exam_short_name == "null" ? null : req.body.exam_short_name;
    
    // console.log("examshortname");
    console.log(req.body);
    let STREAD = {
      exam_title: req.body.exam_title,
      slug: req.body.slug,
      exam_short_name: examshortname,
      keywords: req.body.keywords,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      stream_id: req.body.stream_id ? req.body.stream_id : null,
      upcoming_date: req.body.upcoming_date && req.body.upcoming_date != "null"? req.body.upcoming_date : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,

      centers: req.body.centers,
      exam_pattern: req.body.exam_pattern,
      important_dates: req.body.important_dates,
      tips: req.body.tips ,
      card: req.body.card ,
      colleges: req.body.colleges ,
      results: req.body.results,

      exam_description: req.body.exam_description,
      eligibility_criteria: req.body.eligibility_criteria,
      home_view_status: req.body.home_view_status,
      listing_order: listingvalue,
      status: req.body.status,
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

      let IsUpload = avatar.mv("./storage/exam_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "exam_promo_banner/" + logoname;
        STREAD["promo_banner"] = promo_banner_names;
      }
    }
    if (req.files && req.files.cover_image) {
      let avatar = req.files.cover_image;

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

      let image = "image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/exam_cover/" + image) ? 1 : 0;

      if (IsUpload) {
        images = "exam_cover/" + image;
      }
      STREAD["cover_image"] = images;
    }

    exam.update(STREAD, {
      where: { id: req.body.id },
    });

    // if (req.body.course_mode && id) {
    //   course_modes.destroy({
    //     where: { courses_id: id },
    //   });
    //   const course_mode = JSON.parse(req.body.course_mode);

    //   _.forEach(course_mode, function (value) {
    //     course_modes.create({
    //       courses_id: id,
    //       modes_id: value.course_mode,
    //     });
    //   });
    // }

    // if (req.body.recruiters && id) {
    //   course_companies.destroy({
    //     where: { courses_id: id },
    //   });
    //   const recruiters = JSON.parse(req.body.recruiters);

    //   _.forEach(recruiters, function (value) {
    //     course_companies.create({
    //       courses_id: id,
    //       companies_id: value.recruiters,
    //     });
    //   });
    // }

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
  const { page, size, searchText, searchfrom, columnname, orderby } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var condition = sendsearch.customseacrh(searchText, searchfrom);
  let data_array = [];
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  exam
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
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
        data: response.exam,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving city.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  exam
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "EXam deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Exam with id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete Exam with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  exam
    .findByPk(id, {
      include: [
        {
          association: "stream",
          attributes: ["id", "stream_name", "stream_slug"],
        },
        {
          association: "examnews",
          attributes: ["id", "title", "slug"],
        },

        {
          association: "eligibilities",
          attributes: ["id", "title", "description"],
        },
        {
          association: "feedetails",
          attributes: ["id", "category", "amount"],
        },
        {
          association: "examdates",
          attributes: ["id", "event", "start_date", "end_date"],
        },
        {
          association: "examagelimit",
          attributes: ["id", "content", "description"],
        },
        {
          association: "examidproof",
          attributes: ["id", "content"],
        },
        {
          association: "examfaqs",
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
          message: `Cannot find courses with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err,
        message: "Error retrievingdd courses with id=" + id,
      });
    });
};

exports.updatefees = (req, res) => {
  try {
    if (req.body.feedetails && req.body.id) {
      fee_details.destroy({
        where: { exam_id: req.body.id },
      });
      const jobs = JSON.parse(req.body.feedetails);
      _.forEach(jobs, function (value) {
        fee_details.create({
          exam_id: req.body.id,
          category: value.category ? value.category : null,
          amount: value.amount ? value.amount : null,
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

exports.updateeligibilities = async (req, res) => {
  try {
    if (req.body.eligibilities && req.body.id) {
      await eligibilities.destroy({
        where: { exam_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.eligibilities);
      await _.forEach(eligibilty, function (value) {
        eligibilities.create({
          exam_id: req.body.id,
          title: value.title ? value.title : null,
          description: value.description ? value.description : null,
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

exports.updateexamdates = async (req, res) => {
  try {
    if (req.body.examdates && req.body.id) {
      await examdates.destroy({
        where: { exam_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.examdates);
      await _.forEach(eligibilty, function (value) {
        examdates.create({
          exam_id: req.body.id,
          event: value.event ? value.event : null,
          start_date: value.start_date ? value.start_date : null,
          end_date: value.end_date ? value.end_date : null,
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

exports.updateexamagelimit = async (req, res) => {
  try {
    if (req.body.examagelimit && req.body.id) {
      await examage.destroy({
        where: { exam_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.examagelimit);
      await _.forEach(eligibilty, function (value) {
        examage.create({
          exam_id: req.body.id,
          content: value.content ? value.content : null,
          description: value.description ? value.description : null,
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

exports.updateexamifproof = async (req, res) => {
  try {
    if (req.body.examidproof && req.body.id) {
      await examid.destroy({
        where: { exam_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.examidproof);
      await _.forEach(eligibilty, function (value) {
        examid.create({
          exam_id: req.body.id,
          content: value.content ? value.content : null,
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

exports.updateexamfaqs = async (req, res) => {
  try {
    if (req.body.examfaqs && req.body.id) {
      await examfaqs.destroy({
        where: { exam_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.examfaqs);
      await _.forEach(eligibilty, function (value) {
        examfaqs.create({
          exam_id: req.body.id,
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
