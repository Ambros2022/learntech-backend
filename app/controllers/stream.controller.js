const db = require("../models");
const path = require("path");
const stream = db.stream;
const _ = require("lodash");
const streamfaq = db.stream_faq;
const Op = db.Sequelize.Op;

const groups = db.groups;

// Array of allowed files
const sendsearch = require("../utility/Customsearch");
const array_of_allowed_file_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];

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
  //  const obj = JSON.parse(req.body.mac);
  // var messages = Array.prototype.slice.call(req.body.mac);
  //req.body['mac[]'].length
  // console.log(req.body);
  try {
    let logonames = "";
    // let iconnames = "";
    // let promo_banner_names = "";

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

      let IsUpload = avatar.mv("./storage/stream_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "stream_promo_banner/" + logoname;
      }
    }
    if (req.files && req.files.icon) {
      let avatar = req.files.icon;

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

      let logoname = "icon" + Date.now() + path.extname(avatar.name);

      let IsUpload = avatar.mv("./storage/stream_icon/" + logoname) ? 1 : 0;

      if (IsUpload) {
        iconnames = "stream_icon/" + logoname;
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

      let IsUpload = avatar.mv("./storage/stream_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "stream_logo/" + logoname;
      }
    }
    let listingvalue =
      (req.body.listing_order == 0 || req.body.listing_order == '') ? null : req.body.listing_order;

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




      // listing_order: listingvalue,
      // icon: iconnames,
      // promo_banner: promo_banner_names,
      // promo_banner_status: req.body.promo_banner_status,
    });

    if (req.body.faqs && streamDetails.id) {
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        streamfaq.create({
          stream_id: streamDetails.id,
          questions: value.question ? value.question : null,
          answers: value.answer ? value.answer : null,
        });
      });
    }

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
  // console.log(req.query);

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

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
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
        {
          // limit:10,
          // required: false,
          separate: true,
          association: "str",
          attributes: [
            "id",
            "course_stream_name",
            "course_short_name",
            "course_stream_slug",
            "course_type",
            "description",
            "logo",
          ],

          // subquery:false,
          include: [
            {
              required: false,
              association: "streams",
              attributes: ["id", "stream_name"],
            },
          ],
          include: [
            {
              required: false,
              association: "course",
              attributes: [
                "id",
                "course_type",
                "brochure",
                "duration",
                "status",
              ],
              include: [
                {
                  required: false,
                  association: "coursemodes",
                  attributes: ["id", "modes_id"],
                  include: [
                    {
                      required: false,
                      association: "modess",
                      attributes: ["id", "mode"],
                    },
                  ],
                },
                {
                  required: false,
                  association: "cousrsefees",
                  attributes: ["id", "type", "title", "note", "total_amount"],
                  include: [
                    {
                      required: false,
                      association: "feedetail",
                      attributes: ["sub_title", "amount"],
                    },
                  ],
                },
              ],
            },
          ],
          // limit:10,

          // include: [
          //   {
          //     association: "course",
          //     attributes: ["id", "course_type", "status"],
          //     // where: {
          //     //   course_type: "UG",
          //     // },
          //   },

          // ],
        },
        // {
        //   required:false,
        //   association: "ugcourse",
        //   attributes: [
        //     "id",
        //     "course_stream_name",
        //     "course_short_name",
        //     "course_stream_slug",
        //     "course_type",
        //     "logo",
        //   ],
        //       where: {
        //         course_type: "UG",
        //       },

        // },
        // {
        //   required:false,
        //   association: "pgcourse",
        //   attributes: [
        //     "id",
        //     "course_stream_name",
        //     "course_short_name",
        //     "course_stream_slug",
        //     "course_type",
        //     "logo",
        //   ],
        //       where: {
        //         course_type: "PG",
        //       },

        // },
        // {
        //   required:false,
        //   association: "diplomacourse",
        //   attributes: [
        //     "id",
        //     "course_stream_name",
        //     "course_short_name",
        //     "course_stream_slug",
        //     "course_type",
        //     "logo",
        //   ],
        //       where: {
        //         course_type: "Diploma",
        //       },

        // },
        // {
        //   required:false,
        //   association: "doctratecourse",
        //   attributes: [
        //     "id",
        //     "course_stream_name",
        //     "course_short_name",
        //     "course_stream_slug",
        //     "course_type",
        //     "logo",
        //   ],
        //       where: {
        //         course_type: "PhD",
        //       },

        // },

        {
          required: false,
          association: "faqs",
          attributes: ["id", "questions", "answers"],
        },
      ],
      // limit:10
      // subquery:true,
    })
    .then(async (data) => {
      if (data) {
        let grpname = data.stream_name ? data.stream_name : null;
        console.log(grpname);
        let collegewithgroups = await groups.findOne({
          where: {
            [Op.or]: [
              {
                group: {
                  [Op.eq]: grpname,
                },
              },
            ],
          },
          attributes: ["id", "title", "slug", "group"],
          include: [
            {
              required: false,
              association: "colllegegroup",
              attributes: ["id", "college_and_university_id", "group_id"],
              include: [
                {
                  required: false,
                  association: "college_groupss",
                  attributes: ["id", "type", "name", "slug", "avg_rating", "logo", "status"],
                  where: {
                    type: "college",
                    status: "Published",
                  },
                },
              ],
            },
          ],
          limit: 30,
          subQuery: false,
        });

        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
          data1: collegewithgroups,
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
  const id = req.body.id;
  console.log(req.body);

  try {
    let logonames = "";
    // let iconnames = "";
    // let promo_banner_names = "";
    let listingvalue =
      (req.body.listing_order == 0 || req.body.listing_order == '') ? null : req.body.listing_order;
    let STREAD = {
      // stream_name: req.body.stream_name,
      // stream_slug: req.body.stream_slug,
      // meta_title: req.body.meta_title ? req.body.meta_title : null,
      // h1_title: req.body.h1_title,
      // title_description: req.body.title_description
      //   ? req.body.title_description
      //   : null,
      // keywords:
      //   req.body.keywords ,
      // ug_box: req.body.ug_box ,
      // pg_box: req.body.pg_box ,
      // doctorate_box: req.body.doctorate_box ,
      // diploma_box: req.body.diploma_box,
      // description_box: req.body.description_box,
      // eligibility_criteria: req.body.eligibility_criteria,
      // placement_career: req.body.placement_career,
      // top_recruiters: req.body.top_recruiters ? req.body.top_recruiters : null,
      // job_analysis: req.body.job_analysis ? req.body.job_analysis : null,
      // stream_description: req.body.stream_description,
      // home_view_status: req.body.home_view_status,
      // promo_banner_status: req.body.promo_banner_status,
      // listing_order: listingvalue,
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

      let IsUpload = avatar.mv("./storage/stream_promo_banner/" + logoname)
        ? 1
        : 0;

      if (IsUpload) {
        promo_banner_names = "stream_promo_banner/" + logoname;
        STREAD["promo_banner"] = promo_banner_names;
      }
    }
    if (req.files && req.files.icon) {
      let avatar = req.files.icon;

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
      if (req.icon != "") {
        let logoname = "icon" + Date.now() + path.extname(avatar.name);

        let IsUpload = avatar.mv("./storage/stream_icon/" + logoname) ? 1 : 0;

        if (IsUpload) {
          iconnames = "stream_icon/" + logoname;
          STREAD["icon"] = iconnames;
        }
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

      let IsUpload = avatar.mv("./storage/stream_logo/" + logoname) ? 1 : 0;

      if (IsUpload) {
        logonames = "stream_logo/" + logoname;
        STREAD["logo"] = logonames;
      }
    }

    await stream.update(STREAD, {
      where: { id: req.body.id },
    });

    if (req.body.faqs && req.body.id) {
      await streamfaq.destroy({
        where: { stream_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      _.forEach(faqss, async function (value) {
        await streamfaq.create({
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

exports.updatefaq = async (req, res) => {
  const id = req.body.id;

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
