const db = require("../models");
const path = require("path");
const College = db.College;
const _ = require("lodash");
const streamfaq = db.stream_faq;
const area = db.area;
const city = db.city;
const college_affiliation = db.college_affiliation;
const college_accreditation = db.college_accreditation;
const collegeRecognition = db.collegeRecognition;
const college_amenities = db.college_amenities;
const college_management = db.college_management;
const college_groups = db.college_groupss;
const college_stream = db.college_stream;

const placements = db.placements;
const board_colleges = db.board_colleges;
const f_a_qs = db.f_a_qs;
const cutoff = db.cutoff;
const cutoffdetails = db.cutoffdetails;
const collegegallery = db.collegegallery;
const rankings = db.rankings;
const university_colleges = db.university_colleges;
const Op = db.Sequelize.Op;
const sendsearch = require("../utility/Customsearch");
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
  const { count: totalItems, rows: CollegeAndUniversity } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, CollegeAndUniversity, totalPages, currentPage };
};
exports.findAll = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    // city_id,
    // area_id,
    searchfrom,
    columnname,
    orderby,
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

  // var conditioncity_id = city_id ? { city_id: city_id } : null;
  // var conditionarea_id = area_id ? { area_id: area_id } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  // conditioncity_id ? data_array.push(conditioncity_id) : null;
  // conditionarea_id ? data_array.push(conditionarea_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);

  let exclude_value = [
    // "established",
    // "areaId",
    // "cityId",
    // "rank",
    // "slug",
    // "meta_title",
    // "meta_description",
    // "meta_keyword",
    // "code_before_head",
    // "code_before_body",
    // "facts",
    // "listing_order",
    // "keywords",
    // "top_featured_order",
    // "is_top_featured",
    // "created_at",
    // "updated_at",
    // "college_type",
    // "genders_accepted",
    // "campus_size",
    // "campus_size_type",
    // "address",
    // "map",
    // "home_view_status",
    // "order",
    // "about",
    // "video_full_url",
    // "Scholarships",
    // "admissions",
    // "exam_data",
    // "why_choose",
    // "career_opportunities",
  ];

  College.findAndCountAll({
    where: data_array,
    limit,
    offset,
    attributes: { exclude: exclude_value },
    include: [
      // { association: "city", attributes: ["id", "city_name"] },
      // { association: "area", attributes: ["id", "area_name"] },
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
        data: response.College,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving colleges.",
      });
    });
};
exports.findOne = (req, res) => {
  const id = req.params.id;
  College.findByPk(id, {
    // include: [
    //   { association: "city", attributes: ["id", "city_name"] },
    //   { association: "area", attributes: ["id", "area_name"] },
    //   {
    //     association: "college_groups",
    //     attributes: ["id", "group_id"],
    //   },
    //   {
    //     association: "board_colleges",
    //     attributes: ["id", "board_id"],
    //   },
    //   {
    //     association: "placement",
    //     attributes: [
    //       "id",
    //       "company_id",
    //       "year",
    //       "highest_package",
    //       "no_of_placements",
    //     ],
    //   },
    //   {
    //     association: "faqs",
    //     attributes: ["id", "questions", "answers"],
    //   },
    //   {
    //     association: "rankings",
    //     attributes: ["id", "ranking_name", "ranking_description"],
    //   },
    //   {
    //     association: "collegegallery",
    //     attributes: ["id", "image", "status"],
    //   },
    //   {
    //     association: "university_colleges",
    //     attributes: ["id", "university_id"],
    //     include: [
    //       {
    //         association: "uniname",
    //         attributes: ["name"],
    //       },
    //     ],
    //   },
    //   {
    //     association: "board_colleges",
    //     attributes: ["id", "board_id"],
    //     include: [
    //       {
    //         association: "boardname",
    //         attributes: ["name"],
    //       },
    //     ],
    //   },

    //   {
    //     association: "college_affiliation",
    //     attributes: ["id", "affiliations_id"],
    //   },
    //   {
    //     association: "college_groups",
    //     attributes: ["id", "group_id"],
    //   },

    //   {
    //     association: "college_stream",
    //     attributes: ["id", "stream_id"],
    //   },

    //   {
    //     association: "college_accreditation",
    //     attributes: ["id", "accreditation_id"],
    //   },
    //   {
    //     association: "college_amenities",
    //     attributes: ["id", "amenities_id"],
    //   },
    //   {
    //     association: "collegeRecognition",
    //     attributes: ["id", "recognition_id"],
    //   },
    //   {
    //     association: "college_management",
    //     attributes: ["id", "management_id"],
    //   },
    //   {
    //     association: "cutoff",
    //     attributes: ["id", "title"],
    //     include: [
    //       {
    //         association: "cutoffdetails",
    //         attributes: ["course_id", "category", "rank"],
    //       },
    //     ],
    //   },
    // ],
  })
    .then((data) => {
      if (data) {
        // console.log(typeof data);

        // console.log(data.university_colleges[0].university_id);
        // if (
        //   data.university_colleges.length > 0 &&
        //   data.university_colleges[0].university_id
        // ) {
        //   let universityid = data.university_colleges[0].university_id;

          // College.findByPk(universityid).then((vv) => {
          //   while (data.university_colleges.length > 0) {
          //     data.university_colleges.pop();
          //   }
          //   // console.log("1", data);
          //   let obj = {
          //     id: universityid,
          //     university_id: vv.id,
          //     name: vv.name,
          //   };
          //   data.university_colleges.push(obj);
            // console.log("2",data);

            // console.log(obj);
          // });

          //  return res.status(200).send({
          //   status: 1,
          //   message: "in loopsuccessfully retrieved",
          //   data: data,
          // });
        // }
        // console.log(data.university_colleges);

        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
          // university:obj
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find college  with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        err: err,
        message: "Error retrieving Colleges with id=" + id,
      });
    });
};

exports.create = async (req, res) => {
  try {
    let logonames = "";

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

      let IsUpload = avatar.mv(
        "./storage/college_logo/" + logoname
      )
        ? 1
        : 0;

      if (IsUpload) {
        logonames = "college_logo/" + logoname;
      }
    }

    const CollegeDetails = await College.create({
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      name: req.body.name,
      slug: req.body.slug,
      type: req.body.type,
      status: req.body.status,
      home_view_status: req.body.home_view_status,
      college_type: req.body.college_type,
      listing_order: req.body.listing_order,
      established: req.body.established,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      address: req.body.address,
      map: req.body.map,
      icon: req.body.icon,
      logo: req.body.logo,
      banner_image: req.body.banner_image,
      video_url: req.body.video_url,
      avg_rating: req.body.avg_rating,
      info: req.body.info,
      admissions: req.body.admissions,
      placements: req.body.placements,
      rankings: req.body.rankings,
      scholarship: req.body.scholarship,
      hostel: req.body.hostel,
    });


   if (
      req.body.stream &&
      CollegeDetails.id 
    ) {
    
      const stream = JSON.parse(req.body.stream);

      await _.forEach(stream, function (value) {
        college_stream.create({
          stream_id: value.stream,
          college_id: CollegeDetails.id,
        });
      });
    }


    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
      data: CollegeDetails,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};

exports.delete = (req, res) => {
  const id = req.params.id;
  College.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.status(200).send({
          status: 1,
          message: "College  deleted successfully",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `delete College with id=${id}. Maybe College was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Could not delete college with id=" + id,
      });
    });
};

exports.update = async (req, res) => {
  const id = req.body.id;

  try {
    let logonames = "";

    let STREAD = {
      country_id: req.body.country_id,
      state_id: req.body.state_id,
      city_id: req.body.city_id,
      name: req.body.name,
      slug: req.body.slug,
      type: req.body.type,
      status: req.body.status,
      home_view_status: req.body.home_view_status,
      college_type: req.body.college_type,
      listing_order: req.body.listing_order,
      established: req.body.established,
      meta_title: req.body.meta_title,
      meta_description: req.body.meta_description,
      meta_keyword: req.body.meta_keyword,
      address: req.body.address,
      map: req.body.map,
      icon: req.body.icon,
      logo: req.body.logo,
      banner_image: req.body.banner_image,
      video_url: req.body.video_url,
      avg_rating: req.body.avg_rating,
      info: req.body.info,
      admissions: req.body.admissions,
      placements: req.body.placements,
      rankings: req.body.rankings,
      scholarship: req.body.scholarship,
      hostel: req.body.hostel,
    };
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

      let IsUpload = avatar.mv(
        "./storage/college_logo/" + logoname
      )
        ? 1
        : 0;

      if (IsUpload) logonames = "college_logo/" + logoname;
      STREAD["logo"] = logonames;
    }

    await College.update(STREAD, {
      where: { id },
    });


    res.status(200).send({
      status: 1,
      message: "Data update Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to update data",
      errors: error,
      status: 0,
    });
  }
};

exports.updateplacements = async (req, res) => {
  try {
    if (req.body.placement && req.body.id) {
      await placements.destroy({
        where: { college_id: req.body.id },
      });
      const data = JSON.parse(req.body.placement);
      await _.forEach(data, function (value) {
        placements.create({
          college_id: req.body.id,
          company_id: value.company_id ? value.company_id : null,
          year: value.year ? value.year : null,
          highest_package: value.highest_package ? value.highest_package : null,
          no_of_placements: value.no_of_placements
            ? value.no_of_placements
            : null,
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

exports.updatefaqs = async (req, res) => {
  try {
    if (req.body.faqs && req.body.id) {
      await f_a_qs.destroy({
        where: { college_id: req.body.id },
      });
      const faqss = JSON.parse(req.body.faqs);
      await _.forEach(faqss, function (value) {
        f_a_qs.create({
          college_id: req.body.id,
          questions: value.question ? value.question : null,
          answers: value.answer ? value.answer : null,
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

exports.updateranking = async (req, res) => {
  try {
    if (
      req.body.rankings &&
      req.body.id &&
      req.body.type != "university" &&
      req.body.type != "board"
    ) {
      await rankings.destroy({
        where: { college_id: req.body.id },
      });
      const data = JSON.parse(req.body.rankings);
      await _.forEach(data, function (value) {
        rankings.create({
          college_id: req.body.id,
          ranking_name: value.ranking_name ? value.ranking_name : null,
          ranking_description: value.ranking_description
            ? value.ranking_description
            : null,
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

          let IsUploadss = element.mv("./storage/collegegallery/" + imgname)
            ? 1
            : 0;

          if (IsUploadss) {
            let newimg = "collegegallery/" + imgname;
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
          await collegegallery.destroy({
            where: { college_id: req.body.id },
          });

          await _.forEach(totalimages, function (value) {
            collegegallery.create({
              college_id: req.body.id,
              image: value,
              status: "featured",
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
      let IsUpload = avatar.mv("./storage/collegegallery/" + image) ? 1 : 0;
      // console.log(avatar.mv("./storage/collegegallery/" + image));

      if (IsUpload) images = "collegegallery/" + image;

      if (images == " ") {
        return res.status(400).send({
          message: "insert logo",
          errors: {},
          status: 0,
        });
      } else {
        if (req.body.id) {
          await collegegallery.destroy({
            where: { college_id: req.body.id },
          });
        }
        await collegegallery.create({
          college_id: req.body.id,

          image: images,
          status: "featured",
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

exports.updatecutoff = async (req, res) => {
  try {
    if (req.body.cutoff && req.body.id) {
      await cutoff.destroy({
        where: { college_id: req.body.id },
      });
      const data = JSON.parse(req.body.cutoff);
      await _.forEach(data, function (value) {
        cutoff
          .create({
            college_id: req.body.id,
            title: value.title ? value.title : null,
          })
          .then(async (data) => {
            if (value.cutoffdetails && data.id) {
              await cutoffdetails.destroy({
                where: { cut_offs_id: data.id },
              });
              const datacutoffdetails = value.cutoffdetails;

              await _.forEach(datacutoffdetails, function (value) {
                cutoffdetails.create({
                  cut_offs_id: data.id,
                  course_id: value.course_id ? value.course_id : null,
                  category: value.category ? value.category : null,
                  rank: value.rank ? value.rank : null,
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

// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   CollegeAndUniversity.findByPk(id)
//     .then(data => {
//       if (data) {

//         res.status(200).send({
//           status: 1,
//           message: 'successfully retrieved',
//           data: data

//       });

//       } else {
//         res.status(400).send({
//           status: 0,
//           message:  `Cannot find data with id=${id}.`

//       });

//       }
//     })
//     .catch(err => {

//       res.status(500).send({
//         status: 0,
//         message:"Error retrieving data with id=" + id

//     });
//     });
// };
