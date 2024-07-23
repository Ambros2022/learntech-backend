const db = require("../models");
const path = require("path");
const generalcourse = db.general_course;
const generalcourse_faq = db.general_course_faqs;
const _ = require("lodash");
const Op = db.Sequelize.Op;
// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const fileTypes = require("../config/fileTypes");
// Array of allowed files
const array_of_allowed_file_types = fileTypes.Imageformat;

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
    let logos = "";
    let banners = "";


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

      let IsUpload = avatar.mv("./storage/course_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logos = "course_logo/" + logoname;
      }
    }

    if (req.files && req.files.banner) {
      let avatar = req.files.banner;

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

      let logoname = "banner" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/course_banner/" + logoname) ? 1 : 0;

      if (IsUpload) {
        banners = "course_banner/" + logoname;
      }
    }

    const generalcoursesDetails = await generalcourse.create({
      stream_id: req.body.stream_id,
      sub_streams_id: req.body.sub_streams_id,
      course_type: req.body.course_type,
      name: req.body.name,
      slug: req.body.slug,
      short_name: req.body.short_name,
      duration: req.body.duration,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      description: req.body.description,
      syllabus: req.body.syllabus,
      admissions: req.body.admissions,
      career_opportunities: req.body.career_opportunities,
      top_college: req.body.top_college,
      logo: logos,
      is_trending: req.body.is_trending,
      is_top_rank: req.body.is_top_rank,
      status: req.body.status,
      banner: banners,
    });

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
  try {

    const existingRecord = await generalcourse.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }


    let generalcourseupdates = {
      stream_id: req.body.stream_id || existingRecord.stream_id,
      sub_streams_id: req.body.sub_streams_id || existingRecord.sub_streams_id,
      course_type: req.body.course_type || existingRecord.course_type,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      short_name: req.body.short_name || existingRecord.short_name,
      duration: req.body.duration || existingRecord.duration,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      description: req.body.description || existingRecord.description,
      syllabus: req.body.syllabus || existingRecord.syllabus,
      admissions: req.body.admissions || existingRecord.admissions,
      career_opportunities: req.body.career_opportunities || existingRecord.career_opportunities,
      top_college: req.body.top_college || existingRecord.top_college,
      is_trending: req.body.is_trending || existingRecord.is_trending,
      is_top_rank: req.body.is_top_rank || existingRecord.is_top_rank,
      status: req.body.status || existingRecord.status,
      // logo: logos,
    };

    // Check if a new logo is provided
    if (req.files && req.files.logo) {
      const avatar = req.files.logo;

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
      const uploadPath = "./storage/course_logo/" + logoname;

      await avatar.mv(uploadPath);

      generalcourseupdates.logo = "course_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.logo) {

        const oldLogoPath = "./storage/" + existingRecord.logo;
        await removeFile(oldLogoPath);
      }
    }

    
    if (req.files && req.files.banner) {
      const avatar = req.files.banner;

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

      const logoname = "banner" + Date.now() + path.extname(avatar.name);
      const uploadPath = "./storage/course_banner/" + logoname;

      await avatar.mv(uploadPath);

      generalcourseupdates.banner = "course_banner/" + logoname;

      // If there's an old logo associated with the record, remove it
    //   if (existingRecord.banner) {

    //     const oldLogoPath = "./storage/" + existingRecord.logo;
    //     await removeFile(oldLogoPath);
    //   }
    // }

    if (existingRecord.course_banner) {

      const oldLogoPath = "./storage/" + existingRecord.course_banner;
      await removeFile(oldLogoPath);
    }
  }

   

    // Update database record
    await generalcourse.update(generalcourseupdates, { where: { id: req.body.id } });

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
  const { page, size, searchtext, stream_id, searchfrom, columnname, orderby } =
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

  

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];

  if (stream_id ) {
    data_array.push({ stream_id : stream_id  });
  }

  condition ? data_array.push(condition) : null;


  
  const { limit, offset } = getPagination(page, size);
  generalcourse
    .findAndCountAll({
      where: data_array, condition,
      limit,
      offset,
      include: [
        {
          required: false,
          association: "streams",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "sub_streams",
          attributes: ["id", "sub_stream_name"],
        },
        {
          required: false,
          association: "generalcoursefaqs",
          attributes: ["id", "questions", "answers"],
        },

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
  generalcourse.findByPk(id, {
    include: [
      {
        required: false,
        association: "streams",
        attributes: ["id", "name"],
      },
      {
        required: false,
        association: "sub_streams",
        attributes: ["id", "sub_stream_name"],
      },
      {
        required: false,
        association: "generalcoursefaqs",
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
          message: `Cannot find general courses with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving general courses with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  generalcourse
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "general course  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete general course with id=${id}. Maybe general course was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete general course with id=" + id,
      });
    });
};


exports.updatefaq = async (req, res) => {

  try {
    if (req.body.faqs && req.body.id) {
      await generalcourse_faq.destroy({
        where: { general_course_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        generalcourse_faq.create({
          general_course_id: req.body.id,
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