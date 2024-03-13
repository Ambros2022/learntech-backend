const db = require("../models");
const path = require("path");
const blog = db.blog;
const college_groups = db.college_groups;
const sendsearch = require("../utility/Customsearch");
// const { college_groups } = require("../models");

// const streamT = db.stream;
const Op = db.Sequelize.Op;
// Array of allowed files

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
  const { count: totalItems, rows: blog } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, blog, totalPages, currentPage };
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

      let IsUpload = avatar.mv("./storage/blog_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "blog_promo_banner/" + logoname;
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

      let logoname = "logo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/blog_cover/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "blog_cover/" + logoname;
      }
    }

    let listingvalue =
    req.body.listing_order == 0 || req.body.listing_order == "null" ? null : req.body.listing_order;

    const blogsDetails = await blog.create({
      title: req.body.title,
      category_id: req.body.category_id,
      author_id: req.body.author_id,
      group_id: req.body.group_id,
      slug: req.body.slug,
      body: req.body.body,
      status: req.body.status ? req.body.status : null,
      keywords: req.body.keywords ? req.body.keywords : null,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
      home_view_status: req.body.home_view_status ? req.body.home_view_status : null,
      listing_order: listingvalue,
      cover_image: logonames,
      promo_banner: promo_banner_names,
      promo_banner_status: req.body.promo_banner_status ,
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

exports.update = (req, res) => {
  try {
    let logonames = "";
    let promo_banner_names = "";

    let listingvalue =
    req.body.listing_order == 0 || req.body.listing_order == "null" ? null : req.body.listing_order;
    let STREAD = {
      title: req.body.title,
      category_id: req.body.category_id,
      author_id: req.body.author_id,
      group_id: req.body.group_id,
      slug: req.body.slug,
      body: req.body.body,
      status: req.body.status ? req.body.status : null,
      keywords: req.body.keywords ,
      meta_description: req.body.meta_description
        ? req.body.meta_description
        : null,
      meta_title: req.body.meta_title ? req.body.meta_title : null,
      meta_keyword: req.body.meta_keyword ? req.body.meta_keyword : null,
      home_view_status: req.body.home_view_status ? req.body.home_view_status : null,
      listing_order:listingvalue,
      promo_banner_status: req.body.promo_banner_status ,
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

      let IsUpload = avatar.mv("./storage/blog_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "blog_promo_banner/" + logoname;
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

      let logoname = "logo" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/blog_cover/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "blog_cover/" + logoname;
      }

      STREAD["cover_image"] = logonames;
    }

    blog.update(STREAD, {
      where: { id: req.body.id },
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
  const { page, size, searchText, searchfrom, author_id, columnname, orderby } =
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

  var conditionStreamId = author_id ? { author_id: author_id } : null;
  var condition = sendsearch.customseacrh(searchText, searchfrom);

  let data_array = [];
  conditionStreamId ? data_array.push(conditionStreamId) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  blog
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        { association: "author", attributes: ["id", "author_name"] },
        { association: "categories", attributes: ["id", "category_name"] },
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
        { association: "author", attributes: ["id", "author_name"] },
        { association: "categories", attributes: ["id", "category_name"] },
        {
          association: "groups",
          attributes: ["id", "group", "slug"],
          required: false,
        },
      ],
      subQuery: false,
    })

    .then((data) => {
      if (data) {
        //     if (data.group_id) {

        //         // college_groups
        //         // .findAndCountAll({

        //         //   where: data_array,
        //         // //   limit,
        //         // //   offset,
        //         // //   include: [
        //         // //     { association: "author", attributes: ["id", "author_name"] },
        //         // //     { association: "categories", attributes: ["id", "category_name"] },
        //         // //   ],
        //         // //   order: [orderconfig],
        //         // })
        //   let x=      college_groups.findAll({
        //             where: {
        //                 id: 11
        //             },
        //             subQuery: false,

        //           })
        //           console.log(x);
        //     //     .then((datas) => {
        //     //         console.log (datas);
        //     //     //   const response = getPagingData(data, page, limit);

        //     // //    return   res.status(200).send({
        //     // //         status: 1,
        //     // //         message: "success",
        //     // //         data: datas,
        //     // //         // totalItems: response.totalItems,
        //     // //         // currentPage: response.currentPage,
        //     // //         // totalPages: response.totalPages,
        //     // //         // data: response.blog,
        //     // //       });
        //     //     })
        //     //     .catch((err) => {
        //     //     //   res.status(500).send({
        //     //     //     status: 0,
        //     //     //     message: err.message || "Some error occurred while retrieving groups.",
        //     //     //   });
        //     //     });

        //       return res.status(200).send({
        //         status: 1,

        //         data: data,
        //       });

        //     }

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
