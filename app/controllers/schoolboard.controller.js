const db = require("../models");
const path = require("path");
const schoolboards = db.schoolboards;
const school_board_faqs = db.school_board_faqs;
const _ = require("lodash");
const Op = db.Sequelize.Op;


// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const fileTypes = require("../config/fileTypes");

// Function to remove a file
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
  const { count: totalItems, rows: schoolboards } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, schoolboards, totalPages, currentPage };
};


exports.create = async (req, res) => {
  try {
    let logos = "";

    if (req.files && req.files.logo) {
      let avatar = req.files.logo;

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

      let IsUpload = avatar.mv("./storage/schoolboard_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logos = "schoolboard_logo/" + logoname;
      }
    }
    if (logos == "") {
      return res.status(400).send({
        message: "insert logo",
        errors: {},
        status: 0,
      });
    } else {
      const schoolboardsDetails = await schoolboards.create({
        country_id: req.body.country_id,
        state_id: req.body.state_id,
        city_id: req.body.city_id,
        name: req.body.name,
        slug: req.body.slug,
        gender: req.body.gender,
        board_type: req.body.board_type,
        logo: logos,
        avg_rating: req.body.avg_rating,
        listing_order: req.body.listing_order,
        established: req.body.established,
        result_date: req.body.result_date,
        info: req.body.info,
        time_table: req.body.time_table,
        reg_form: req.body.reg_form,
        syllabus: req.body.syllabus,
        results: req.body.results,
        sample_paper: req.body.sample_paper,
      });

      res.status(200).send({
        status: 1,
        message: "Data Save Successfully",
        data: schoolboardsDetails,
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
  schoolboards
    .findAndCountAll({
      where: condition,
      limit,
      offset,
      include: [

        {
          required: false,
          association: "schoolboardfaqs",
          attributes: ["id", "questions", "answers"],
        },
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "state",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "citys",
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
        data: response.schoolboards,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving schoolboards.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  schoolboards
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "schoolboards  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete  schoolboards with id=${id}. Maybe schoolboards was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete schoolboards with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  schoolboards.findByPk(id, {
    include: [

      {
        required: false,
        association: "schoolboardfaqs",
        attributes: ["id", "questions", "answers"],
      },
      {
        required: false,
        association: "country",
        attributes: ["id", "name"],
      },
      {
        required: false,
        association: "state",
        attributes: ["id", "name"],
      },
      {
        required: false,
        association: "citys",
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
          message: `Cannot find schoolboards with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving schoolboards with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  try {

    const existingRecord = await schoolboards.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    let schoolboardsUpdates = {
      country_id: req.body.country_id || existingRecord.country_id,
      state_id: req.body.state_id || existingRecord.state_id,
      city_id: req.body.city_id || existingRecord.city_id,
      school_board_id: req.body.school_board_id || existingRecord.school_board_id,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      gender: req.body.gender || existingRecord.gender,
      board_type: req.body.board_type || existingRecord.board_type,
      avg_rating: req.body.avg_rating || existingRecord.avg_rating,
      listing_order: req.body.listing_order || existingRecord.listing_order,
      established: req.body.established || existingRecord.established,
      result_date: req.body.result_date || existingRecord.result_date,
      info: req.body.info || existingRecord.info,
      time_table: req.body.time_table || existingRecord.time_table,
      reg_form: req.body.reg_form || existingRecord.reg_form,
      syllabus: req.body.syllabus || existingRecord.syllabus,
      results: req.body.results || existingRecord.results,
      sample_paper: req.body.sample_paper || existingRecord.sample_paper,
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
      const uploadPath = "./storage/schoolboard_logo/" + logoname;

      await avatar.mv(uploadPath);

      schoolboardsUpdates.logo = "schoolboard_logo/" + logoname;

      if (existingRecord.logo) {
        console.log("existingRecord.icon", existingRecord.logo);
        const oldLogoPath = "./storage/" + existingRecord.logo;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await schoolboards.update(schoolboardsUpdates, { where: { id: req.body.id } });

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

exports.updatefaqs = async (req, res) => {

  try {
    if (req.body.faqs && req.body.id) {
      await school_board_faqs.destroy({
        where: { school_board_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        school_board_faqs.create({
          school_board_id: req.body.id,
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
