const db = require("../models");
const path = require("path");
const blog = db.blog;
const college_groups = db.college_groups;
const sendsearch = require("../utility/Customsearch");
// const { college_groups } = require("../models");

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

// const streamT = db.stream;
const Op = db.Sequelize.Op;
// Array of allowed files

const fileTypes = require("../config/fileTypes");
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
  const { count: totalItems, rows: blog } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, blog, totalPages, currentPage };
};

exports.create = async (req, res) => {

  try {
    let banner_images = "";

    if (req.files && req.files.banner_image) {
      let avatar = req.files.banner_image;

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

      let IsUpload = avatar.mv("./storage/blog_banner_image/" + logoname) ? 1 : 0;

      if (IsUpload) {
        banner_images = "blog_banner_image/" + logoname;
      }
    }

    const blogsDetails = await blog.create({
      name: req.body.name,
      slug: req.body.slug,
      category_id: req.body.category_id,
      banner_image: banner_images,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keywords: req.body.meta_keywords,
      overview: req.body.overview,
      status: req.body.status,
    });

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: blogsDetails,
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
    const existingRecord = await blog.findOne({
      where: { id: req.body.id },
    });

    if (!existingRecord) {
      return res.status(404).send({
        message: "Record not found",
        status: 0,
      });
    }

    let blogsUpdates = {
      name: req.body.name || existingRecord.name,
      slug: req.body.slug || existingRecord.slug,
      category_id: req.body.category_id || existingRecord.category_id,
      meta_title: req.body.meta_title || existingRecord.meta_title,
      meta_description: req.body.meta_description || existingRecord.meta_description,
      meta_keywords: req.body.meta_keywords || existingRecord.meta_keywords,
      overview: req.body.overview || existingRecord.overview,
      status: req.body.status || existingRecord.status,
    };

    // Check if a new logo is provided
    if (req.files && req.files.banner_image) {
      const avatar = req.files.banner_image;

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
      const uploadPath = "./storage/blog_banner_image/" + logoname;

      await avatar.mv(uploadPath);

      blogsUpdates.banner_image = "blog_banner_image/" + logoname;


      if (existingRecord.banner_image) {

        const oldLogoPath = "./storage/" + existingRecord.banner_image;
        await removeFile(oldLogoPath);
      }
    }

    // Update database record
    await blog.update(blogsUpdates, { where: { id: req.body.id } });

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
  const { page, size, searchtext, searchfrom, category_id, columnname, orderby } =
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

  if (category_id) {
    data_array.push({ category_id: category_id });

  }
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  blog
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        {
          required: false,
          association: "blogcategories",
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
        data: response.blog,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving blog.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  blog
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: id,
            },
          },
          {
            slug: {
              [Op.eq]: id,
            },
          },
        ],
      },
      include: [
        {
          required: false,
          association: "blogcategories",
          attributes: ["id", "name"],
        },


      ],
      subQuery: false,
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
          message: `Cannot find blog with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        error: err.message,
        message: "Error retrieving blog with id=" + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  blog
    .destroy({
      where: { id: id },
    })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "blog  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: ` delete blog with id=${id}. Maybe blog was not found!`,
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
