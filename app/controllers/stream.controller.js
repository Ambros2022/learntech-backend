const db = require("../models");
const path = require("path");
const stream = db.stream;
const _ = require("lodash");
const streamfaq = db.stream_faq;
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
  const { count: totalItems, rows: stream } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, stream, totalPages, currentPage };
};

exports.create = async (req, res) => {

  try {
    let logonames = "";
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

      let IsUpload = avatar.mv("./storage/stream_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "stream_logo/" + logoname;
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

      let IsUpload = avatar.mv("./storage/stream_banner/" + logoname) ? 1 : 0;

      if (IsUpload) {
        banners = "stream_banner/" + logoname;
      }
    }

    const streamDetails = await stream.create({
      name: req.body.name,
      slug: req.body.slug,
      h1_title: req.body.h1_title ? req.body.h1_title : null,
      description: req.body.description ? req.body.description : null,
      top_college: req.body.top_college,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      listing_order: req.body.listing_order,
      top_college: req.body.top_college,
      logo: logonames,
      banner: banners,

    });



    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: streamDetails,
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
  stream
    .findAndCountAll({
      where: condition, limit, offset,
      include: [

        {
          required: false,
          association: "streamfaqs",
          attributes: ["id", "questions", "answers"],
        },

      ],
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
        data: response.stream,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving Streams.",
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  stream
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "Stream  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete Sub Stream with id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete Stream with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  stream.findByPk(id, {
    include: [
      {
        required: false,
        association: "streamfaqs",
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
          message: `Cannot find streams with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving streams with id=" + id,
      });
    });
};

exports.findOneWebView = (req, res) => {
  const id = req.params.id;

  stream
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
          {
            stream_slug: {
              [Op.eq]: id,
            },
          },
        ],
      },
      include: [
        { association: "faqs", attributes: ["id", "questions", "answers"] },
        {
          association: "str",
          attributes: [
            "id",
            "course_stream_name",
            "course_short_name",
            "course_stream_slug",
          ],
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
          message: `Cannot find Stream with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving stream with id=" + id,
      });
    });
};

exports.update = async (req, res) => {

  try {

    const existingRecord = await stream.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }


    const streamUpdates = {
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      h1_title: req.body.h1_title || existingRecord.h1_title,
      description: req.body.description || existingRecord.description,
      top_college: req.body.top_college || existingRecord.top_college,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keyword: req.body.meta_keyword || existingRecord.meta_keyword,
      listing_order: req.body.listing_order || existingRecord.listing_order,
      top_college: req.body.top_college || existingRecord.top_college,
      // logo: logonames,
    };
    if (req.files && req.files.logo) {
      const avatar = req.files.logo;

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

      const logoname = "logo" + Date.now() + path.extname(avatar.name);
      const UploadPath = "./storage/stream_logo/" + logoname;

      await avatar.mv(UploadPath);

      streamUpdates.logo = "stream_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.logo) {
        const oldLogoPath = "./storage/" + existingRecord.logo;
        await removeFile(oldLogoPath);
      }
    }

    if (req.files && req.files.banner) {
      const avatar = req.files.banner;

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

      const logoname = "banner" + Date.now() + path.extname(avatar.name);
      const UploadPath = "./storage/stream_banner/" + logoname;

      await avatar.mv(UploadPath);

      streamUpdates.banner = "stream_banner/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.banner) {
        const oldLogoPath = "./storage/" + existingRecord.banner;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await stream.update(streamUpdates, { where: { id: req.body.id } });


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
      await streamfaq.destroy({
        where: { stream_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        streamfaq.create({
          stream_id: req.body.id,
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

exports.schoollevelfindAll = async (req, res) => {
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
  level
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
        data: response.school,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving schooltype",
      });
    });
};