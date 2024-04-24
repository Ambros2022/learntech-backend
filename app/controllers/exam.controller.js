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
const fileTypes = require("../config/fileTypes");

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
    let cover_images = " ";
    let promo_banners = "";

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

      let logoname = "cover_image" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/exam_cover_image/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        cover_images = "exam_cover_image/" + logoname;
      }
    }
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

      let image = "promo_banner" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/exam_promo_banner/" + image) ? 1 : 0;

      if (IsUpload) {
        promo_banners = "exam_promo_banner/" + image;
      }
    }
    {


      const examsDetails = await exam.create({
        stream_id: req.body.stream_id,
        exam_title: req.body.exam_title,
        slug: req.body.slug,
        upcoming_date: req.body.upcoming_date,
        exam_short_name: req.body.exam_short_name,
          meta_title: req.body.meta_title,
        meta_description: req.body.meta_description,
        meta_keywords: req.body.meta_keywords,
        overview: req.body.overview,
        exam_dates: req.body.exam_dates,
        eligibility_criteria: req.body.eligibility_criteria,
        syllabus: req.body.syllabus,
        cutoff: req.body.cutoff,
        admit_card: req.body.admit_card,
        exam_centers: req.body.exam_centers,
        results: req.body.results,
        prepretion_tips: req.body.prepretion_tips,
        counseling: req.body.counseling,
        accept_colleges: req.body.accept_colleges,
       promo_banner_status: req.body.promo_banner_status,
        status: req.body.status,
        cover_image: cover_images,
        promo_banner: promo_banners,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: examsDetails,
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

exports.update = async (req, res) => {
  try {
    // Check if the record exists in the database
    const existingRecord = await exam.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    let examsUpdates = {
      stream_id: req.body.stream_id || existingRecord.stream_id,
      exam_title: req.body.exam_title || existingRecord.exam_title,
      slug: req.body.slug || existingRecord.slug,
      upcoming_date: req.body.upcoming_date || existingRecord.upcoming_date,
      exam_short_name: req.body.exam_short_name || existingRecord.exam_short_name,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      overview: req.body.overview || existingRecord.overview,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      overview: req.body.overview || existingRecord.overview,
      exam_dates: req.body.exam_dates || existingRecord.exam_dates,
      eligibility_criteria: req.body.eligibility_criteria || existingRecord.eligibility_criteria,
      syllabus: req.body.syllabus || existingRecord.syllabus,
      cutoff: req.body.cutoff || existingRecord.cutoff,
      admit_card: req.body.admit_card || existingRecord.admit_card,
      exam_centers: req.body.exam_centers || existingRecord.exam_centers,
      results: req.body.results || existingRecord.results,
      prepretion_tips: req.body.prepretion_tips || existingRecord.prepretion_tips,
      counseling: req.body.counseling || existingRecord.counseling,
      accept_colleges: req.body.accept_colleges || existingRecord.accept_colleges,
      // promo_banner: req.body.promo_banner || existingRecord.promo_banner,
      promo_banner_status: req.body.promo_banner_status || existingRecord.promo_banner_status,
      status: req.body.status || existingRecord.status,
    };

    // Check if a new logo is provided
    if (req.files && req.files.cover_image) {
      const avatar = req.files.cover_image;

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

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const uploadPath = "./storage/exam_cover_image/" + logoname;

      await avatar.mv(uploadPath);

      examsUpdates.cover_image = "exam_cover_image/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.cover_image) {
        // console.log("existingRecord.icon",existingRecord.amenities_logo);
        const oldLogoPath = "./storage/" + existingRecord.cover_image;
        await removeFile(oldLogoPath);
      }
    }

    // Check if a new logo is provided
    if (req.files && req.files.promo_banner) {
      const avatar = req.files.promo_banner;

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

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const uploadPath = "./storage/exam_promo_banner/" + logoname;

      await avatar.mv(uploadPath);

      examsUpdates.promo_banner = "exam_promo_banner/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.promo_banner) {
        // console.log("existingRecord.icon",existingRecord.amenities_logo);
        const oldLogoPath = "./storage/" + existingRecord.promo_banner;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await exam.update(examsUpdates, { where: { id: req.body.id } });

    res.status(200).send({
      status: 1,
      message: "Data saved successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error.message,
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
          message: "exam deleted successfully",
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
      // include: [
      //   {
      //     association: "stream",
      //     attributes: ["id", "stream_name", "stream_slug"],
      //   },
      //   {
      //     association: "examnews",
      //     attributes: ["id", "title", "slug"],
      //   },

      //   {
      //     association: "eligibilities",
      //     attributes: ["id", "title", "description"],
      //   },
      //   {
      //     association: "feedetails",
      //     attributes: ["id", "category", "amount"],
      //   },
      //   {
      //     association: "examdates",
      //     attributes: ["id", "event", "start_date", "end_date"],
      //   },
      //   {
      //     association: "examagelimit",
      //     attributes: ["id", "content", "description"],
      //   },
      //   {
      //     association: "examidproof",
      //     attributes: ["id", "content"],
      //   },
      //   {
      //     association: "examfaqs",
      //     attributes: ["id", "questions", "answers"],
      //   },
      // ],
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
