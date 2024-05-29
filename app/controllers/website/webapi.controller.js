require("dotenv").config();
const db = require("../../models");
const sendsearch = require("../../utility/Customsearch");
const state = db.state;
const news_categories = db.news_categories;
const news_and_events = db.news_and_events;
const stream = db.stream;
const countries = db.countries;
const enquiry = db.enquiry;
const college = db.college;
const school = db.school;

const banner = db.banner;
const abroadpages = db.abroadpages;
const Op = db.Sequelize.Op;
const exam = db.exam;
const blog = db.blog;
const courses = db.courses;
const college_stream = db.college_stream;
const videos = db.video_testimonials;
// const abroadpages = db.abroadpages;
const schoolboards = db.schoolboards;
const scholarships = db.scholarships;




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


exports.allcountries = async (req, res) => {
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
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  countries
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving countries.",
      });
    });
};

exports.allstates = async (req, res) => {
  const { page, size, searchtext, searchfrom, country_id, columnname, orderby } = req.query;

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
  let conditionCountryId = country_id ? { country_id: country_id } : null;
  conditionCountryId ? data_array.push(conditionCountryId) : null;

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  state
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "country_id",
      ],

      include: [
        {
          required: false,
          association: "city",
          attributes: ["id", "name"],

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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving states.",
      });
    });
};

exports.allstream_exams = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id", "exam_title", "slug"],
        where: { status: "Published" }
      }],
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving exams.",
      });
    });
};

exports.allabroadpages = async (req, res) => {
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
  let data_array = [];


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  abroadpages
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving abroad pages.",
      });
    });
};



exports.allstreams = async (req, res) => {
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
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving streams.",
      });
    });
};

exports.allcourses = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  courses
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "slug",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving courses.",
      });
    });
};



exports.searchbarhome = async (req, res) => {
  try {
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

    let data_array = [{ status: "Published" }];
    var condition = sendsearch.customseacrh(searchtext, searchfrom);
    console.log(condition, "condition");
    condition ? data_array.push(condition) : null;

    const { limit, offset } = getPagination(page, size);
    const collegedata = await college.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug"],
      order: [orderconfig],
      limit,
      offset
    });
    const schooldata = await school.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug"],
      order: [orderconfig],
      limit,
      offset
    });

    const responseData = [];

    if (collegedata.count > 0) {
      responseData.push({
        type: "collegedata",
        data: collegedata.rows
      });
    }

    if (schooldata.count > 0) {
      responseData.push({
        type: "schooldata",
        data: schooldata.rows
      });
    }

    res.status(200).send({
      status: 1,
      message: "success",
      data: responseData,
    });

  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving streams.",
    });
  }
};

exports.enquiry = async (req, res) => {
  try {
    // Validate input data
    const { name, email, contact_number, location, course_in_mind, college_name, school_name, description, current_url } = req.body;



    // Create enquiry
    const enquiryDetails = await enquiry.create({
      name,
      email,
      contact_number: contact_number || null,
      location: location || null,
      course_in_mind: course_in_mind || null,
      college_name: college_name || null,
      school_name: school_name || null,
      description: description || null,
      current_url: current_url || null,
    });

    res.status(200).send({
      status: 1,
      message: "Enquiry created successfully",
      enquiryDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 0,
      message: "An error occurred while processing your request",
      error: error.message,
    });
  };
};

exports.allbanners = async (req, res) => {
  try {
    const { page, size, searchtext, searchfrom, columnname, orderby, promo_banner } = req.query;

    var column = columnname || "id";
    var order = orderby || "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (myArray.length > 1) {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [[table, column], order];
    }

    let data_array = [{ status: "Published" }];
    let conditionarray = [];

    if (promo_banner) {
      conditionarray.push({ promo_banner: promo_banner });
    }
    const condition = sendsearch.customseacrh(searchtext, searchfrom);
    if (condition) {
      data_array.push(condition);
    }

    const { limit, offset } = getPagination(page, size);
    const data = await banner.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray)
      },
      attributes: ["id", "title", "link", "image"],
      order: [orderconfig],
      limit,
      offset
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
            "Some error occurred while retrieving banners.",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving banners.",
    });
  }
};

exports.newsandblogs = async (req, res) => {
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

  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) {
    data_array.push(condition);
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const blogsPromise = blog.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug", "meta_description","created_at"],
      order: [orderconfig],
      limit,
      offset
    });

    const newsPromise = news_and_events.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "slug", "meta_description","created_at"],
      order: [orderconfig],
      limit,
      offset
    });

    const [blogsData, newsData] = await Promise.all([blogsPromise, newsPromise]);

    const blogsResponse = getPagingData(blogsData, page, limit);
    const newsResponse = getPagingData(newsData, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      blogs: {
        totalItems: blogsResponse.totalItems,
        currentPage: blogsResponse.currentPage,
        totalPages: blogsResponse.totalPages,
        data: blogsResponse.finaldata
      },
      news: {
        totalItems: newsResponse.totalItems,
        currentPage: newsResponse.currentPage,
        totalPages: newsResponse.totalPages,
        data: newsResponse.finaldata
      }
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving blogs and news."
    });
  }
};

exports.exploreCollege = async (req, res) => {
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
  let data_array = [];

  var condition = searchtext && searchfrom ? { [searchfrom]: { [Sequelize.Op.like]: `%${searchtext}%` } } : null;
  if (condition) data_array.push(condition);

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await stream.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "logo"],
      include: [
        {
          required: false,
          association: "clgstreamm",
          attributes: ["college_id"],
        },
      ],
      order: [orderconfig],
      limit,
      offset
    });

    const response = getPagingData(data, page, limit);


    const finaldataWithCollegeCounts = response.finaldata.map(item => {
      const uniqueColleges = new Set(item.clgstreamm.map(clg => clg.college_id));
      return {
        ...item.dataValues,
        uniqueCollegeCount: uniqueColleges.size
      };
    });

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: finaldataWithCollegeCounts,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore colleges."
    });
  }
};

exports.exploreexam = async (req, res) => {
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
  let data_array = [];

  var condition = searchtext && searchfrom ? { [searchfrom]: { [Sequelize.Op.like]: `%${searchtext}%` } } : null;
  if (condition) data_array.push(condition);

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await stream.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "logo"],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id", "exam_title"],
        where: { status: "Published" }
      }],
      order: [orderconfig],
      limit,
      offset
    });

    const response = getPagingData(data, page, limit);


    const finaldataWithexamCounts = response.finaldata.map(item => {
      const uniqueexam = new Set(item.exam.map(exm => exm.id));
      return {
        ...item.dataValues,
        uniqueCollegeCount: uniqueexam.size
      };
    });

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: finaldataWithexamCounts,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore exams."
    });
  }
};

exports.explorecourses = async (req, res) => {
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
  let data_array = [];

  var condition = searchtext && searchfrom ? { [searchfrom]: { [Sequelize.Op.like]: `%${searchtext}%` } } : null;
  if (condition) data_array.push(condition);

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await stream.findAndCountAll({
      where: data_array,
      attributes: ["id", "name", "logo"],
      include: [{
        required: false,
        association: "general_courses",
        attributes: ["id", "name", "slug"],
        where: { status: "Published" }
      }],
      order: [orderconfig],
      limit,
      offset
    });

    const response = getPagingData(data, page, limit);


    const finaldataWithcourseCounts = response.finaldata.map(item => {
      const uniquecourse = new Set(item.general_courses.map(exm => exm.stream_id));
      return {
        ...item.dataValues,
        uniqueCollegeCount: uniquecourse.size
      };
    });

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: finaldataWithcourseCounts,
      // data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving explore courses."
    });
  }
};

exports.allcolleges = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    country_id,
    state_id,
    city_id,
    type,
    college_type,
    is_associated,
    columnname,
    orderby,
    course_type,
    general_course_id,
    stream_id
  } = req.query;

  let column = columnname || "id";
  let order = orderby || "ASC";
  let orderconfig = [column, order];

  const myArray = column.split(".");
  if (myArray[1] !== undefined) {
    const table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let data_array = [];
  let conditionarray = [];

  if (is_associated) {
    conditionarray.push({ is_associated });
  }

  if (type) {
    conditionarray.push({ type });
  }

  if (college_type) {
    conditionarray.push({ college_type });
  }


  if (country_id) data_array.push({ country_id: JSON.parse(country_id) });
  if (state_id) data_array.push({ state_id: JSON.parse(state_id) });
  if (city_id) data_array.push({ city_id: JSON.parse(city_id) });


  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) data_array.push(condition);

  let include = [];

  if (course_type || general_course_id) {
    include.push({
      association: "courses",
      required: true,
      attributes: ["id", "general_course_id", "course_type"],
      where: {}
    });

    if (course_type) include[include.length - 1].where.course_type = course_type;
    if (general_course_id) include[include.length - 1].where.general_course_id = JSON.parse(general_course_id);
  }

  if (stream_id) {
    include.push({
      association: "collegestreams",
      required: true,
      attributes: ["id", "college_id", "stream_id"],
      where: {
        stream_id: JSON.parse(stream_id)
      }
    });
  }

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await college.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray),
      },
      attributes: ["id", "name", "city_id", "state_id", "address", "banner_image", "established", "college_type", "avg_rating"],
      include: [
        {
          required: false,
          association: "state",
          attributes: ["id", "name"],
        },
      ],
      order: [orderconfig],
      limit,
      offset,
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving colleges.",
    });
  }
};





exports.allvideos = async (req, res) => {
  try {
    const { page, size, searchtext, searchfrom, columnname, orderby } = req.query;

    var column = columnname || "id";
    var order = orderby || "ASC";
    var orderconfig = [column, order];

    const myArray = column.split(".");
    if (myArray.length > 1) {
      var table = myArray[0];
      column = myArray[1];
      orderconfig = [[table, column], order];
    }

    let data_array = [];
    let conditionarray = [];

    const condition = sendsearch.customseacrh(searchtext, searchfrom);
    if (condition) {
      data_array.push(condition);
    }

    const { limit, offset } = getPagination(page, size);
    const data = await videos.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray)
      },
      attributes: ["id", "name", "designation", "video_url"],
      order: [orderconfig],
      limit,
      offset
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
            "Some error occurred while retrieving videos.",
        });
      });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving videos.",
    });
  }
};

exports.collegefindOne = (req, res) => {
  const id = req.params.id;
  college.findByPk(id, {
    include: [


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
      {
        required: false,
        association: "collegestreams",
        attributes: ["id", "stream_id"],
        include: [
          {
            association: "clgstreams",
            attributes: ["id", "name"],
          },
        ],
      },
      {
        required: false,
        association: "collegeamenities",
        attributes: ["id", "amenitie_id"],
        include: [
          {
            association: "clgamenities",
            attributes: ["id", "amenities_name"],
          },
        ],
      },
      {
        required: false,
        association: "collegerecognitions",
        attributes: ["id", "recognition_id"],
        include: [
          {
            association: "clgrecognitions",
            attributes: ["id", "recognition_approval_name"],
          },
        ],
      },
      {
        required: false,
        association: "collegefaqs",
        attributes: ["id", "questions", "answers"],
      },
      {
        required: false,
        association: "clggallery",
        attributes: ["id", "image"],
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
          message: `Cannot find colleges with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving colleges with id=" + id,
      });
    });
};

exports.courses = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "general_courses",
        attributes: ["id", "name", "slug"],
        where: { status: "Published" }
      }],
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving courses.",
      });
    });
};

exports.coursefindone = (req, res) => {
  const id = req.params.id;
  courses
    .findByPk(id, {
      attributes: ['id', 'college_id', 'slug'],
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

exports.allschools = async (req, res) => {
  const {
    page,
    size,
    searchtext,
    searchfrom,
    country_id,
    state_id,
    city_id,
    columnname,
    orderby,
    school_type,
  } = req.query;

  let column = columnname || "id";
  let order = orderby || "ASC";
  let orderconfig = [column, order];

  const myArray = column.split(".");
  if (myArray[1] !== undefined) {
    const table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }

  let data_array = [];
  let conditionarray = [];

  if (school_type) {
    conditionarray.push({ school_type });
  }


  if (country_id) data_array.push({ country_id: JSON.parse(country_id) });
  if (state_id) data_array.push({ state_id: JSON.parse(state_id) });
  if (city_id) data_array.push({ city_id: JSON.parse(city_id) });


  const condition = sendsearch.customseacrh(searchtext, searchfrom);
  if (condition) data_array.push(condition);

  let include = [];

  const { limit, offset } = getPagination(page, size);

  try {
    const data = await school.findAndCountAll({
      where: {
        [Op.and]: data_array.concat(conditionarray),
      },
      attributes: ["id", "name", "city_id", "established", "icon"],
      include,
      order: [orderconfig],
      limit,
      offset,
    });

    const response = getPagingData(data, page, limit);

    res.status(200).send({
      status: 1,
      message: "success",
      totalItems: response.totalItems,
      currentPage: response.currentPage,
      totalPages: response.totalPages,
      data: response.finaldata,
    });
  } catch (err) {
    res.status(500).send({
      status: 0,
      message: err.message || "Some error occurred while retrieving schools.",
    });
  }
};

exports.schoolfindone = (req, res) => {
  const id = req.params.id;
  school
    .findByPk(id, {
      attributes: ['id', 'country_id', 'state_id', 'city_id', 'name', 'slug'],
      include: [
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
        {
          required: false,
          association: "schoolboard",
          attributes: ["id", "name"],
        },
        {
          required: false,
          association: "schoolamenities",
          attributes: ["id", "amenitie_id"],
          include: [
            {
              association: "schamenities",
              attributes: ["id", "amenities_name"],
            },
          ],
        },
        {
          required: false,
          association: "schoollevels",
          attributes: ["id"],
          include: [
            {
              association: "schlevelname",
              attributes: ["id", "name"],
            },
          ],
        },

        {
          required: false,
          association: "schgallery",
          attributes: ["id", "image"],
        },
        {
          required: false,
          association: "schfaqs",
          attributes: ["id", "questions", "answers"],
        },

      ],

    })
    .then((data) => {
      if (data) {

        res.status(200).send({
          status: 1,
          message: "Successfully retrieved",
          data: data,
        });
      } else {
        res.status(400).send({
          status: 0,
          message: `Cannot find school with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: err.message || "Error retrieving school with id=" + id,
      });
    });
};

exports.abroadpages = async (req, res) => {
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
  let data_array = [];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  abroadpages
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "country_id",
        "name",
        "slug",
      ],
      include: [
        {
          required: false,
          association: "country",
          attributes: ["id", "name"],
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving abroad pages.",
      });
    });
};

exports.abroadcollegefindone = (req, res) => {
  const id = req.params.id;
  abroadpages.findByPk(id, {
    attributes: ['id', 'country_id', 'name', 'slug', 'backgroundimage'],
    include: [
      {
        required: false,
        association: "country",
        attributes: ["id", "name"],
      },
      {
        required: false,
        association: "abroadpagefaqs",
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
          message: `Cannot find abroadpages with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving abroadpages with id=" + id,
      });
    });
};

exports.allentranceexams = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, } = req.query;

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


  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  stream
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
      ],
      include: [{
        required: false,
        association: "exam",
        attributes: ["id", "exam_title"],
        where: { status: "Published" }
      }],
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving exams.",
      });
    });
};

exports.findoneexam = (req, res) => {
  const id = req.params.id;
  exam.findByPk(id, {
    attributes: ['id', 'exam_title', 'slug'],
    include: [
      {
        required: false,
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
          message: `Cannot find exams with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving exams with id=" + id,
      });
    });
};

exports.news = async (req, res) => {
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
  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  news_and_events
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "banner_image",
        "meta_description",
        "created_at",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving news and events.",
      });
    });
};

exports.newsfindone = (req, res) => {
  const id = req.params.id;
  news_and_events
    .findByPk(id, {
      attributes: ['id', 'banner_image', 'meta_title', 'meta_description'],
      include: [
        {
          required: false,
          association: "newscategories",
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
          message: `Cannot find newsandevents with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message: "Error retrieving newsandevents with id=" + id,
      });
    });
};

exports.blogs = async (req, res) => {
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
  let data_array = [{ status: "Published" }];

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  blog
    .findAndCountAll({
      where: data_array, limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "banner_image",
        "meta_title",
        "meta_description",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving news and events.",
      });
    });
};

exports.blogfindone = (req, res) => {
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

exports.schoolboards = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, board_type } = req.query;

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
  let conditionarray = [];

  if (board_type) {
    conditionarray.push({ board_type });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  schoolboards
    .findAndCountAll({
      where: data_array.concat(conditionarray), limit, offset,
      attributes: [
        "id",
        "name",
        "board_type",
        "logo",
        "established",
        "gender",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving schoolboards.",
      });
    });
};

exports.schoolboardfindone = (req, res) => {
  const id = req.params.id;
  schoolboards.findByPk(id, {
    attributes: [
      "id",
      "name",
      "board_type",
      "logo",
      "established",
      "gender",
    ],
    include: [

      {
        required: false,
        association: "schoolboardfaqs",
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

exports.scholarships = async (req, res) => {
  const { page, size, searchtext, searchfrom, columnname, orderby, gender } = req.query;

  var column = columnname ? columnname : "id";
  var order = orderby ? orderby : "ASC";
  var orderconfig = [column, order];

  const myArray = column.split(".");
  if (typeof myArray[1] !== "undefined") {
    var table = myArray[0];
    column = myArray[1];
    orderconfig = [table, column, order];
  }
  let data_array = [{ status: "Published" }];
  let conditionarray = [];

  if (gender) {
    conditionarray.push({ gender });
  }

  var condition = sendsearch.customseacrh(searchtext, searchfrom);
  condition ? data_array.push(condition) : null;

  const { limit, offset } = getPagination(page, size);
  scholarships
    .findAndCountAll({
      where: data_array.concat(conditionarray), limit, offset,
      attributes: [
        "id",
        "name",
        "slug",
        "gender",
        "is_eligible",
        "logo",
        "meta_title",
        "meta_description",
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
        data: response.finaldata,
      });
    })
    .catch((err) => {
      res.status(500).send({
        status: 0,
        message:
          err.message ||
          "Some error occurred while retrieving scholarships.",
      });
    });
};

exports.scholarshipfindone = (req, res) => {
  const id = req.params.id;
  scholarships
    .findByPk(id, {
      attributes: [
        "id",
        "name",
        "slug",
        "gender",
        "is_eligible",
        "logo",
        "meta_title",
        "meta_description",
      ],
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