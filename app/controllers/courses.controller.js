const db = require("../models");
const path = require("path");
const courses = db.courses;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");
const Op = db.Sequelize.Op;
const course_modes = db.course_modes;
const course_exams = db.course_exams;
const course_companies = db.course_companies;
const mediums = db.mediums;
const modes = db.modes;
const job = db.job;
const eligibilities = db.eligibilities;
const salary_trends = db.salary;
const gallery = db.gallery;
const fees = db.fees;
const fee_details = db.fee_details;
const syllabus = db.syllabus;
const syllabus_details = db.syllabus_details;
const fileTypes = require("../config/fileTypes");
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
  const { count: totalItems, rows: courses } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, courses, totalPages, currentPage };
};

exports.create = async (req, res) => {
  let general_course_id = req.body?.general_course_id;

// Convert empty string or 'null' to actual null
if (!general_course_id || general_course_id === 'null') {
  general_course_id = null;
}
  try {

    {
      const coursesDetails = await courses.create({
        college_id: req.body.college_id,
        general_course_id: general_course_id  ,
        course_type: req.body.course_type,
        slug: req.body.slug,
        meta_title: req.body.meta_title,
        meta_description: req.body.meta_description,
        meta_keywords: req.body.meta_keywords,
        course_details: req.body.course_details,
        eligibility: req.body.eligibility,
        fee_structure: req.body.fee_structure,
        status: req.body.status,
        course_short_name: req.body.course_short_name,
        title: req.body.title,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: coursesDetails,
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
  let general_course_id = req.body?.general_course_id;

// Convert empty string or 'null' to actual null
if (!general_course_id || general_course_id === 'null') {
  general_course_id = null;
}


  try {

    courses.update({
      college_id: req.body.college_id,
      general_course_id: general_course_id ,
      course_type: req.body.course_type,
      slug: req.body.slug,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      course_details: req.body.course_details,
      eligibility: req.body.eligibility,
      fee_structure: req.body.fee_structure,
      status: req.body.status,
      course_short_name: req.body.course_short_name,
      title: req.body.title,
    }, {
      where: { id: req.body.id }
    });


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
  const {
    page,
    size,
    searchtext,
    searchfrom,
    columnname,
    orderby,
    college_id,
    general_course_id,
    status,
    course_type,
  } = req.query;

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

  if (college_id) {
    data_array.push({ college_id: college_id });
  }

  if (general_course_id) {
    data_array.push({ general_course_id: general_course_id });
  }

  if (status) {
    data_array.push({ status: status });
  }

  if (course_type) {
    data_array.push({ course_type: course_type });
  }

  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  courses
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        {
          required: false,
          association: "college",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "generalcourse",
          attributes: ["id", "name"],
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
        data: response.courses,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving courses.",
      });
    });
};
exports.delete = (req, res) => {
  const id = req.params.id;
  courses
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "courses deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `courseswith id=${id}  was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete courses with id=" + id,
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  courses
    .findByPk(id, {
      include: [
        {
          required: false,
          association: "college",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "generalcourse",
          attributes: ["id", "name"],
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
exports.mediumfindAll = (req, res) => {
  const { searchtext, searchfrom, columnname, orderby } = req.query;
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

  mediums
    .findAndCountAll({
      where: data_array,
      order: [orderconfig],
    })
    .then((data) => {
      res.status(200).send({
        status: 1,
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving mediums.",
      });
    });
};
exports.modesfindAll = (req, res) => {
  const { searchtext, searchfrom, columnname, orderby } = req.query;
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

  modes
    .findAndCountAll({
      where: data_array,
      order: [orderconfig],
    })
    .then((data) => {
      res.status(200).send({
        status: 1,
        message: "success",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving mediums.",
      });
    });
};

exports.updatejob_analysis = (req, res) => {
  try {
    if (req.body.job && req.body.id) {
      job.destroy({
        where: { course_id: req.body.id },
      });
      const jobs = JSON.parse(req.body.job);
      _.forEach(jobs, function (value) {
        job.create({
          course_id: req.body.id,
          job_profile: value.job_profile ? value.job_profile : null,
          job_description: value.job_description ? value.job_description : null,
          average_salary: value.average_salary ? value.average_salary : null,
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
        where: { course_id: req.body.id },
      });
      const eligibilty = JSON.parse(req.body.eligibilities);
      await _.forEach(eligibilty, function (value) {
        eligibilities.create({
          course_id: req.body.id,
          stream: value.stream ? value.stream : null,
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

exports.updatesalary = async (req, res) => {
  try {
    if (req.body.salary && req.body.id) {
      await salary_trends.destroy({
        where: { course_id: req.body.id },
      });
      const salaries = JSON.parse(req.body.salary);
      await _.forEach(salaries, function (value) {
        salary_trends.create({
          course_id: req.body.id,
          salary_year: value.salary_year ? value.salary_year : null,
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

exports.updategallery = async (req, res) => {
  try {
    let images = " ";

    if (req.files && req.files.image) {
      let avatar = req.files.image;
      if (avatar.length > 1) {
        var totalimages = new Array();

        await avatar.forEach((element) => {
          if (!array_of_allowed_file_types.includes(element.mimetype)) {
            return res.status(400).send({
              message: "Invalid File types ",
              errors: {},
              status: 0,
            });
          }

          if (element.size / (1024 * 1024) > allowed_file_size) {
            return res.status(400).send({
              message: "File too large ",
              errors: {},
              status: 0,
            });
          }

          let imgname =
            "image" + Date.now() + Math.random() + path.extname(element.name);

          let IsUploadss = element.mv("./storage/gallery/" + imgname) ? 1 : 0;

          if (IsUploadss) {
            let newimg = "gallery/" + imgname;
            totalimages.push(newimg);
          }
        });

        // console.log(totalimages);
        if (totalimages == " ") {
          return res.status(400).send({
            message: "insert images",
            errors: {},
            status: 0,
          });
        }

        if (req.body.id) {
          await gallery.destroy({
            where: { course_id: req.body.id },
          });

          await _.forEach(totalimages, function (value) {
            gallery.create({
              course_id: req.body.id,

              images: value,
            });
          });

          return res.status(200).send({
            status: 1,
            message: "Data Save Successfully",
          });
        }
      }

      if (!array_of_allowed_file_types.includes(avatar.mimetype)) {
        return res.status(400).send({
          message: "Invalid File type",
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
      // console.log(image);
      let IsUpload = avatar.mv("./storage/gallery/" + image) ? 1 : 0;
      // console.log(avatar.mv("./storage/gallery/" + image));

      if (IsUpload) {
        images = "gallery/" + image;
      }
      if (images == " ") {
        return res.status(400).send({
          message: "insert logo",
          errors: {},
          status: 0,
        });
      } else {
        if (req.body.id) {
          await gallery.destroy({
            where: { course_id: req.body.id },
          });
        }
        await gallery.create({
          course_id: req.body.id,

          images: images,
        });

        return res.status(200).send({
          status: 1,
          message: "Data Save Successfully",
        });
      }
    }
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.updatefees = async (req, res) => {
  try {
    if (req.body.cousrsefees && req.body.id) {
      await fees.destroy({
        where: { course_id: req.body.id },
      });
      const data = JSON.parse(req.body.cousrsefees);
      await _.forEach(data, function (value) {
        fees
          .create({
            course_id: req.body.id,
            type: value.type ? value.type : null,
            title: value.title ? value.title : null,
            note: value.note ? value.note : null,
            total_amount: value.total_amount ? value.total_amount : null,
          })
          .then(async (data) => {
            if (value.feedetail && data.id) {
              await fee_details.destroy({
                where: { fee_id: data.id },
              });
              const feedetail = value.feedetail;

              await _.forEach(feedetail, function (value) {
                fee_details.create({
                  fee_id: data.id,
                  sub_title: value.sub_title ? value.sub_title : null,
                  amount: value.amount ? value.amount : null,
                });
              });
            }
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

exports.updatesyllabus = async (req, res) => {
  try {
    if (req.body.coursesyllabus && req.body.id) {
      await syllabus.destroy({
        where: { course_id: req.body.id },
      });
      const data = JSON.parse(req.body.coursesyllabus);
      await _.forEach(data, function (value) {
        syllabus
          .create({
            course_id: req.body.id,
            title: value.title ? value.title : null,
          })
          .then(async (data) => {
            if (value.syllabussdetails && data.id) {
              await syllabus_details.destroy({
                where: { syllabus_id: data.id },
              });
              const syllabussdetails = value.syllabussdetails;

              await _.forEach(syllabussdetails, function (value) {
                syllabus_details.create({
                  syllabus_id: data.id,
                  subject: value.subject ? value.subject : null,
                  description: value.description ? value.description : null,
                });
              });
            }
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
