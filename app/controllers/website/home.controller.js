const db = require("../../models");
const axios = require("axios");
var https = require("https");
require("dotenv").config();
const path = require("path");
const about = db.abouts;
const team = db.team;
const pages = db.page;
const base_url = process.env.APP_FRONT_BASE;
const banner = db.banner;
const stream = db.stream;
const CollegeAndUniversity = db.collegeAndUniversity;
const exams = db.exam;
const streamfaq = db.stream_faq;
const area = db.area;
const city = db.city;
const college_affiliation = db.college_affiliation;
const college_accreditation = db.college_accreditation;
const collegeRecognition = db.collegeRecognition;
const college_amenities = db.college_amenities;
const college_management = db.college_management;
const college_groups = db.college_groupss;
const placements = db.placements;
const board_colleges = db.board_colleges;
const f_a_qs = db.f_a_qs;
const rankings = db.rankings;
const university_colleges = db.university_colleges;
const CollegeGalleries = db.collegeGalleries;
const blog = db.blog;
const newsandevents = db.newsandevents;
const exam = db.exam;
const testimonial = db.testimonial;
const enquiry = db.enquiry;
const _ = require("lodash");
const generalcourse = db.generalcourse;
const courses = db.courses;
const groups = db.groups;
const Op = db.Sequelize.Op;
const PUBLISHED = "Published";
const sendsearch = require("../../utility/Customsearch");
const Accreditation = db.accreditation;
const management = db.management;
const school = db.school;
const schoolboards = db.schoolboards;
const schoollevel = db.level;
const author = db.author;
const categories = db.categories;
const nri = db.nri;
const recognitioneditor = db.recognitioneditor;
const service = db.service;
const scholarships = db.scholarships;

const videotestimonial = db.videotestimonial;
const abroad_universities = db.abroad_universities;
const abroadcountries = db.abroadcountries;
const youtubevideos = db.youtubevideos;
const array_of_allowed_file_types = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
  "image/svg+xml",
];

const allowed_file_size = 2;

const getPagination = (page, size) => {
  const pages = page > 0 ? page : 1;
  const limit = size ? +size : 10;
  const offset = pages ? (pages - 1) * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: finaldata } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, finaldata, totalPages, currentPage };
};

const getPagingDataA = (data, page, limit) => {
  const { count: totalItems, rows: finaldata } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems.length / limit);
  return { totalItems, finaldata, totalPages, currentPage };
};

exports.allabroadcountries = async (req, res) => {
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
  abroadcountries
    .findAndCountAll({ where: condition, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving abroadcountries.",
      });
    });
};

exports.blogsandnews = async (req, res) => {
  const data = {
    errors: {},
  };

  if (req.body.getdata) {
    const datas = JSON.parse(req.body.getdata);

    console.log(req.body.getdata);
    console.log(datas);
    _.forEach(datas, function (value) {
      if (value.data == "blogs") data.blogs = [];

      if (value.data == "news") data.news = [];
    });
  }
  var {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
  } = req.body;

  if (data.blogs) {
    var column = columnname ? columnname : "updated_at";
    var order = orderby ? orderby : "desc";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      page = 1;
      size = 2;

      const { limit, offset } = getPagination(page, size);

      data.blogs = await blog
        .findAndCountAll({
          where: data_array,
          limit,
          offset,
          attributes: ["title", "cover_image", "meta_description", "slug"],
          // include: [
          //   { association: "author", attributes: ["id", "author_name"] },
          //   { association: "categories", attributes: ["id", "category_name"] },
          //   {
          //     association: "groups",
          //     attributes: ["id", "group", "slug"],
          //     required: false,
          //   },
          // ],
          order: [orderconfig],
        })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.blogs = "No blog found";
        });
    } catch {
      data.errors.blogs = "No blog found";
    }
  }

  if (data.news) {
    var column = columnname ? columnname : "updated_at";
    var order = orderby ? orderby : "desc";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      page = 1;
      size = 3;

      const { limit, offset } = getPagination(page, size);

      data.news = await newsandevents
        .findAndCountAll({
          where: data_array,
          limit,
          attributes: ["created_at", "slug", "title"],
          offset,
          order: [orderconfig],
        })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.news = "No news found";
        });
    } catch {
      data.errors.news = "No news found";
    }
  }

  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

exports.topcollege = async (req, res) => {
  const data = {
    errors: {},
  };

  if (req.body.getdata) {
    const datas = JSON.parse(req.body.getdata);

    console.log(req.body.getdata);
    console.log(datas);
    _.forEach(datas, function (value) {
      if (value.data == "college") data.topcollege = [];

      if (value.data == "university") data.topuniversity = [];

      if (value.data == "exam") data.topexam = [];

      // if (value.data == "stream") data.topstream = [];

      if (value.data == "testimonial") data.testimonials = [];
    });
  }
  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
  } = req.body;

  const { limit, offset } = getPagination(page, size);

  if (data.topcollege) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [
      { home_view_status: "top_college" },
      { type: "college" },
      { status: PUBLISHED },
      { [Op.not]: [{ order: null }] },
    ];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.topcollege = await CollegeAndUniversity.findAndCountAll({
        where: data_array,
        limit,
        offset,
        attributes: [
          "id",
          "name",
          "slug",
          "logo",
          "order",
          "home_view_status",
          "status",
          "avg_rating",
        ],
        include: [
          {
            where: data_array1,
            association: "CollegeGalleriess",
            attributes: ["image", "status"],
            required: true,
          },
        ],
        order: [orderconfig],
        subQuery: false,
      })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.topcollege = "No top college found";
        });
    } catch {
      data.errors.topcollege = "No top college found";
    }
  }

  if (data.topuniversity) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [
      { home_view_status: "top_college" },
      { type: "university" },
      { status: PUBLISHED },
      { [Op.not]: [{ order: null }] },
    ];
    let data_array1 = [];

    try {
      data.topuniversity = await CollegeAndUniversity.findAndCountAll({
        where: data_array,
        limit,
        offset,
        attributes: [
          "id",
          "name",
          "slug",
          "logo",
          "order",
          "home_view_status",
          "status",
          "avg_rating",
        ],
        order: [orderconfig],
        subQuery: false,
      })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.topuniversity = "No top university found";
        });
    } catch {
      data.errors.topuniversity = "No top university found";
    }
  }

  if (data.topexam) {
    var column = columnname ? columnname : "listing_order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [
      { status: PUBLISHED },
      { home_view_status: "home_page" },
      { [Op.not]: [{ listing_order: null }] },
    ];
    let data_array1 = [];
    // console.log(limit);
    try {
      data.topexam = await exam
        .findAndCountAll({
          where: data_array,
          limit: 12,
          offset,
          attributes: [
            "id",
            "exam_title",
            "exam_short_name",
            "slug",
            "cover_image",
            "listing_order",
            "home_view_status",
            "status",
          ],
          order: [orderconfig],
          subQuery: false,
        })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.topexam = "No exam found";
        });
    } catch {
      data.errors.topexam = "No exam found";
    }
  }

  // if (data.topstream) {
  //   var column = columnname ? columnname : "listing_order";
  //   var order = orderby ? orderby : "ASC";
  //   var orderconfig = [column, order];

  //   const myArray = column.split(".");
  //   if (typeof myArray[1] !== "undefined") {
  //     var table = myArray[0];
  //     column = myArray[1];
  //     orderconfig = [table, column, order];
  //   }

  //   let data_array = [

  //     { home_view_status: "home_page" },
  //     { [Op.not]: [{ listing_order: null }]},
  //   ];
  //   let data_array1 = [];

  //   try {
  //     data.topstream = await stream
  //       .findAndCountAll({
  //         where: data_array,
  //         limit : 30,
  //         offset,
  //         attributes: [
  //           "id",
  //           "stream_name",
  //           "stream_slug",
  //           "logo",
  //           "icon",
  //           "listing_order",
  //           "home_view_status",
  //         ],
  //         order: [orderconfig],
  //         subQuery: false,
  //       })

  //       .then((data) => {
  //         const response = getPagingData(data, page, limit);

  //         return {
  //           totalItems: response.totalItems,
  //           currentPage: response.currentPage,
  //           totalPages: response.totalPages,
  //           data: response.finaldata,
  //         };
  //       })
  //       .catch((err) => {
  //         data.errors.topexam = err+"No Stream found";
  //       });
  //   } catch {
  //     data.errors.topexam = "No Stream found";
  //   }
  // }

  if (data.testimonials) {
    var column = columnname ? columnname : "updated_at";
    var order = orderby ? orderby : "desc";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.testimonials = await testimonial
        .findAndCountAll({
          where: data_array,
          limit,
          offset,
          attributes: ["description", "name", "photo", "designation"],
          order: [orderconfig],
          subQuery: false,
        })

        .then((data) => {
          const response = getPagingData(data, page, limit);

          return {
            totalItems: response.totalItems,
            currentPage: response.currentPage,
            totalPages: response.totalPages,
            data: response.finaldata,
          };
        })
        .catch((err) => {
          data.errors.testimonials = "No testimonial found";
        });
    } catch {
      data.errors.testimonials = "No testimonial found";
    }
  }

  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

exports.pagetdata = async (req, res) => {
  const data = {
    errors: {},
  };

  if (req.body.getdata) {
    const datas = JSON.parse(req.body.getdata);

    console.log(req.body.getdata);
    console.log(datas);
    _.forEach(datas, function (value) {
      if (value.data == "banners") data.banners = [];

      if (value.data == "course_streams_head") data.course_streams_head = [];

      if (value.data == "count_block") data.count_block = [];
    });
  }
  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
  } = req.body;

  const { limit, offset } = getPagination(page, size);
  if (data.count_block) {
    const published_university = await CollegeAndUniversity.count({
      where: {
        type: "university",
        status: PUBLISHED,
      },
    });

    const published_college = await CollegeAndUniversity.count({
      where: {
        type: "college",
        status: PUBLISHED,
      },
    });

    const examss = await exams.count({
      where: {
        status: PUBLISHED,
      },
    });
    data.count_block = {
      university: published_university,
      college: published_college,
      exams: examss,
    };
  }

  if (data.banners) {
    try {
      data.banners = await banner.findAll({
        where: {
          status: "published",
          promo_banner: "Draft",
        },
      });
    } catch {
      data.errors.banners = "No banner found";
    }
  }

  // if (data.course_streams_head) {
  //   // var column = columnname ? columnname : "listing_order";
  //   // var order = orderby ? orderby : "ASC";
  //   // var orderconfig = [column, order];

  //   // const myArray = column.split(".");
  //   // if (typeof myArray[1] !== "undefined") {
  //   //   var table = myArray[0];
  //   //   column = myArray[1];
  //   //   orderconfig = [table, column, order];
  //   // }

  //   // let data_array = [

  //   //   { home_view_status: "home_page" },
  //   //   { [Op.not]: [{ listing_order: null }]},
  //   // ];
  //   // let data_array1 = [];

  //   // try {
  //   //   data.course_streams_head = await stream
  //   //     .findAndCountAll({
  //   //       where: data_array,
  //   //       limit : 30,
  //   //       offset,
  //   //       attributes: [
  //   //         "id",
  //   //         "stream_name",
  //   //         "stream_slug",
  //   //         "logo",
  //   //         "icon",
  //   //         "listing_order",
  //   //         "home_view_status",
  //   //       ],
  //   //       order: [orderconfig],
  //   //       subQuery: false,
  //   //     })

  //   //     .then((data) => {
  //   //       const response = getPagingData(data, page, limit);

  //   //       return response.finaldata

  //   //       // return {
  //   //       //   totalItems: response.totalItems,
  //   //       //   currentPage: response.currentPage,
  //   //       //   totalPages: response.totalPages,
  //   //       //   data: response.finaldata,
  //   //       // };
  //   //     })
  //   //     .catch((err) => {
  //   //       data.errors.topexam = err+"No Stream found";
  //   //     });
  //   // } catch {
  //   //   data.errors.topexam = "No Stream found";
  //   // }

  //   try {
  //     data.course_streams_head = await stream.findAll({
  //       attributes: ["stream_name", "id", "stream_slug", "logo", "icon"],
  //       order: [["stream_name", "ASC"]],
  //     });
  //   } catch {
  //     data.errors.course_streams_head = "No stream found";
  //   }
  // }

  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

// async function doPostRequest(leadData) {
//   console.log("doPostRequest",leadData)
//   const captureUrl = "https://bangalorestudy.com/lead.php";
//   await axios.post(captureUrl, {
//     EmailAddress: leadData.EmailAddress,
//     FirstName: leadData.FirstName,
//     Phone: leadData.Phone,
//     mx_State: leadData.mx_State,
//     mx_Interested_Course: leadData.mx_Interested_Course,
//     Notes: leadData.Notes,
//   });
// }


async function doPostRequest(leadData) {


  let dataobj = [
    {
      Attribute: "FirstName",
      Value: leadData.FirstName,
    },
    {
      Attribute: "Phone",
      Value: leadData.Phone,
    },
    {
      Attribute: "EmailAddress",
      Value: leadData.EmailAddress,
    },
    {
      Attribute: "mx_State",
      Value: leadData.mx_State,
    },
    {
      Attribute: "mx_Interested_Course",
      Value: leadData.mx_Interested_Course,
    },
    {
      Attribute: "Source",
      Value: "Website",
    },
    {
      Attribute: "Notes",
      Value: leadData.Notes,
    },
  ];
  // console.log(dataobj,"doPostRequest");

  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    accessKey: "u$r217f8cfce2ad9404cf4b09ef03115be4",
    secretKey: "6a5934c49b30fc13078fd8dd023cda37c8640e6d",
  };
  const captureUrl =
    "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";

  try {
    let response = await axios.post(captureUrl, dataobj, {
      headers: headers,
      params: params,
    });
    // console.log(response,"doPostRequest");
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

async function doPostRequestlanding(leadData) {


  let dataobj = [
    {
      Attribute: "FirstName",
      Value: leadData.FirstName,
    },
    {
      Attribute: "Phone",
      Value: leadData.Phone,
    },
    {
      Attribute: "EmailAddress",
      Value: leadData.EmailAddress,
    },
    {
      Attribute: "mx_Gender",
      Value: leadData.gender ? leadData.gender : "  ",
    },
    {
      Attribute: "mx_State",
      Value: leadData.mx_State,
    },
    // {
    //   Attribute: "mx_Class",
    //   Value: leadData.interestedcourse,
    // },
    {
      Attribute: "mx_Interested_Campus",
      Value: leadData.Campus ? leadData.Campus : "  ",
    },
    {
      Attribute: "mx_Interested_Course",
      Value: leadData.mx_Interested_Course,
    },
    {
      Attribute: "mx_Neet_Score",
      Value: leadData.NeetRank,
    },
    // {
    //   Attribute: "mx_Interested_School",
    //   Value: leadData.school,
    // },

    {
      Attribute: "Source",
      Value: leadData.Source ? leadData.Source : "Pay per Click Ads",
    },
    {
      Attribute: "Notes",
      Value: leadData.Notes,
    },
  ];
  console.log(dataobj);

  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    accessKey: "u$r217f8cfce2ad9404cf4b09ef03115be4",
    secretKey: "6a5934c49b30fc13078fd8dd023cda37c8640e6d",
  };
  const captureUrl =
    "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";

  try {
    let response = await axios.post(captureUrl, dataobj, {
      headers: headers,
      params: params,
    });
    console.log(response);
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

async function allianceuniversityCRM(alliancelead) {
  // console.log(alliancelead);
  // return;
  const captureUrl =
    "https://api.nopaperforms.com/dataporting/207/learn_tech_edu_solutions_pvt_ltd";
  let response = await axios.post(captureUrl, {
    secret_key: "7cd1b1ae7671b9a7ab78e8ece637bf33",
    source: "learn_tech_edu_solutions_pvt_ltd",
    college_id: 207,
    name: alliancelead.FirstName,
    email: alliancelead.EmailAddress,
    mobile: alliancelead.Phone,
    state: alliancelead.state,
    city: alliancelead.city,
    campus: alliancelead.campus,
    course: alliancelead.course,
  });
  // console.log("1", response.data);
  // console.log(response.status);
}

exports.enquiry = async (req, res) => {
  try {
    const enquiryDetails = await enquiry.create({
      name: req.body.name,
      email: req.body.email ? req.body.email : null,
      course_name: req.body.course_in_mind ? req.body.course_in_mind : null,
      college_name: req.body.college_name ? req.body.college_name : null,
      gender: req.body.gender ? req.body.gender : null,
      newsletters: req.body.newsletters ? req.body.newsletter : null,
      current_qualification: req.body.current_qualification
        ? req.body.current_qualification
        : null,
      course_in_mind: req.body.course_in_mind ? req.body.course_in_mind : null,
      dob: req.body.dob ? req.body.dob : null,
      contact_number: req.body.contact ? req.body.contact : null,
      current_url: req.body.current_url,
      description: req.body.description ? req.body.description : null,
      location: req.body.location ? req.body.location : null,
      mobile_verified: req.body.mobile_verified,
    });

    let lname = req.body.name ? req.body.name : "";
    let lphone = req.body.contact ? req.body.contact : "";
    let lemail = req.body.email ? req.body.email : "";
    let lstate =
      req.body.location || req.body.state
        ? req.body.location || req.body.state
        : "";
    let lcourse = req.body.course_in_mind ? req.body.course_in_mind : "";
    let lsourse = "test New bangalore study";
    let lnotes = req.body.description ? req.body.description : "";

    const leadData = {
      EmailAddress: lemail,
      FirstName: lname,
      //"LastName": req.body.lastName,
      Phone: lphone,

      mx_State: lstate,
      mx_Interested_Course: lcourse,
      Source: lsourse,
      Notes: lnotes,
    };

    // return console.log(leadData);

    doPostRequest(leadData);

    let currentpageurl = req.body.current_url;
    let customurls = [
      "https://bangalorestudy.com/university/alliance-university-chandapura-bangalore",
      "https://bangalorestudy.com/university/alliance-university-chandapura-bangalore#",
      "http://preprod.bangalorestudy.com/university/alliance-university-chandapura-bangalore",
      "http://preprod.bangalorestudy.com/university/alliance-university-chandapura-bangalore#",
      "http://localhost:3000/university/alliance-university-chandapura-bangalore",
    ];
    if (customurls.includes(currentpageurl) && req.body.state) {
      let astate = req.body.state ? req.body.state : "";
      let acity = req.body.city ? req.body.city : "";
      let acampus = req.body.campus ? req.body.campus : "";
      let acourse_in_mind = req.body.course_in_mind
        ? req.body.course_in_mind
        : "";
      let alliancelead = {
        EmailAddress: lemail,
        FirstName: lname,
        Phone: lphone,
        state: astate,
        city: acity,
        campus: acampus,
        course: acourse_in_mind,
      };
      allianceuniversityCRM(alliancelead);
    }
    res.status(200).send({
      status: 1,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 0,
      message: "success",
      error: error,
    });
  }
};

async function mohanbabuunivercitylandingpageCRM(mohanbabulead) {
  // console.log(mohanbabulead);
  // console.log(JSON.stringify(mohanbabulead));
  // return;
  let data = JSON.stringify(mohanbabulead);
  const headers = {
    "Content-Type": "application/json",
    "secret-key": "5ebc58fd1de3c795c21cf152f19dbf77",
    "access-key": "74b62d6b539847fe99d6d9febd0f8850",
    source: "Bangalorestudy.com",
  };
  const params = {
    source: "Bangalorestudy.com",
  };
  const captureUrl =
    "https://api.nopaperforms.io/lead/v1/create?source=Bangalorestudy.com";
  let response = await axios.post(captureUrl, data, {
    headers: headers,
    params: params,
  });
  console.log(response, "respons embu")
}

async function mohanbabuunivercitydoPostRequestlanding(mohanbabulead, message) {
  let dataobj = [
    {
      Attribute: "FirstName",
      Value: mohanbabulead.name,
    },
    {
      Attribute: "EmailAddress",
      Value: mohanbabulead.email,
    },
    {
      Attribute: "Phone",
      Value: mohanbabulead.mobile,
    },
    {
      Attribute: "Source",
      Value: "Mohanbabu PPC",
    },
    {
      Attribute: "mx_State",
      Value: mohanbabulead.state,
    },
    {
      Attribute: "mx_City",
      Value: mohanbabulead.city,
    },
    {
      Attribute: "mx_Select_Campus",
      Value: mohanbabulead.campus,
    },
    {
      Attribute: "mx_Select_Courses",
      Value: mohanbabulead.course,
    },
    {
      Attribute: "mx_Select_Specialization",
      Value: mohanbabulead.specialization,
    },
    {
      Attribute: "Notes",
      Value: message,
    },
    {
      Attribute: "mx_Interested_Course",
      Value: mohanbabulead.course + "," + " " + mohanbabulead.specialization,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    accessKey: "u$r217f8cfce2ad9404cf4b09ef03115be4",
    secretKey: "6a5934c49b30fc13078fd8dd023cda37c8640e6d",
  };
  const captureUrl =
    "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";

  try {
    let response = await axios.post(captureUrl, dataobj, {
      headers: headers,
      params: params,
    });
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

exports.landingpageenquiry = async (req, res) => {
  var customcollege = "";
  var customcorse = "";
  var customstate = "";
  if (req.body.campus) {
    let acampus = req.body.campus ? req.body.campus : "";

    customcollege = acampus;
  } else {
    customcollege = req.body.college_name ? req.body.college_name : null;
  }
  if (req.body.specialization) {
    let aspetilization = req.body.specialization ? req.body.specialization : "";
    let acourse = req.body.course_in_mind ? req.body.course_in_mind : "";
    customcorse = acourse + "," + " " + aspetilization;
  } else {
    customcorse = req.body.course_in_mind ? req.body.course_in_mind : null;
  }
  if (req.body.state) {
    let astate = req.body.state ? req.body.state : "";
    let acity = req.body.city ? req.body.city : "";

    customstate = acity + "," + " " + astate;
  } else {
    customstate = req.body.location ? req.body.location : null;
  }

  try {
    const enquiryDetails = await enquiry.create({
      name: req.body.name,
      email: req.body.email ? req.body.email : null,
      course_name: customcorse ? customcorse : null,
      college_name: customcollege ? customcollege : null,
      gender: req.body.gender ? req.body.gender : null,
      newsletters: req.body.newsletters ? req.body.newsletter : null,
      current_qualification: req.body.current_qualification
        ? req.body.current_qualification
        : null,
      course_in_mind: customcorse ? customcorse : null,
      dob: req.body.dob ? req.body.dob : null,
      contact_number: req.body.contact ? req.body.contact : null,
      current_url: req.body.current_url,
      description: req.body.description ? req.body.description : null,
      location: customstate,
      mobile_verified: req.body.mobile_verified,
    });

    let lname = req.body.name ? req.body.name : "";
    let lphone = req.body.contact ? req.body.contact : "";
    let lemail = req.body.email ? req.body.email : "";
    let lstate = req.body.location ? req.body.location : "";
    let lcourse = req.body.course_in_mind ? req.body.course_in_mind : "";
    let lsourse = req.body.sourse ? req.body.sourse : "Pay per Click Ads";
    let lnotes = req.body.description ? req.body.description : "";
    let lneetscore = req.body.neetrank ? req.body.neetrank : "";

    const leadData = {
      EmailAddress: lemail,
      FirstName: lname,
      Phone: lphone,
      mx_State: lstate,
      mx_Interested_Course: lcourse,
      Source: lsourse,
      Notes: lnotes,
      NeetRank: lneetscore,
      Campus: customcollege,
    };

    let currentpageurl = req.body.current_url;
    let mohanbabu = [
      "https://bangalorestudy.com/mohan-babu-university-tirupati",
      "http://preprod.bangalorestudy.com/mohan-babu-university-tirupati",
      "http://localhost:3000/mohan-babu-university-tirupati",
    ];

    // CRM fuction
    if (!mohanbabu.includes(currentpageurl)) {
      doPostRequestlanding(leadData);
    }

    if (mohanbabu.includes(currentpageurl) && req.body.state) {
      let astate = req.body.state ? req.body.state : "";
      let acity = req.body.city ? req.body.city : "";
      let acampus = req.body.campus ? req.body.campus : "";
      let acourse_in_mind = req.body.course_in_mind
        ? req.body.course_in_mind
        : "";
      let aspecialization = req.body.specialization
        ? req.body.specialization
        : "";
      let message = req.body.description ? req.body.description : "";
      let mohanbabulead = {
        name: lname,
        email: lemail,
        mobile: lphone,
        state: astate,
        city: acity,
        campus: acampus,
        course: acourse_in_mind,
        specialization: aspecialization,
        source: "Bangalorestudy.com",
      };

      mohanbabuunivercitydoPostRequestlanding(mohanbabulead, message);
      mohanbabuunivercitylandingpageCRM(mohanbabulead);
    }

    res.status(200).send({
      status: 1,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 0,
      message: "success",
      error: error,
    });
  }
};

async function HorizonschoolCRM(schoolcrmlead) {
  let dataobj = [
    {
      Attribute: "FirstName",
      Value: schoolcrmlead.FirstName,
    },
    {
      Attribute: "Source",
      Value: "Bangalorestudy",
    },
    {
      Attribute: "EmailAddress",
      Value: schoolcrmlead.EmailAddress,
    },
    {
      Attribute: "Phone",
      Value: schoolcrmlead.Phone,
    },

    {
      Attribute: "mx_Gender",
      Value: schoolcrmlead.gender,
    },
    {
      Attribute: "mx_Class",
      Value: schoolcrmlead.class,
    },
    {
      Attribute: "mx_School",
      Value: schoolcrmlead.school,
    },
  ];

  const headers = {
    "Content-Type": "application/json",
  };
  // url for vidya and gurukul school
  let captureUrl =
    "https://publisher-api.customui.leadsquared.com/api/leadCapture/NzA1OTE=/?token=b18ec91c-5368-4715-acb8-3de5297e2420";
  console.log(schoolcrmlead.school);
  if (
    schoolcrmlead.school &&
    (schoolcrmlead.school == "New Horizon International School" ||
      schoolcrmlead.school == "New Horizon Public School")
  ) {
    // url for international and public school
    // Change the captureUrl based on the condition
    captureUrl =
      "https://publisher-api.customui.leadsquared.com/api/leadCapture/NzA2MDE=/?token=b18ec91c-5368-4715-acb8-3de5297e2420";
  }

  try {
    let response = await axios.post(captureUrl, dataobj, {
      headers: headers,
    });

    // console.log("response", response);
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

async function CRM_LEARNTECH_SCHOOL(leadData) {
  let dataobj = [
    {
      Attribute: "FirstName",
      Value: leadData.FirstName,
    },
    {
      Attribute: "Phone",
      Value: leadData.Phone,
    },
    {
      Attribute: "EmailAddress",
      Value: leadData.EmailAddress,
    },
    {
      Attribute: "mx_Gender",
      Value: leadData.gender,
    },
    {
      Attribute: "mx_State",
      Value: leadData.state,
    },
    {
      Attribute: "mx_Class",
      Value: leadData.interestedcourse,
    },
    // {
    //   Attribute: "mx_Interested_College",
    //   Value: leadData.school,
    // },
    {
      Attribute: "mx_Interested_School",
      Value: leadData.school,
    },

    {
      Attribute: "Source",
      Value: leadData.Source,
    },
    {
      Attribute: "Notes",
      Value: leadData.Notes,
    },
  ];
  const headers = {
    "Content-Type": "application/json",
  };
  const params = {
    accessKey: "u$r217f8cfce2ad9404cf4b09ef03115be4",
    secretKey: "6a5934c49b30fc13078fd8dd023cda37c8640e6d",
  };
  const captureUrl =
    "https://api-in21.leadsquared.com/v2/LeadManagement.svc/Lead.Capture";

  try {
    let response = await axios.post(captureUrl, dataobj, {
      headers: headers,
      params: params,
    });
    // console.log(response);
  } catch (error) {
    console.error("Error making API request:", error);
  }
}

exports.horizonschoolenquiry = async (req, res) => {
  // console.log(req.body);
  // return res.status(200).send({
  //   status: 1,
  //   message: "success",
  // });
  try {
    const enquiryDetails = await enquiry.create({
      name: req.body.name,
      email: req.body.email ? req.body.email : null,
      contact_number: req.body.contact ? req.body.contact : null,
      course_name: req.body.class ? req.body.class : null,
      college_name: req.body.school ? req.body.school : null,
      gender: req.body.gender ? req.body.gender : null,
      course_in_mind: req.body.class ? req.body.class : null,
      current_url: req.body.current_url,
    });

    let lname = req.body.name ? req.body.name : "";
    let lphone = req.body.contact ? req.body.contact : "";
    let lemail = req.body.email ? req.body.email : "";
    let lstate = req.body.location ? req.body.location : "";
    let lcourse = req.body.class ? req.body.class : "";
    let lsourse = req.body.sourse ? req.body.sourse : "Pay per Click Ads";
    let lnotes = req.body.description ? req.body.description : "";
    let lgender = req.body.gender ? req.body.gender : "";
    let lclass = req.body.class ? req.body.class : "";
    let lschool = req.body.school ? req.body.school : "";

    const leadData = {
      FirstName: lname,
      EmailAddress: lemail,
      Phone: lphone,
      state: lstate,
      interestedcourse: lcourse,
      school: lschool,
      class: lclass,
      gender: lgender,
      Source: lsourse,
      Notes: lnotes,
    };
    // learntech CRM
    CRM_LEARNTECH_SCHOOL(leadData);
    let schoolcrmlead = {
      FirstName: lname,
      EmailAddress: lemail,
      Phone: lphone,
      gender: lgender,
      class: lclass,
      school: lschool,
      Source: "Bangalorestudy",
    };
    // school CRM
    HorizonschoolCRM(schoolcrmlead);

    return res.status(200).send({
      status: 1,
      message: "success",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      status: 0,
      message: "success",
      error: error,
    });
  }
};

exports.generalcourse = async (req, res) => {
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
      where: condition,
      limit,
      offset,
      attributes: [
        "id",
        "stream_name",
        "logo",
        "icon",
        "listing_order",
        "stream_slug",
      ],
      include: [
        {
          association: "str",
          attributes: [
            "id",
            "course_stream_name",
            "course_short_name",
            "course_stream_slug",
            "sub_stream_id",
            "course_type",
            "meta_title",
            "description",
          ],
        },
      ],
      group: ["id"],
      // subQuery: false,
      order: [orderconfig],
    })
    .then((data) => {
      console.log(data);
      // const response = getPagingData(data, page, limit);
      const response = getPagingDataA(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems.length,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving Courses.",
      });
    });

  // const { page, size, searchtext, stream_id, searchfrom, columnname, orderby } =
  //   req.query;

  // var column = columnname ? columnname : "id";
  // var order = orderby ? orderby : "ASC";
  // var orderconfig = [column, order];

  // const myArray = column.split(".");
  // if (typeof myArray[1] !== "undefined") {
  //   var table = myArray[0];
  //   column = myArray[1];
  //   orderconfig = [table, column, order];
  // }

  // var conditionStreamId = stream_id ? { stream_id: stream_id } : null;

  // var condition = sendsearch.customseacrh(searchtext, searchfrom);

  // let data_array = [];
  // conditionStreamId ? data_array.push(conditionStreamId) : null;
  // condition ? data_array.push(condition) : null;

  // const { limit, offset } = getPagination(page, size);
  // generalcourse
  //   .findAndCountAll({
  //     where: data_array,
  //     limit,
  //     offset,
  //     include: [
  //       { association: "sub_stream", attributes: ["id", "sub_stream_name"] },
  //       { association: "streams", attributes: ["id", "stream_name"] },
  //     ],
  //     order: [orderconfig],
  //   })
  //   .then((data) => {
  //     const response = getPagingData(data, page, limit);

  //     res.status(200).send({
  //       status: 1,
  //       message: "success",
  //       totalItems: response.totalItems,
  //       currentPage: response.currentPage,
  //       totalPages: response.totalPages,
  //       data: response.finaldata,
  //     });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       status: 0,
  //       message:
  //         err.message || "Some error occurred while retrieving generalcourse.",
  //     });
  //   });
};

exports.coursesbystreamid = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    medium_id,
    college_id,
    course_id,
    searchfrom,
    columnname,
    orderby,
    stream_id,
    course_stream_slug,
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

  var conditionmedium_id = medium_id ? { medium_id: medium_id } : null;
  var conditioncollege_id = college_id ? { college_id: college_id } : null;
  var conditioncourse_id = course_id ? { course_id: course_id } : null;
  var condtionstream_id = stream_id ? { stream_id: stream_id } : null;
  var condtioncourse_stream_slug = course_stream_slug
    ? { course_stream_slug: course_stream_slug }
    : null;
  var condtioncourse_type = course_type ? { course_type: course_type } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  let data_array = [];
  let conditionstream = [];

  condtionstream_id ? conditionstream.push(condtionstream_id) : null;
  condtioncourse_stream_slug
    ? conditionstream.push(condtioncourse_stream_slug)
    : null;

  conditionmedium_id ? data_array.push(conditionmedium_id) : null;
  conditioncollege_id ? data_array.push(conditioncollege_id) : null;
  conditioncourse_id ? data_array.push(conditioncourse_id) : null;
  condition ? data_array.push(condition) : null;
  condtioncourse_type ? data_array.push(condtioncourse_type) : null;

  const { limit, offset } = getPagination(page, size);
  courses
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        { association: "medium", attributes: ["id", "medium"] },
        { association: "college", attributes: ["id", "name"] },
        {
          association: "course",
          attributes: [
            "id",
            "course_stream_name",
            "course_short_name",
            "course_stream_slug",
            "stream_id",
          ],
          where: conditionstream,
        },
        {
          association: "jobanalysis",
          attributes: [
            "id",
            "job_profile",
            "average_salary",
            "job_description",
          ],
        },
        {
          association: "eligibilities",
          attributes: ["id", "stream", "description"],
        },
        { association: "salary", attributes: ["id", "salary_year", "amount"] },

        { association: "gallery", attributes: ["id", "images"] },
        { association: "coursemodes", attributes: ["id", "modes_id"] },
        { association: "courseexams", attributes: ["id", "exams_id"] },

        { association: "coursecompanies", attributes: ["id", "companies_id"] },
        {
          association: "coursesyllabus",
          attributes: ["id", "title"],
          include: [
            {
              association: "syllabussdetails",
              attributes: ["subject", "description"],
            },
          ],
        },
        {
          association: "cousrsefees",
          attributes: ["id", "type", "title", "note", "total_amount"],
          include: [
            {
              association: "feedetail",
              attributes: ["sub_title", "amount"],
            },
          ],
        },
      ],
      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "successs",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving Get course.",
      });
    });
};

exports.allentranceexams = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    stream_id,
    exam_id,
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
  let conditionstreamid = stream_id ? { stream_id: stream_id } : null;
  let conditionexamm_id = exam_id ? { id: { [Op.ne]: exam_id } } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  let data_array = [];
  condition ? data_array.push(condition) : null;
  conditionstreamid ? data_array.push(conditionstreamid) : null;
  conditionexamm_id ? data_array.push(conditionexamm_id) : null;
  const { limit, offset } = getPagination(page, size);
  exam
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "exam_title",
        "exam_short_name",
        "cover_image",
        "slug",
        "stream_id",
      ],
      order: [orderconfig],
      subQuery: false,
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving Enterance exams.",
      });
    });
};
exports.findoneexam = (req, res) => {
  const slug = req.params.slug;

  exam
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: slug,
            },
          },
          {
            slug: {
              [Op.eq]: slug,
            },
          },
        ],
      },

      include: [
        {
          association: "examnews",
          attributes: ["id", "title", "slug", "cover_image"],
        },

        {
          association: "eligibilities",
          attributes: ["id", "title", "description"],
        },
        {
          association: "feedetails",
          attributes: ["id", "category", "amount"],
        },
        {
          association: "examdates",
          attributes: ["id", "event", "start_date", "end_date"],
        },
        {
          association: "examagelimit",
          attributes: ["id", "content", "description"],
        },
        {
          association: "examidproof",
          attributes: ["id", "content"],
        },
        {
          association: "examfaqs",
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
          message: `Cannot find Exam with Slug=${slug}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Exam with id=" + slug,
        error: err,
      });
    });
};
exports.topcollegebangalore = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
    college_type,
    accreditation_id,
    management_id,
    group_id,
    stream_id,
    data_type,
    course_id,
  } = req.query;

  console.log();

  var column = columnname ? columnname : "listing_order";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let cityarr = city_id ? JSON.parse(city_id) : [];
  let collegetype = college_type ? JSON.parse(college_type) : [];
  let acrredations = accreditation_id ? JSON.parse(accreditation_id) : [];
  let managments = management_id ? JSON.parse(management_id) : [];
  let groups = group_id ? JSON.parse(group_id) : [];

  let grouptrue = group_id ? true : false;

  let streamss = stream_id ? JSON.parse(stream_id) : [];

  let coursess = course_id ? JSON.parse(course_id) : [];

  let coursesstrue = course_id ? true : false;

  let streamtrue = stream_id ? true : false;

  let managementtrue = management_id ? true : false;
  let acrredationsT = accreditation_id ? true : false;
  let collegetypetrue = collegetype ? true : false;

  var conditioncollege_type = college_type
    ? {
      college_type: {
        [Op.or]: collegetype,
      },
    }
    : null;

  var conditioncity_id = city_id
    ? {
      city_id: {
        [Op.or]: cityarr,
      },
    }
    : null;

  var conditionarea_id = area_id ? { area_id: area_id } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [{ status: "Published" }];

  data_type ? data_array.push({ type: data_type }) : "";
  //data_array.push({ required: false });

  conditioncity_id ? data_array.push(conditioncity_id) : null;
  conditioncollege_type ? data_array.push(conditioncollege_type) : null;
  conditionarea_id ? data_array.push(conditionarea_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);

  let exclude_value = [
    "areaId",
    "cityId",
    "rank",

    "meta_title",
    "meta_description",
    "meta_keyword",
    "code_before_head",
    "code_before_body",
    "facts",

    "keywords",

    "created_at",
    "updated_at",
    // "genders_accepted",
    "campus_size",
    "campus_size_type",

    "map",
    "home_view_status",
    "order",
    "video",
    "undergraduate",
    "placements",
    "postgraduate",
    "Doctorate",
    "Diploma",
    "Scholarships",
    // "admissions",
    "about",

    // "avg_rating",
    "video_full_url",
    "scholarship",
    "exam_data",
    "why_choose",
    "career_opportunities",
  ];

  let includearray = [
    { required: false, association: "city", attributes: ["id", "city_name"] },
    { required: false, association: "area", attributes: ["id", "area_name"] },
    {
      required: false,
      association: "college_accreditation",
      required: acrredationsT,
      attributes: ["id", "accreditation_id"],
      where: {
        accreditation_id: {
          [Op.or]: acrredations,
        },
      },
    },
    {
      required: false,
      association: "college_management",
      attributes: ["id", "management_id"],
      required: managementtrue,

      where: {
        management_id: {
          [Op.or]: managments,
        },
      },
    },

    /*
    { data_type
      association: "college_groups",
      attributes: ["id", "group_id"],
      required: grouptrue,
      where: {
        group_id: {
          [Op.or]: groups,
        },
      },
    },*/

    {
      association: "collegeRecognition",
      attributes: ["recognition_id"],
      required: false,
      include: [
        {
          association: "recognitionname",
          attributes: ["recognition_approval_name"],
        },
      ],
    },
    // {
    //   required: false,
    //   association: "college_board",
    //   attributes: ["id", "college_id"],
    //   include: [
    //     {
    //       required: false,
    //       association: "college_name",
    //       attributes: ["id", "name", "slug"],
    //     },
    //   ],
    // },
  ];

  if (grouptrue && data_type != "university") {
    includearray.push({
      association: "college_groups",
      attributes: ["id", "group_id"],
      required: grouptrue,
      where: {
        group_id: {
          [Op.or]: groups,
        },
      },
    });
  }

  if (streamtrue && data_type == "university") {
    includearray.push({
      association: "college_stream",
      attributes: ["id", "stream_id"],
      required: streamtrue,
      where: {
        stream_id: {
          [Op.or]: streamss,
        },
      },
    });
  }

  if (
    (streamtrue || coursesstrue) &&
    data_type != "board" &&
    data_type != "university"
  ) {
    // console.log(streamtrue,"streamtrue");
    // console.log(coursess,"coursess");
    // console.log(data_type,"data_type");
    includearray.push({
      association: "courses_college",
      attributes: ["id"],
      include: {
        association: "course",
        attributes: ["id", "course_stream_name"],
        required: true,
        where: {
          id: {
            [Op.or]: coursess,
          },
        },
        include: {
          association: "streams",
          attributes: ["id"],
          required: true,
          where: {
            id: {
              [Op.or]: streamss,
            },
          },
        },
      },
      required: true,
    });
  }
  console.log(includearray);
  CollegeAndUniversity.findAndCountAll({
    where: data_array,
    limit,
    offset,
    attributes: { exclude: exclude_value },
    include: includearray,
    order: [orderconfig],
    subQuery: false,

    group: ["id"],
  })

    .then((data) => {
      const response = getPagingDataA(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems.length,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "   error occurred while retrieving Sub streams.",
      });
    });
};

exports.findonecollege = (req, res) => {
  const slug = req.params.slug;

  let exclude_value = [
    // "city_id",
    // "area_id",
    "rank",
    "code_before_head",
    "code_before_body",
    "facts",
    "video",
    "video_full_url",
    "exam_data",
    "career_opportunities",
    "Scholarships",
    "created_at",
    "updated_at",
    // "cityId",
    // "areaId",
  ];

  CollegeAndUniversity.findOne({
    where: {
      [Op.or]: [
        {
          id: {
            [Op.eq]: slug,
          },
        },
        {
          slug: {
            [Op.eq]: slug,
          },
        },
      ],
      status: "Published",
    },
    attributes: { exclude: exclude_value },
    include: [
      {
        required: false,
        association: "courses_college",

        attributes: [
          "id",
          "course_type",
          // "brochure",
          "slug",
          "duration",
          "status",
        ],

        include: [
          {
            required: false,
            association: "course",
            attributes: [
              "id",
              "course_stream_name",
              // "course_short_name",
              // "stream_id",
              "course_stream_slug",
              "course_type",
              "logo",
            ],

            include: [
              {
                required: false,
                association: "streams",
                attributes: ["id", "stream_name",],
                // attributes: ["id", "stream_name", "stream_slug"],
              },
            ],
          },

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

        ],
      },

      { association: "city", attributes: ["id", "city_name"] },
      { association: "area", attributes: ["id", "area_name"] },

      {
        required: false,
        association: "faqs",
        attributes: ["id", "questions", "answers"],
      },
      {
        required: false,
        association: "college_affiliation",
        attributes: ["id", "affiliations_id"],
        include: [
          {
            association: "affiliationname",
            attributes: ["id", "other_affiliations_name"],
          },
        ],
      },
      {
        required: false,
        association: "college_amenities",
        attributes: ["id", "amenities_id"],
        include: [
          {
            association: "amenitiename",
            attributes: ["id", "amenities_name", "amenities_logo"],
          },
        ],
      },
      {
        required: false,
        association: "collegeRecognition",
        attributes: ["id", "recognition_id"],
        include: [
          {
            association: "recognitionname",
            attributes: ["id", "recognition_approval_name"],
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
          message: `Cannot find college with Slug=${slug}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving college with id=" + slug,
        error: err,
      });
    });
};

exports.findOnecourse = (req, res) => {
  console.log(req);
  let data_array = [{ type: "college" }, { status: "Published" }];

  if (req.query.collegeslug) {
    var condition = req.query.collegeslug
      ? { slug: req.query.collegeslug }
      : null;
    condition ? data_array.push(condition) : null;
    // let collegeslug = req.query.collegeslug;
    // let collegesearch=
    console.log("w");
  }
  console.log(req.query);
  console.log(req.params);
  // return
  const slug = req.params.slug;

  generalcourse
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: slug,
            },
          },
          {
            course_stream_slug: {
              [Op.eq]: slug,
            },
          },
        ],
      },
      include: [
        {
          association: "course",
          attributes: [
            "id",
            "course_type",
            "course_details_structure",
            "meta_title",
            "meta_description",
            "duration",
            "status",
          ],
          include: [
            { association: "medium", attributes: ["id", "medium"] },
            {
              required: false,
              association: "college",
              attributes: [
                "id",
                "type",
                "name",
                "avg_rating",
                "slug",
                "logo",
                "status",
              ],
              where: data_array,
            },
            {
              association: "course",
              attributes: [
                "id",
                "course_stream_name",
                "stream_id",
                "course_stream_slug",
              ],
            },
            {
              association: "jobanalysis",
              attributes: [
                "id",
                "job_profile",
                "average_salary",
                "job_description",
              ],
            },
            {
              association: "eligibilities",
              attributes: ["id", "stream", "description"],
            },
            {
              association: "salary",
              attributes: ["id", "salary_year", "amount"],
            },

            { association: "gallery", attributes: ["id", "images"] },
            {
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
              association: "courseexams",
              attributes: ["id", "exams_id"],
              include: [
                {
                  required: false,
                  association: "exams",
                  attributes: ["id", "exam_title", "exam_short_name", "slug"],
                },
              ],
            },

            {
              association: "coursecompanies",
              attributes: ["id", "companies_id"],
            },
            {
              association: "coursesyllabus",
              attributes: ["id", "title"],
              include: [
                {
                  association: "syllabussdetails",
                  attributes: ["subject", "description"],
                },
              ],
            },
            {
              association: "cousrsefees",
              attributes: ["id", "type", "title", "note", "total_amount"],
              include: [
                {
                  association: "feedetail",
                  attributes: ["sub_title", "amount"],
                },
              ],
            },
          ],
        },

        { association: "sub_stream", attributes: ["id", "sub_stream_name"] },
        { association: "streams", attributes: ["id", "stream_name"] },
        {
          required: false,
          association: "faqs",
          attributes: ["id", "questions", "answers"],
        },
      ],
    })
    // .then((data) => {
    //   if (data) {
    //     res.status(200).send({
    //       status: 1,
    //       message: "successfully retrieved",
    //       data: data,
    //     });
    //   } else {
    //     res.status(400).send({
    //       status: 0,
    //       message: `Cannot find generalcourse with Slug=${slug}.`,
    //     });
    //   }
    // })
    .then(async (data) => {
      if (data) {
        let grpname = data.streams.stream_name
          ? data.streams.stream_name
          : null;
        // console.log(grpname);
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
                  attributes: [
                    "id",
                    "type",
                    "name",
                    "avg_rating",
                    "slug",
                    "logo",
                    "status",
                  ],
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
        message: "Error retrieving generalcourse with id=" + slug,
      });
    });
};
exports.findcollegecourseone = (req, res) => {
  let data_array = [{ type: "college" }, { status: "Published" }];

  if (req.query.collegeslug) {
    var condition = req.query.collegeslug
      ? { slug: req.query.collegeslug }
      : null;
    condition ? data_array.push(condition) : null;
  }

  console.log(data_array);
  const slug = req.params.slug;
  let exclude_value = [
    "career_prospects",
    "course_group",
    "video",
    "video_full_url",
    "code_before_head",
    "code_before_body",
    "syllabus",
    "created_at",
    "updated_at",
  ];
  courses
    .findAndCountAll({
      where: {
        [Op.or]: [
          {
            slug: {
              [Op.eq]: slug,
            },
          },
        ],
        status: "Published",
      },
      attributes: { exclude: exclude_value },

      include: [
        { association: "medium", attributes: ["id", "medium"] },
        {
          required: true,
          association: "college",
          attributes: [
            "id",
            "type",
            "name",
            "avg_rating",
            "slug",
            "logo",
            "status",
          ],
          where: data_array,
        },
        {
          association: "course",
          attributes: [
            "id",
            "course_stream_name",
            "stream_id",
            "course_stream_slug",
          ],
          include: [
            {
              required: false,
              association: "streams",
              attributes: ["id", "stream_name"],
            },
          ],
        },
        // {
        //   association: "jobanalysis",
        //   attributes: [
        //     "id",
        //     "job_profile",
        //     "average_salary",
        //     "job_description",
        //   ],
        // },
        {
          association: "eligibilities",
          attributes: ["id", "stream", "description"],
        },
        // {
        //   association: "salary",
        //   attributes: ["id", "salary_year", "amount"],
        // },

        // { association: "gallery", attributes: ["id", "images"] },
        {
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
          association: "courseexams",
          attributes: ["id", "exams_id"],
          include: [
            {
              required: false,
              association: "exams",
              attributes: ["id", "exam_title", "exam_short_name", "slug"],
            },
          ],
        },

        // {
        //   association: "coursecompanies",
        //   attributes: ["id", "companies_id"],
        // },

        {
          association: "cousrsefees",
          attributes: ["id", "type", "title", "note", "total_amount"],
          include: [
            {
              association: "feedetail",
              attributes: ["sub_title", "amount"],
            },
          ],
        },
      ],
    })

    .then(async (data) => {
      if (data) {
        let grpname = data.rows[0].course.streams.stream_name
          ? data.rows[0].course.streams.stream_name
          : null;
        // console.log(grpname);
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
                  attributes: [
                    "id",
                    "type",
                    "name",
                    "avg_rating",
                    "slug",
                    "logo",
                    "status",
                  ],
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
        message: "Error retrieving generalcourse with id=" + slug,
        err: err,
      });
    });
};

exports.findallgroup = async (req, res) => {
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
  groups
    .findAndCountAll({
      where: condition,
      attributes: ["id", "group", "title"],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};
exports.findAllcollegetype = async (req, res) => {
  let college_type = [
    "Public",
    "Deemed",
    "Private",
    "Autonomous",
    "Government",
  ];
  if (college_type !== null) {
    res.status(200).send({
      status: 1,
      message: "success",
      data: college_type,
    });
  } else {
    res.status(500).send({
      status: 0,
      message: "Some error occurred while retrieving college_type",
    });
  }
};

exports.findAllgeneralcourse = async (req, res) => {
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

  var conditionStreamId = stream_id ? { stream_id: stream_id } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditionStreamId ? data_array.push(conditionStreamId) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  generalcourse
    .findAndCountAll({
      where: data_array,
      attributes: ["id", "course_stream_name", "course_stream_slug"],
      limit,
      offset,
      // include: [
      //   { association: "sub_stream", attributes: ["id", "sub_stream_name"] },
      //   { association: "streams", attributes: ["id", "stream_name"] },
      // ],
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
        data: response.finaldata,
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
exports.findallcitys = async (req, res) => {
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
  city
    .findAndCountAll({
      where: condition,
      attributes: ["id", "city_name"],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};
exports.findallaccreditaions = async (req, res) => {
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
  Accreditation.findAndCountAll({
    where: condition,
    attributes: ["id", "accreditation_name"],

    order: [orderconfig],
  })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};
exports.findallmanagments = async (req, res) => {
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
  management
    .findAndCountAll({
      where: condition,
      attributes: ["id", "management_name"],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};

exports.topschoolbangalore = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
    classification,
    school_level_id,
    level_id,
    board_id,
    school_board_id,
    school_type_id,
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

  let cityarr = city_id ? JSON.parse(city_id) : [];
  let schlevelarr = school_level_id ? JSON.parse(school_level_id) : [];
  let schboardarr = school_board_id ? JSON.parse(school_board_id) : [];
  let schtypearr = school_type_id ? JSON.parse(school_type_id) : [];
  let classificationtype = classification ? JSON.parse(classification) : [];

  var conditionclassification_type = classification
    ? {
      genders_accepted: {
        [Op.or]: classificationtype,
      },
    }
    : null;

  var conditioncity_id = city_id
    ? {
      city_id: {
        [Op.or]: cityarr,
      },
    }
    : null;
  var conditionschool_level_id = school_level_id
    ? {
      school_level_id: {
        [Op.or]: schlevelarr,
      },
    }
    : null;
  var conditionschool_board_id = school_board_id
    ? {
      school_board_id: {
        [Op.or]: schboardarr,
      },
    }
    : null;
  var conditionschool_type_id = school_type_id
    ? {
      school_type_id: {
        [Op.or]: schtypearr,
      },
    }
    : null;

  var conditionarea_id = area_id ? { area_id: area_id } : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [{ status: "published" }];
  data_array.push();
  conditioncity_id ? data_array.push(conditioncity_id) : null;
  // conditionschool_level_id ? data_array.push(conditionschool_level_id) : null;
  // conditionschool_board_id ? data_array.push(conditionschool_board_id) : null;
  conditionschool_type_id ? data_array.push(conditionschool_type_id) : null;
  let levels = level_id ? JSON.parse(level_id) : [];
  let levelrequired = level_id ? true : false;
  let boards = board_id ? JSON.parse(board_id) : [];
  let boardrequired = board_id ? true : false;
  conditionclassification_type
    ? data_array.push(conditionclassification_type)
    : null;
  // conditionarea_id ? data_array.push(conditionarea_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);

  await school
    .findAndCountAll({
      distinct: true,
      where: data_array,
      limit,
      offset,
      // subQuery: false,
      include: [
        // {
        //   required: false,
        //   association: "schoolboard",
        //   attributes: ["id", "name", "slug"],
        // },
        {
          required: false,
          association: "schooltype",
          attributes: ["id", "type"],
        },
        {
          required: false,
          association: "citys",
          attributes: ["id", "city_name"],
        },
        {
          required: false,
          association: "areas",
          attributes: ["id", "area_name"],
        },
        {
          // subQuery: false,
          required: false,
          association: "schoolrecognition",
          attributes: ["id", "recognition_id"],
          include: [
            {
              association: "schrecognitionname",
              attributes: ["id", "recognition_approval_name"],
            },
          ],
        },
        {
          required: levelrequired,
          association: "schoollevels",
          attributes: ["id", "level_id"],
          where: {
            level_id: {
              [Op.or]: levels,
            },
          },
          include: [
            {
              required: false,
              association: "schlevelname",
              attributes: ["id", "level_name"],
            },
          ],
        },
        {
          required: boardrequired,
          association: "boardschools",
          attributes: ["id", "board_id"],
          where: {
            board_id: {
              [Op.or]: boards,
            },
          },
          include: [
            {
              required: false,
              association: "schbrdname",
              attributes: ["id", "name"],
            },
          ],
        },


      ],


      // subQuery: false,

      order: [orderconfig],
      // group:["id"],
    })

    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "   error occurred while retrieving  School.",
      });
    });
};

exports.findoneschool = (req, res) => {
  const slug = req.params.slug;

  school
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: slug,
            },
          },
          {
            school_slug: {
              [Op.eq]: slug,
            },
          },
        ],
      },
      include: [
        {
          required: false,
          association: "citys",
          attributes: ["id", "city_name"],
        },
        // {
        //   required: false,
        //   association: "schoolboard",
        //   attributes: ["id", "name"],
        // },
        {
          required: false,
          association: "areas",
          attributes: ["id", "area_name"],
        },
        {
          required: false,
          association: "schooltype",
          attributes: ["id", "type"],
        },
        {
          required: false,
          association: "schoollevels",
          attributes: ["id", "level_id"],
          include: [
            {
              association: "schlevelname",
              attributes: ["id", "level_name"],
            },
          ],
        },
        {
          required: false,
          association: "boardschools",
          attributes: ["id", "board_id"],
          include: [
            {
              required: false,
              association: "schbrdname",
              attributes: ["id", "name"],
            },
          ],
        },
        // {
        //   required: false,
        //   association: "schoollevel",
        //   attributes: ["id", "level"],
        // },
        {
          required: false,
          association: "schfaqs",
          attributes: ["id", "questions", "answers"],
        },
        {
          required: false,
          association: "schoolaccreditations",
          attributes: ["id", "accreditation_id"],
          include: [
            {
              association: "schaccreditationname",
              attributes: ["id", "accreditation_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolamenities",
          attributes: ["id", "amenities_id"],
          include: [
            {
              association: "schamenitiename",
              attributes: ["id", "amenities_name", "amenities_logo"],
            },
          ],
        },
        {
          required: false,
          association: "schoolmanagment",
          attributes: ["id", "management_id"],
          include: [
            {
              association: "schmanagementname",
              attributes: ["id", "management_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolrecognition",
          attributes: ["id", "recognition_id"],
          include: [
            {
              association: "schrecognitionname",
              attributes: ["id", "recognition_approval_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolaffiliations",
          attributes: ["id", "affiliations_id"],
          include: [
            {
              association: "schaffiliationname",
              attributes: ["id", "other_affiliations_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoolgallery",
          attributes: ["id", "image"],
        },
      ],
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
      //     include: [
      //       {
      //         association: "affiliationname",
      //         attributes: ["id", "other_affiliations_name"],
      //       },
      //     ],
      //   },
      //   {
      //     association: "college_groups",
      //     attributes: ["id", "group_id"],
      //   },
      //   {
      //     association: "college_accreditation",
      //     attributes: ["id", "accreditation_id"],
      //     include: [
      //       {
      //         association: "accreditationname",
      //         attributes: ["id", "accreditation_name"],
      //       },
      //     ],
      //   },
      //   {
      //     association: "college_amenities",
      //     attributes: ["id", "amenities_id"],
      //     include: [
      //       {
      //         association: "amenitiename",
      //         attributes: ["id", "amenities_name", "amenities_logo"],
      //       },
      //     ],
      //   },
      //   {
      //     association: "collegeRecognition",
      //     attributes: ["id", "recognition_id"],
      //     include: [
      //       {
      //         association: "recognitionname",
      //         attributes: ["id", "recognition_approval_name"],
      //       },
      //     ],
      //   },
      //   {
      //     association: "college_management",
      //     attributes: ["id", "management_id"],
      //     include: [
      //       {
      //         association: "managementname",
      //         attributes: ["id", "management_name"],
      //       },
      //     ],
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
        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find School with Slug=${slug}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving college with id=" + slug,
        error: err,
      });
    });
};

exports.findAllschoolclassification = async (req, res) => {
  let gender_accepted = ["Male", "Female", "Co-Ed"];
  if (gender_accepted !== null) {
    res.status(200).send({
      status: 1,
      message: "success",
      data: gender_accepted,
    });
  } else {
    res.status(500).send({
      status: 0,
      message: "Some error occurred while retrieving gender_accepted ",
    });
  }
};

exports.findallschoolboards = async (req, res) => {
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
      attributes: ["id", "name"],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};

exports.findallschoollevels = async (req, res) => {
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
  schoollevel
    .findAndCountAll({
      where: condition,
      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};
exports.findallschooltypes = async (req, res) => {
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
  schooltype
    .findAndCountAll({
      limit,
      offset,
      where: condition,
      // attributes: ["id", "level"],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving school type.",
      });
    });
};

exports.allblogs = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    author_id,
    category_id,
    columnname,
    orderby,
    home_view_status,
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

  let authorarray = author_id ? JSON.parse(author_id) : [];
  let categoriesarr = category_id ? JSON.parse(category_id) : [];

  var condition_author_id = author_id
    ? {
      author_id: {
        [Op.or]: authorarray,
      },
    }
    : null;
  var conditioncategory_id = category_id
    ? {
      category_id: {
        [Op.or]: categoriesarr,
      },
    }
    : null;

  var conditionviewstatus = home_view_status
    ? { home_view_status: home_view_status }
    : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  condition_author_id ? data_array.push(condition_author_id) : null;
  conditioncategory_id ? data_array.push(conditioncategory_id) : null;
  condition ? data_array.push(condition) : null;
  conditionviewstatus ? data_array.push(conditionviewstatus) : null;
  conditionviewstatus
    ? data_array.push({ [Op.not]: [{ listing_order: null }] })
    : null;

  const { limit, offset } = getPagination(page, size);
  blog
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      include: [
        { association: "author", attributes: ["id", "author_name"] },
        { association: "categories", attributes: ["id", "category_name"] },
        {
          association: "groups",
          attributes: ["id", "group", "slug"],
          required: false,
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving blog.",
      });
    });
};

exports.findoneblog = async (req, res) => {
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
    })
    .then(async (data) => {
      if (data) {
        if (data.group_id) {
          console.log(data.group_id);
          let group = data.group_id;
          const collegelist = await college_groups.findAndCountAll({
            where: {
              [Op.or]: [
                {
                  group_id: {
                    [Op.eq]: group,
                  },
                },
              ],
            },
            include: [
              {
                where: { type: "college" },
                association: "college_groupss",
                attributes: ["id", "type", "name", "slug", "logo"],
                required: true,
              },
            ],
            limit: 10,
            subQuery: false,
          });

          return res.status(200).send({
            status: 1,
            message: "successfully retrieved",
            data: data,
            colleges: collegelist,
          });
        }
        res.status(200).send({
          status: 1,
          message: "successfully retrieved",
          data: data,
          colleges: "Please add group when add blog and no group_id found",
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find Blog with .`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Blog with id=",
        error: err,
      });
    });
};

exports.findAllauthor = async (req, res) => {
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
  author
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving author.",
      });
    });
};

exports.findAllcategories = async (req, res) => {
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
  categories
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

exports.findallupcommingexams = async (req, res) => {
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
  var condition_examdate = {
    upcoming_date: {
      [Op.gt]: [new Date()],
    },
  };
  // data_array.push({ [Op.not]: [{ top_featured_order: null }] })
  // let data_array = [];
  let data_array = [{ [Op.not]: [{ upcoming_date: "null" }] }];
  condition_examdate ? data_array.push(condition_examdate) : null;
  // console.log(data_array);

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  const { limit, offset } = getPagination(page, size);
  exam
    .findAndCountAll({
      where: data_array,
      attributes: [
        "id",
        "meta_title",
        "slug",
        "upcoming_date",
        "exam_title",
        "exam_short_name",
        "status",
        "cover_image",
        "listing_order",
        "promo_banner",
        "promo_banner_status",
      ],

      order: [orderconfig],
    })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        data: data.rows,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving groupss.",
      });
    });
};

exports.findOnePage = async (req, res) => {
  const urlsegment =
    req.params.urlsegment && req.params.urlsegment != "home"
      ? base_url + "/" + req.params.urlsegment
      : base_url;
  //pages.findByPk(id);
  console.log(urlsegment);

  let data_array = [{ url: urlsegment }];

  pages
    .findOne({ where: data_array })
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
          message: `Cannot find page `,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Page",
      });
    });
};

exports.allnews = async (req, res) => {
  console.log(req.params);
  const {
    page,
    size,
    searchtext,
    columnname,
    news_type,
    is_top_featured,
    searchfrom,
    orderby,
  } = req.query;

  const Type = news_type;
  const featurednews = is_top_featured;

  var conditionType = Type ? { news_type: news_type } : null;
  var conditionfeaturednews = featurednews
    ? { is_top_featured: is_top_featured }
    : null;
  let data_array = [{ status: "published" }];
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
  conditionType ? data_array.push(conditionType) : null;
  condition ? data_array.push(condition) : null;
  conditionfeaturednews ? data_array.push(conditionfeaturednews) : null;
  conditionfeaturednews
    ? data_array.push({ [Op.not]: [{ top_featured_order: null }] })
    : null;

  const { limit, offset } = getPagination(page, size);

  newsandevents
    .findAndCountAll({ where: data_array, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message || "Some error occurred while retrieving newsandevents.",
      });
    });
};

exports.allabroaduniversities = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    country_id,
    searchfrom,
    columnname,
    orderby,
  } = req.query;
  // console.log(req.query);
  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  var conditioncountry_id = country_id ? { country_id: country_id } : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  let data_array = [];
  conditioncountry_id ? data_array.push(conditioncountry_id) : null;
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  abroad_universities
    .findAndCountAll({
      where: data_array,
      // limit,
      // offset,
      include: { association: "country", attributes: ["id", "country_name"] },
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving abroad_universities.",
      });
    });
};

exports.findonenews = (req, res) => {
  const slug = req.params.slug;

  newsandevents
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: slug,
            },
          },
          {
            slug: {
              [Op.eq]: slug,
            },
          },
        ],
        status: "Published",
      },
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
          message: `Cannot find News with Slug=${slug}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving News with id=" + slug,
        error: err,
      });
    });
};

exports.nripage = (req, res) => {
  nri
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: 1,
            },
          },
        ],
      },
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
          message: `Cannot find Nri page .`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Nri page ",
        error: err,
      });
    });
};

exports.recognitioneditorpage = (req, res) => {
  recognitioneditor
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: 1,
            },
          },
        ],
      },
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
          message: `Cannot find recognitioneditor page .`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving recognitioneditor page ",
        error: err,
      });
    });
};
exports.servicespage = (req, res) => {
  service
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: 1,
            },
          },
        ],
      },
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
          message: `Cannot find services page .`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving services page ",
        error: err,
      });
    });
};
exports.aboutpage = (req, res) => {
  about
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: 1,
            },
          },
        ],
      },
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
          message: `Cannot find about page .`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving about page ",
        error: err,
      });
    });
};

exports.allscholarships = async (req, res) => {
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
        data: response.finaldata,
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

exports.findonescholarship = (req, res) => {
  const slug = req.params.slug;

  scholarships
    .findOne({
      where: {
        [Op.or]: [
          {
            id: {
              [Op.eq]: slug,
            },
          },
          {
            slug: {
              [Op.eq]: slug,
            },
          },
        ],
      },
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
          message: `Cannot find Scholarship with Slug=${slug}.`,
        });
      }
    })

    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving Scholarship with id=" + slug,
        error: err,
      });
    });
};

exports.findhomepagevideos = async (req, res) => {
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
  // let data_array = [ { listing_order: null }];

  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  condition ? data_array.push(condition) : null;

  data_array.push({ [Op.not]: [{ listing_order: null }] });

  const { limit, offset } = getPagination(page, size);

  youtubevideos
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving Streams.",
      });
    });
};
exports.findAllstreams = async (req, res) => {
  // console.log(req.query);

  const {
    page,
    size,
    searchtext,
    searchfrom,
    home_view_status,
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
  // let data_array = [ { listing_order: null }];

  let data_array = [];

  var conditionhomestatus = home_view_status
    ? { home_view_status: home_view_status }
    : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  condition ? data_array.push(condition) : null;
  conditionhomestatus ? data_array.push(conditionhomestatus) : null;

  conditionhomestatus
    ? data_array.push({ [Op.not]: [{ listing_order: null }] })
    : null;

  const { limit, offset } = getPagination(page, size);

  stream
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "stream_name",
        "stream_slug",
        "icon",
        "logo",
        "home_view_status",
        "listing_order",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving Streams.",
      });
    });
};

exports.findAllexams = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    home_view_status,
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
  var conditionhomestatus = home_view_status
    ? { home_view_status: home_view_status }
    : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  let data_array = [];
  /*let data_array = [
    { [Op.not]: [{ listing_order: null }] },
    { status: PUBLISHED },
  ];*/
  condition ? data_array.push(condition) : null;
  conditionhomestatus ? data_array.push(conditionhomestatus) : null;

  conditionhomestatus
    ? data_array.push({ [Op.not]: [{ listing_order: null }] })
    : null;

  const { limit, offset } = getPagination(page, size);
  exam
    .findAndCountAll({
      where: data_array,
      limit,
      offset,
      attributes: [
        "id",
        "exam_title",
        "exam_short_name",
        "slug",
        "status",
        "cover_image",
        "home_view_status",
        "listing_order",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving city.",
      });
    });
};
exports.alltestimonial = async (req, res) => {
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
  const newcolumn = "role";
  const regex = /^https?:\/\/youtu\.be\/([a-zA-Z0-9_-]{11})$/;
  const { limit, offset } = getPagination(page, size);
  videotestimonial
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then(async (data) => {
      const response = getPagingData(data, page, limit);
      let datanew = response.finaldata;

      const updatedUsers = response.finaldata.map((user) => {
        let shortLink = user["video_url"];
        let match = shortLink.match(regex);
        let youtubefullurl = "";
        if (match) {
          let videoId = match[1];

          youtubefullurl = "https://www.youtube.com/embed/" + videoId;
        } else {
          youtubefullurl = "";
        }
        user["title"] = youtubefullurl;
        // add the new column to the object
        return user;
      });
      //response.finaldata
      res.status(200).send({
        status: 1,
        message: "success",
        message1: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: updatedUsers,
        updatedUsers: updatedUsers,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving videotestimonials.",
      });
    });
};
exports.allteam = async (req, res) => {
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
  team
    .findAndCountAll({ where: condition, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);

      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving teams.",
      });
    });
};

exports.allpromotionalbanners = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    promo_banner,
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
  let data_array = [];

  var conditionpage = promo_banner ? { promo_banner: promo_banner } : null;
  var condition = sendsearch.customseacrh(searchtext, searchfrom);

  condition ? data_array.push(condition) : null;
  conditionpage ? data_array.push(conditionpage) : null;
  conditionpage ? data_array.push({ status: "published" }) : null;

  const { limit, offset } = getPagination(page, size);
  banner
    .findAndCountAll({ where: data_array, limit, offset, order: [orderconfig] })
    .then((data) => {
      const response = getPagingData(data, page, limit);
      res.status(200).send({
        status: 1,
        message: "success",
        totalItems: response.totalItems,
        currentPage: response.currentPage,
        totalPages: response.totalPages,
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Some error occurred while retrieving city.",
      });
    });
};

exports.sitemap = async (req, res) => {
  const data = {
    errors: {},
  };
  data.college = [];
  data.university = [];
  data.coursestreams = [];
  data.blogs = [];
  data.exam = [];
  data.groups = [];
  data.newsandevents = [];
  data.school = [];

  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
  } = req.body;

  const { limit, offset } = getPagination(page, size);

  if (data.college) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "college" }, { status: PUBLISHED }];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.college = await CollegeAndUniversity.findAll({
        where: data_array,

        attributes: ["id", "name", "slug", "updated_at"],

        subQuery: false,
      })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.university) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "university" }, { status: PUBLISHED }];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.university = await CollegeAndUniversity.findAll({
        where: data_array,

        attributes: ["id", "name", "slug", "updated_at"],

        subQuery: false,
      })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.coursestreams) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.coursestreams = await stream
        .findAll({
          where: data_array,

          attributes: ["id", "stream_name", "stream_slug", "updated_at"],

          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.exam) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.exam = await exams
        .findAll({
          where: data_array,

          attributes: ["id", "exam_title", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.blogs) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.blogs = await blog
        .findAll({
          where: data_array,

          attributes: ["id", "title", "slug", "updated_at"],

          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.newsandevents) {
    var column = columnname ? columnname : "title";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.newsandevents = await newsandevents
        .findAll({
          where: data_array,

          attributes: ["id", "title", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.groups) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.groups = await groups
        .findAll({
          where: data_array,

          attributes: ["id", "title", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.school) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.school = await school
        .findAll({
          where: data_array,

          attributes: ["id", "school_name", "school_slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

exports.seolink = async (req, res) => {
  const data = {
    errors: {},
  };
  data.college = [];
  data.university = [];
  data.boards = [];
  data.coursestreams = [];
  data.blogs = [];
  data.exam = [];
  // data.groups = [];
  data.newsandevents = [];
  data.school = [];

  const {
    page,
    size,
    searchtext,
    city_id,
    area_id,
    searchfrom,
    columnname,
    orderby,
  } = req.body;

  const { limit, offset } = getPagination(page, size);

  if (data.college) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "college" }, { status: PUBLISHED }];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.college = await CollegeAndUniversity.findAll({
        where: data_array,

        attributes: [
          "id",
          "name",
          "slug",
          "meta_title",
          "meta_description",
          "updated_at",
        ],

        subQuery: false,
      })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "College individual",
              H1Tag: vaule.name,
              Link: "https://bangalorestudy.com/college/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
          //   const response = getPagingData(data, page, limit);

          // return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.university) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "university" }, { status: PUBLISHED }];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.university = await CollegeAndUniversity.findAll({
        where: data_array,

        attributes: [
          "id",
          "name",
          "slug",
          "meta_title",
          "meta_description",
          "updated_at",
          // {"d"}
        ],

        subQuery: false,
      })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "University individual",
              H1Tag: vaule.name,
              Link: "https://bangalorestudy.com/university/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }
  if (data.boards) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ type: "board" }, { status: PUBLISHED }];

    // let data_array1 = [];
    let data_array1 = [{ "$CollegeGalleriess.status$": "featured" }];

    try {
      data.boards = await CollegeAndUniversity.findAll({
        where: data_array,

        attributes: [
          "id",
          "name",
          "slug",
          "meta_title",
          "meta_description",
          "updated_at",
          // {"d"}
        ],

        subQuery: false,
      })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "Board individual",
              H1Tag: vaule.name,
              Link: "https://bangalorestudy.com/board/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }
  if (data.coursestreams) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.coursestreams = await stream
        .findAll({
          where: data_array,

          attributes: [
            "id",
            "stream_name",
            "stream_slug",
            "meta_title",
            "stream_description",
            "h1_title",
            "updated_at",
          ],

          subQuery: false,
        })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "Course stream individual",
              H1Tag: vaule.h1_title,
              Link: "https://bangalorestudy.com/courses/" + vaule.stream_slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.stream_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
          //   const response = getPagingData(data, page, limit);

          // return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.exam) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.exam = await exams
        .findAll({
          where: data_array,

          attributes: [
            "id",
            "exam_title",
            "slug",
            "meta_title",
            "meta_description",
            "updated_at",
          ],
          orderconfig,
          subQuery: false,
        })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            // console.log(vaule.exam_title)
            return {
              Pagetitle: "Exam individual",
              H1Tag: vaule.exam_title,
              Link: "https://bangalorestudy.com/exams/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.blogs) {
    var column = columnname ? columnname : "slug";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.blogs = await blog
        .findAll({
          where: data_array,

          attributes: [
            "id",
            "title",
            "slug",
            "meta_title",
            "meta_description",
            "updated_at",
          ],

          subQuery: false,
        })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "Blog individual",
              H1Tag: vaule.title,
              Link: "https://bangalorestudy.com/blog/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          const response = getPagingData(data, page, limit);

          return finaldata;
          // return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.newsandevents) {
    var column = columnname ? columnname : "title";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [{ status: PUBLISHED }];

    try {
      data.newsandevents = await newsandevents
        .findAll({
          where: data_array,

          attributes: [
            "id",
            "title",
            "slug",
            "meta_title",
            "meta_description",
            "updated_at",
          ],
          orderconfig,
          subQuery: false,
        })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            return {
              Pagetitle: "News events individual",
              H1Tag: vaule.title,
              Link: "https://bangalorestudy.com/news-and-event/" + vaule.slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          const response = getPagingData(data, page, limit);

          return finaldata;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.groups) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.groups = await groups
        .findAll({
          where: data_array,

          attributes: ["id", "title", "slug", "updated_at"],
          orderconfig,
          subQuery: false,
        })

        .then((data) => {
          //   const response = getPagingData(data, page, limit);

          return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  if (data.school) {
    var column = columnname ? columnname : "order";
    var order = orderby ? orderby : "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (typeof myArray[1] !== "undefined") {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [table, column, order];
    }

    let data_array = [];

    try {
      data.school = await school
        .findAll({
          where: data_array,

          attributes: [
            "id",
            "school_name",
            "school_slug",
            "meta_title",
            "meta_description",
          ],
          orderconfig,
          subQuery: false,
        })

        .then(async (data) => {
          let data1 = data;
          let finaldata = await data1.map((vaule) => {
            console.log(vaule);
            return {
              Pagetitle: "School individual",
              H1Tag: vaule.school_name,
              Link: "https://bangalorestudy.com/school/" + vaule.school_slug,
              MetaTitle: vaule.meta_title,
              MetaDescription: vaule.meta_description,
            };
          });

          //   const response = getPagingData(data, page, limit);

          return finaldata;
          //   const response = getPagingData(data, page, limit);

          // return data;
        })
        .catch((err) => {
          //  data.errors.topcollege = "No top college found";
        });
    } catch {
      //data.errors.topcollege = "No top college found";
    }
  }

  res.status(200).send({
    status: 1,
    message: "success",
    data: data,
  });
};

exports.uploadpdf = async (req, res) => {
  console.log(req.body);
  try {
    if (req.files && req.files.pdf) {
      let avatar = req.files.pdf;
      console.log(avatar);

      let filename = avatar.name;
      console.log(filename);

      let IsUpload = avatar.mv("./storage/pdf/" + filename);
      console.log(IsUpload, "d");
    }

    res.status(200).send({
      status: 1,
      message: "Data Save Successfully",
    });
  } catch (error) {
    return res.status(400).send({
      message: "Unable to insert data",
      errors: error,
      status: 0,
    });
  }
};
