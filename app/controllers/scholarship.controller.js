const db = require("../models");
const path = require("path");
const scholarships = db.scholarships;
const scholargenders = db.scholar_gender;
const _ = require("lodash");
const sendsearch = require("../utility/Customsearch");

const Op = db.Sequelize.Op;
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
  const { count: totalItems, rows: scholarships } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, scholarships, totalPages, currentPage };
};

exports.create = async (req, res) => {
  try {
    let logos = "";

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

      let IsUpload = avatar.mv("./storage/scholarships_logo/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        logos = "scholarships_logo/" + logoname;
      }
    }

    const scholarshipsDetails = await scholarships.create({
      level_id: req.body.level_id,
      type_id: req.body.type_id,
      country_id: req.body.country_id,
      name: req.body.name,
      slug: req.body.slug,
      gender: req.body.gender,
      amount: req.body.amount,
      last_date: req.body.last_date,
      total_scholarships: req.body.total_scholarships,
      is_eligible: req.body.is_eligible,
      logo: logos,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      overview: req.body.overview,
      status: req.body.status,
    });

    if (req.body.genders && scholarshipsDetails.id) {
      const stream = JSON.parse(req.body.genders);
      _.forEach(stream, async function (value) {

        await scholargenders.create({
          gender_id: value.id,
          scholar_id: scholarshipsDetails.id,
        });
      });
    }
    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: scholarshipsDetails,
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
    // Check if the record exists in the database
    const existingRecord = await scholarships.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    const scholarshipsUpdates = {
      level_id: req.body.level_id || existingRecord.level_id,
      type_id: req.body.type_id || existingRecord.type_id,
      country_id: req.body.country_id || existingRecord.country_id,
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      gender: req.body.gender || existingRecord.gender,
      amount: req.body.amount || existingRecord.amount,
      last_date: req.body.last_date || existingRecord.last_date,
      total_scholarships: req.body.total_scholarships || existingRecord.total_scholarships,
      is_eligible: req.body.is_eligible || existingRecord.is_eligible,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      overview: req.body.overview || existingRecord.overview,
      status: req.body.status || existingRecord.status,
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
      const uploadPath = "./storage/scholarships_logo/" + logoname;

      await avatar.mv(uploadPath);

      scholarshipsUpdates.logo = "scholarships_logo/" + logoname;

      // If there's an old logo associated with the record, remove it
      if (existingRecord.logo) {
        // console.log("existingRecord.icon",existingRecord.logo);
        const oldLogoPath = "./storage/" + existingRecord.logo;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await scholarships.update(scholarshipsUpdates, { where: { id: req.body.id } });

    if (req.body.genders && req.body.id) {
      await scholargenders.destroy({
        where: { scholar_id: req.body.id },
      });
      const stream = JSON.parse(req.body.genders);
      _.forEach(stream, async function (value) {
        await scholargenders.create({
          scholar_id: req.body.id,
          gender_id: value.id,
        });
      });
    }

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
  scholarships
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      subQuery: false,
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholarlevels",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholartypes",
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
        data: response.scholarships,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving scholarships.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  scholarships
    .findByPk(id, {
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholarlevels",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "scholartypes",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "schgenders",
          attributes: ["id", "gender_id"],
          include: [
            {
              association: "genders",
              attributes: ["id", "name"],
            },
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
          message: `Cannot find scholarships with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving scholarships with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  scholarships
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "scholarships  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete scholarships with id=${id}. Maybe Stream was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete scholarships with id=" + id,
      });
    });
};
