const { body, validationResult } = require("express-validator");

const db = require("../models");
const countries = db.countries;
const state = db.state;
const city = db.city;
const Amenities = db.amenities;
const schoolboards = db.schoolboards;
const school = db.school;
const stream = db.stream;
const substream = db.sub_stream;
const pages = db.page;
const banner = db.banner;
const college = db.college;
const collegestream = db.college_stream;
const generalcourse = db.general_course;
const stream_faq = db.stream_faq;
const courses = db.courses;
const abroadpages = db.abroadpages;
const landingpages = db.landing_pages;
const newscategories = db.news_categories;
const newsandevents = db.news_and_events;
const blog = db.blog;
const exam = db.exam;
const scholarlevels = db.scholar_levels;
const scholartypes = db.scholar_types;
const scholarships = db.scholarships;
const alljoblocation = db.all_job_locations;
const jobspositions = db.jobs_positions;
const joblocations = db.job_locations;
const jobsenquires = db.jobs_enquires;
const ourteams = db.our_teams;
const videotestimonials = db.video_testimonials;
const schoolboardrecognition = db.school_board_recognitions;
const recognition = db.recognition;
const reviews = db.reviews;
const review_replies = db.review_replies;
const users = db.users;



const accreditation = db.accreditation;
const area = db.area;


const enquiry = db.enquiry;
const management = db.management;

const author = db.author;
const categories = db.categories;

const review = db.review;
const Op = db.Sequelize.Op;
const affilition = db.affilition;


const companies = db.companies;

const schoollevel = db.schoollevel;

const polytechnic = db.polytechnic;
const polytechnictype = db.polytechnictype;
const user = db.user;
const reviewtokens = db.resettokens;
const groups = db.groups;
const testimonial = db.testimonial;
const videotestimonial = db.videotestimonial;
const team = db.team;
const studentform = db.studentform;
const jobvaccancies = db.jobvaccancies;
const redirecturl = db.redirecturl;
const promopage = db.promopage;


const upcoming_courses = db.upcoming_courses;
const eligibilities = db.eligibilities;
const salary = db.salary;
const fee = db.fees;
const gallery = db.gallery;
const job = db.job;
const abouts = db.abouts;
const services = db.services;


const abroadcountries = db.abroadcountries;
const abroad_universities = db.abroad_universities;
const youtubevideos = db.youtubevideos;


Validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 0,
      message: "failure",
      errors: errors.array(),
    });
  }
  next();
};

function checkField(fieldName, maxLength, model, requireUnique = false) {
  let validationChain = [];

  // Check if field exists and its length
  validationChain.push(
    body(fieldName)
      .exists({ checkFalsy: true })
      .withMessage(`${fieldName} is required`)
      .isLength({ max: maxLength })
      .withMessage(`${fieldName} should be less than ${maxLength} characters`)
  );

  // If uniqueness check is required, add custom validation
  if (requireUnique) {
    validationChain.push(
      body(fieldName)
        .custom((value) => {
          return model
            .findOne({
              where: {
                [fieldName]: value,
              },
            })
            .then((result) => {
              if (result) {
                return Promise.reject(`${fieldName} already in use`);
              } else {
                return true;
              }
            });
        })
    );
  }

  return validationChain;
}
function checkField_update(fieldName, maxLength, model, requireUnique = false) {

  let validationChain = [];

  // Check if field exists and its length
  validationChain.push(
    body(fieldName)
      .exists({ checkFalsy: true })
      .withMessage(`${fieldName} is required`)
      .isLength({ max: maxLength })
      .withMessage(`${fieldName} should be less than ${maxLength} characters`)
  );

  // If uniqueness check is required, add custom validation
  if (requireUnique) {
    validationChain.push(
      body(fieldName)
        .custom((value, { req }) => {
          // console.log(value);
          let id = req.body.id
          // console.log(req.body.id);
          return model
            .findOne({
              where: {
                [fieldName]: {
                  [Op.eq]: value,
                },
                id: {
                  [Op.not]: [id],
                },
              },

            })
            .then((result) => {
              if (result) {
                return Promise.reject(`${fieldName} already in use`);
              } else {
                return true;
              }
            });
        })
    );
  }

  return validationChain;
}
const validateIdRequired_id = (modelName, fieldName) => [
  
  body(fieldName)
    .exists({ checkFalsy: true })
    .withMessage(`${fieldName} is required`)
    .custom(async (value) => {
      const modelData = await modelName.findByPk(value);
      if (!modelData) {
        throw new Error(`${fieldName} does not exist`);
      }
    }),
];



const Test = [
  body("userName")
    .exists({ checkFalsy: true })
    .withMessage("User name is required")
    .isString()
    .withMessage("User name should be string"),
];



const RedirecturlSchema = [
  body("old_url")
    .exists({ checkFalsy: true })
    .withMessage(" old_url is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /dfewerfrew"
        );
      }
    }),
  checkField('old_url', 200, redirecturl, true),

  body("new_url")
    .exists({ checkFalsy: true })
    .withMessage("new_url name is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {

        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /defgrefijf"
        );
      }
    }),
  checkField('new_url', 200, redirecturl, true),

  body("status_code")
    .exists({ checkFalsy: true })
    .withMessage(" status_code is required"),
];

const RedirecturlSchemaUpdate = [
  ...validateIdRequired_id(redirecturl, "id"),
  body("old_url")
    .exists({ checkFalsy: true })
    .withMessage(" old_url is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /dfewerfrew"
        );
      }
    }),

  body("new_url")
    .exists({ checkFalsy: true })
    .withMessage("new_url name is required")
    .custom((value) => {
      let firstChar = value.charAt(0);
      if (firstChar === "/") {
        return true;
        // First character is a slash
      } else {
        return Promise.reject(
          "Enter valid URL must be contail first char / like: /defgrefijf"
        );
      }
    }),
  checkField_update('old_url', 200, redirecturl, true),



  body("status_code")
    .exists({ checkFalsy: true })
    .withMessage(" status_code is required"),

];

const recognitionSchema = [
  checkField('recognition_approval_name', 150, recognition, true),


  body("recognition_approval_full_name")
    .exists({ checkFalsy: true })
    .withMessage("full name is required"),

  body("recognition_approval_slug")
    .exists({ checkFalsy: true })
    .withMessage("recognition_approval_slug is required"),


];
const recognitionUpdateSchema = [
  ...validateIdRequired_id(recognition, "id"),
  checkField_update('recognition_approval_name', 150, recognition, true),



  body("recognition_approval_full_name")
    .exists({ checkFalsy: true })
    .withMessage("recognition_approval_full_name is required")
    .isLength({ max: 150 })
    .withMessage("recognition_approval_full_name be less than 150 character"),

  body("recognition_approval_slug")
    .exists({ checkFalsy: true })
    .withMessage("recognition_approval_slug is required")
    .isLength({ max: 150 })
    .withMessage("recognition_approval_slug be less than 150 character"),


];
const countrySchema = [
  checkField('name', 150, countries, true),
];

const countriesUpdateSchema = [
  ...validateIdRequired_id(countries, "id"),
  checkField_update('name', 150, countries, true),

];

const stateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("state name is required")
    .isLength({ max: 150 })
    .withMessage("state name should be less than 150 character"),
  checkField('name', 150, state, true),

  ...validateIdRequired_id(countries, "country_id"),

];

const updatestateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("state name is required")
    .isLength({ max: 150 })
    .withMessage("state name should be less than 150 character"),
  checkField_update('name', 150, state, true),

  ...validateIdRequired_id(state, "id"),
  ...validateIdRequired_id(countries, "id"),


];

const citySchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("city name is required")
    .isLength({ max: 150 })
    .withMessage("city name should be less than 150 character"),
  ...validateIdRequired_id(state, "state_id"),
];

const cityUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("city name is required")
    .isLength({ max: 150 })
    .withMessage("city name should be less than 150 character"),
  ...validateIdRequired_id(city, "id"),
  ...validateIdRequired_id(state, "state_id"),

];

const AmenitiesSchema = [
  checkField('amenities_name', 150, Amenities, true),
  body("amenities_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character"),

];
const AmenitiesSchemaUpdate = [
  ...validateIdRequired_id(Amenities, "id"),
  checkField_update('amenities_name', 150, Amenities, true),
  body("amenities_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")

];

const schoolboardSchema = [
  checkField('name', 150, schoolboards, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),
];

const schoolboardUpdateSchema = [
  ...validateIdRequired_id(schoolboards, "id"),
  checkField_update('name', 150, schoolboards, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),
];


const schoolSchema = [
  checkField('name', 150, school, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),
  ...validateIdRequired_id(schoolboards, "school_board_id"),

];

const schoolUpdateSchema = [
  ...validateIdRequired_id(school, "id"),
  checkField_update('name', 150, school, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 }),
  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),
  ...validateIdRequired_id(schoolboards, "school_board_id"),


];

const StreamSchema = [
  checkField('name', 150, stream, true),
  checkField('listing_order', 150, stream, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  body("h1_title")
    .exists({ checkFalsy: true })
    .withMessage("h1 title is required")
    .isLength({ max: 150 })
    .withMessage("h1 title should be less than 150 character"),
];

const StreamSchemaUpdate = [
  ...validateIdRequired_id(stream, "id"),
  checkField_update('name', 150, stream, true),
  checkField_update('listing_order', 150, stream, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  body("h1_title")
    .exists({ checkFalsy: true })
    .withMessage("h1 title is required")
    .isLength({ max: 150 })
    .withMessage("h1 title should be less than 150 character"),

];

const SubStreamSchema = [
  checkField('sub_stream_name', 150, substream, true),

  body("sub_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("sub stream slug is required")
    .isLength({ max: 150 })
    .withMessage("sub stream slug should be less than 150 character"),

  ...validateIdRequired_id(stream, "stream_id"),

];

const SubStreamSchemaUpdate = [
  ...validateIdRequired_id(substream, "id"),

  checkField_update('sub_stream_name', 150, substream, true),

  body("sub_stream_slug")
    .exists({ checkFalsy: true })
    .withMessage("sub stream slug is required")
    .isLength({ max: 150 })
    .withMessage("sub stream slug should be less than 150 character"),

  ...validateIdRequired_id(stream, "stream_id"),
];

const PageSchema = [
  checkField('url', 250, pages, true),
];

const PageUpdateSchema = [
  ...validateIdRequired_id(pages, "id"),
  checkField_update('url', 250, pages, true),

];

const bannerSchema = [
  checkField('title', 150, banner, true),
  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),

  body("status")
    .exists({ checkFalsy: true })
    .withMessage("status is required")
    .isLength({ max: 150 })
    .withMessage("status should be less than 150 character"),


];

const bannerUpdateSchema = [
  ...validateIdRequired_id(banner, "id"),
  checkField_update('title', 150, banner, true),
  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),
];

const CollegeSchema = [
  checkField('name', 150, college, true),
  checkField('slug', 150, college, true),
  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isIn(["college", "university", "board"])
    .withMessage(
      "Invalid plan Name. Must be 'college', 'university' or 'board'"
    ),
  body("college_type")
    .notEmpty()
    .withMessage("college_type is required")
    .isIn(['Public', 'Deemed', 'Private', 'Government', 'Autonomous'])
    .withMessage(
      "Invalid college_type Name. Must be 'Public','Deemed','Private','Government','Autonomous'"
    ),

  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),

];

const CollegeUpdateSchema = [
  ...validateIdRequired_id(college, "id"),

  checkField_update('name', 150, college, true),
  checkField_update('slug', 150, college, true),
  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isIn(["college", "university", "board"])
    .withMessage(
      "Invalid plan Name. Must be 'college', 'university' or 'board'"
    ),
  body("college_type")
    .notEmpty()
    .withMessage("college_type is required")
    .isIn(['Public', 'Deemed', 'Private', 'Government', 'Autonomous'])
    .withMessage(
      "Invalid college_type Name. Must be 'Public','Deemed','Private','Government','Autonomous'"
    ),

  ...validateIdRequired_id(countries, "country_id"),
  ...validateIdRequired_id(state, "state_id"),
  ...validateIdRequired_id(city, "city_id"),


];

const GeneralcoursesSchema = [
  checkField('name', 150, generalcourse, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
  ...validateIdRequired_id(stream, "stream_id"),
  ...validateIdRequired_id(substream, "sub_streams_id"),


];

const GeneralcoursesSchemaupdate = [
  ...validateIdRequired_id(generalcourse, "id"),
  checkField_update('name', 150, generalcourse, true),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
  ...validateIdRequired_id(stream, "stream_id"),
  ...validateIdRequired_id(substream, "sub_streams_id"),

];

const stream_faqSchema = [
  ...validateIdRequired_id(stream, "stream_id"),
];

const stream_faqSchemaupdate = [
  ...validateIdRequired_id(stream_faq, "id"),

  ...validateIdRequired_id(stream, "stream_id"),

];

const coursesSchema = [
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(college, "college_id"),
  ...validateIdRequired_id(generalcourse, "general_course_id"),
];

const coursesUpdateSchema = [
  ...validateIdRequired_id(courses, "id"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(college, "college_id"),
  ...validateIdRequired_id(generalcourse, "general_course_id"),
];

const abroadpageSchema = [
  checkField('name', 150, abroadpages, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(countries, "country_id"),

];

const abroadpageUpdateSchema = [
  ...validateIdRequired_id(abroadpages, "id"),

  checkField_update('name', 150, abroadpages, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 }),

  ...validateIdRequired_id(countries, "country_id"),


];


const landingpageSchema = [
  checkField('name', 250, landingpages, true),

  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),
];

const landingpageUpdateSchema = [
  ...validateIdRequired_id(landingpages, "id"),

  checkField_update('name', 250, landingpages, true),

  body("link")
    .exists({ checkFalsy: true })
    .withMessage("link is required")
    .isLength({ max: 150 })
    .withMessage("link should be less than 150 character"),


];

const newscategoriesSchema = [
  checkField('name', 250, newscategories, true),

];

const newscategoriesUpdateSchema = [
  ...validateIdRequired_id(newscategories, "id"),

  checkField_update('name', 250, newscategories, true),
];


const newsandeventsSchema = [
  checkField('name', 250, newsandevents, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
];

const newsandeventsUpdateSchema = [
  ...validateIdRequired_id(newsandevents, "id"),

  checkField_update('name', 250, newsandevents, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
];

const blogSchema = [
  checkField('name', 250, blog, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
];

const blogUpdateSchema = [
  ...validateIdRequired_id(blog, "id"),

  checkField_update('name', 250, blog, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),
];

const examSchema = [
  checkField('exam_title', 250, exam, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(stream, "stream_id"),
];

const examUpdateSchema = [
  ...validateIdRequired_id(exam, "id"),

  checkField_update('exam_title', 250, exam, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(stream, "stream_id"),
];

const scholarlevelSchema = [
  checkField('name', 250, scholarlevels, true),
];

const scholarlevelUpdateSchema = [
  ...validateIdRequired_id(scholarlevels, "id"),

  checkField_update('name', 250, scholarlevels, true),
];

const scholartypeSchema = [
  checkField('name', 250, scholartypes, true),
];

const scholartypeUpdateSchema = [
  ...validateIdRequired_id(scholartypes, "id"),

  checkField_update('name', 250, scholartypes, true),
];

const scholarshipSchema = [
  checkField('name', 250, scholarships, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(scholarlevels, "level_id"),
  ...validateIdRequired_id(scholartypes, "type_id"),
  ...validateIdRequired_id(countries, "country_id"),

];

const scholarshipUpdateSchema = [
  ...validateIdRequired_id(scholarships, "id"),

  checkField_update('name', 250, scholarships, true),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  ...validateIdRequired_id(scholarlevels, "level_id"),
  ...validateIdRequired_id(scholartypes, "type_id"),
  ...validateIdRequired_id(countries, "country_id"),

];

const alljoblocationSchema = [
  checkField('name', 250, alljoblocation, true),
];

const alljoblocationUpdateSchema = [
  ...validateIdRequired_id(alljoblocation, "id"),

  checkField_update('name', 250, alljoblocation, true),
];

const jobspositionsSchema = [
  checkField('name', 250, alljoblocation, true),
];

const jobspositionsUpdateSchema = [
  ...validateIdRequired_id(jobspositions, "id"),

  checkField_update('name', 250, jobspositions, true),
];

const joblocationsSchema = [
  ...validateIdRequired_id(alljoblocation, "job_location_id"),
  ...validateIdRequired_id(jobspositions, "jobs_position_id"),

];

const joblocationsUpdateSchema = [
  ...validateIdRequired_id(joblocations, "id"),

  ...validateIdRequired_id(alljoblocation, "job_location_id"),
  ...validateIdRequired_id(jobspositions, "jobs_position_id"),

];

const jobsenquiresSchema = [
  checkField('name', 250, jobsenquires, true),

  ...validateIdRequired_id(alljoblocation, "job_location_id"),
  ...validateIdRequired_id(jobspositions, "jobs_position_id"),
];

const jobsenquiresUpdateSchema = [
  ...validateIdRequired_id(jobsenquires, "id"),

  checkField_update('name', 250, jobsenquires, true),

  ...validateIdRequired_id(alljoblocation, "job_location_id"),
  ...validateIdRequired_id(jobspositions, "jobs_position_id"),
];

const ourteamsSchema = [
  checkField('name', 250, ourteams, true),
];

const ourteamsUpdateSchema = [
  ...validateIdRequired_id(ourteams, "id"),
  checkField_update('name', 250, ourteams, true),

];

const videotestimonialsSchema = [
  checkField('title', 250, videotestimonials, true),
  checkField('name', 250, videotestimonials, true),
];

const videotestimonialsUpdateSchema = [
  ...validateIdRequired_id(videotestimonials, "id"),

  checkField_update('title', 250, videotestimonials, true),
  checkField_update('name', 250, videotestimonials, true),

];

const schoolboardrecognitionSchema = [
  ...validateIdRequired_id(recognition, "recognition_id"),
  ...validateIdRequired_id(schoolboards, "school_board_id"),

];

const schoolboardrecognitionUpdateSchema = [
  ...validateIdRequired_id(schoolboardrecognition, "id"),

  ...validateIdRequired_id(recognition, "recognition_id"),
  ...validateIdRequired_id(schoolboards, "school_board_id"),

];

const reviewSchema = [
  ...validateIdRequired_id(users, "user_id"),
  ...validateIdRequired_id(college, "college_id"),
  ...validateIdRequired_id(courses, "course_id"),
  ...validateIdRequired_id(school, "school_id"),
  ...validateIdRequired_id(schoolboards, "school_board_id"),


];

const reviewUpdateSchema = [
  ...validateIdRequired_id(reviews, "id"),

  

];

const reviewrepliesSchema = [
  checkField('content', 250, review_replies, true),
  ...validateIdRequired_id(users, "user_id"),
  ...validateIdRequired_id(reviews, "review_id"),

];

const reviewrepliesUpdateSchema = [
  ...validateIdRequired_id(review_replies, "id"),

  checkField_update('content', 250, review_replies, true),
  ...validateIdRequired_id(users, "user_id"),
  ...validateIdRequired_id(reviews, "review_id"),

];









const areaSchema = [
  body("area_name")
    .exists({ checkFalsy: true })
    .withMessage("area name is required")
    .isLength({ max: 150 })
    .withMessage("area name should be less than 150 character"),

  body("area_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return area
        .findOne({
          where: {
            area_slug: value,
          },
        })
        .then((area) => {
          if (area) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const abroaduniversitiesSchema = [
  body("university_name")
    .exists({ checkFalsy: true })
    .withMessage("university name is required")
    .isLength({ max: 150 })
    .withMessage("university should be less than 150 character"),

  body("country_id")
    .exists({ checkFalsy: true })
    .withMessage("country Id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("country Id Not exist");
          }
        });
    }),
];

const abroaduniversitiesUpdateSchema = [
  body("university_name")
    .exists({ checkFalsy: true })
    .withMessage("universite name is required")
    .isLength({ max: 150 })
    .withMessage("university name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return abroad_universities
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroad_universities) => {
          if (abroad_universities) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("university Does not exist");
          }
        });
    }),
  body("country_id")
    .exists({ checkFalsy: true })
    .withMessage("country Id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("country Id Not exist");
          }
        });
    }),
];

const areaUpdateSchema = [
  body("area_name")
    .exists({ checkFalsy: true })
    .withMessage("area name is required")
    .isLength({ max: 150 })
    .withMessage("area name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Does not exist");
          }
        });
    }),

  body("area_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return area
        .findOne({
          where: {
            area_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((area) => {
          if (area) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const managementUpdateSchema = [
  body("management_name")
    .exists({ checkFalsy: true })
    .withMessage("management_nameis required")
    .isLength({ max: 150 })
    .withMessage("management_name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return management
        .findOne({
          where: {
            id: value,
          },
        })
        .then((management) => {
          if (management) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("management Does not exist");
          }
        });
    }),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return management
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((management) => {
          if (management) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const managementSchema = [
  body("management_name")
    .exists({ checkFalsy: true })
    .withMessage("management_name is  required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return management
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((management) => {
          if (management) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];



const enquirySchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is  required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("email").exists({ checkFalsy: true }).withMessage("Email is required"),
  body("contact_number")
    .exists({ checkFalsy: true })
    .withMessage("contact_numberr is required"),
  body("current_url")
    .exists({ checkFalsy: true })
    .withMessage("url is required")
    .isLength({ max: 300 })
    .withMessage("url should be less than 300 character"),


];

const authorSchema = [
  body("author_name")
    .exists({ checkFalsy: true })
    .withMessage("author name name is required")
    .isLength({ max: 150 })
    .withMessage("author name should be less than 150 character"),
];

const authorUpdateSchema = [
  body("author_name")
    .exists({ checkFalsy: true })
    .withMessage("author name name is required")
    .isLength({ max: 150 })
    .withMessage("author name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return author
        .findOne({
          where: {
            id: value,
          },
        })
        .then((author) => {
          if (author) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Author Does not exist");
          }
        });
    }),
];

const abroadcountriesSchema = [
  body("country_name")
    .exists({ checkFalsy: true })
    .withMessage("country name is required")
    .isLength({ max: 150 })

    .withMessage("country name should be less than 150 character")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            country_name: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return Promise.reject("Country name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const abroadcountriesUpdateSchema = [
  body("country_name")
    .exists({ checkFalsy: true })
    .withMessage("Country  name is required")
    .isLength({ max: 150 })
    .withMessage("Country name should be less than 150 character")
    .custom((value, { req }) => {
      return abroadcountries
        .findOne({
          where: {
            country_name: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return Promise.reject("country  name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return abroadcountries
        .findOne({
          where: {
            id: value,
          },
        })
        .then((abroadcountries) => {
          if (abroadcountries) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Countries Does not exist");
          }
        });
    }),
];

const categoriesSchema = [
  body("category_name")
    .exists({ checkFalsy: true })
    .withMessage("category name is required")
    .isLength({ max: 150 })

    .withMessage("category name should be less than 150 character")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            category_name: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return Promise.reject("category name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const categoriesUpdateSchema = [
  body("category_name")
    .exists({ checkFalsy: true })
    .withMessage("category  name is required")
    .isLength({ max: 150 })
    .withMessage("category name should be less than 150 character")
    .custom((value, { req }) => {
      return categories
        .findOne({
          where: {
            category_name: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((categories) => {
          if (categories) {
            return Promise.reject("category  name already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return categories
        .findOne({
          where: {
            id: value,
          },
        })
        .then((categories) => {
          if (categories) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("category Does not exist");
          }
        });
    }),
];






const polytechnicSchema = [
  body("polytechnic_name")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic  name is required")
    .isLength({ max: 150 })
    .withMessage("polytechnic  name should be less than 150 character"),
  // body("genders_accepted")
  //   .exists({ checkFalsy: true })
  //   .withMessage("genders accepted is required"),
  body("polytechnic_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug name is required")
    .isLength({ max: 150 })
    .withMessage("slug name should be less than 150 character")
    .custom((value) => {
      return polytechnic
        .findOne({
          where: {
            polytechnic_slug: value,
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("area_id")
    .exists({ checkFalsy: true })
    .withMessage("area Id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("area Id Not exist");
          }
        });
    }),

  body("city_id")
    .exists({ checkFalsy: true })
    .withMessage("city Id is required")
    .custom((value) => {
      return city
        .findOne({
          where: {
            id: value,
          },
        })
        .then((city) => {
          if (city) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("city Id Not exist");
          }
        });
    }),
  body("polytechnic_type_id")
    .exists({ checkFalsy: true })
    .withMessage("Polytechnic type is required")
    .custom((value) => {
      return polytechnictype
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnictype) => {
          if (polytechnictype) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Polytechnic type Not exist");
          }
        });
    }),
];
const polytechnicUpdateSchema = [
  body("polytechnic_name")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic  name is required")
    .isLength({ max: 150 })
    .withMessage("polytechnic  name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return polytechnic
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("polytechnic Does not exist");
          }
        });
    }),

  body("polytechnic_slug")
    .exists({ checkFalsy: true })
    .withMessage("slug is required")
    .isLength({ max: 150 })
    .withMessage("slug should be less than 150 character")
    .custom((value, { req }) => {
      return polytechnic
        .findOne({
          where: {
            polytechnic_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((polytechnic) => {
          if (polytechnic) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("area_id")
    .exists({ checkFalsy: true })
    .withMessage("area Id is required")
    .custom((value) => {
      return area
        .findOne({
          where: {
            id: value,
          },
        })
        .then((area) => {
          if (area) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("area Id Not exist");
          }
        });
    }),

  body("city_id")
    .exists({ checkFalsy: true })
    .withMessage("city Id is required")
    .custom((value) => {
      return city
        .findOne({
          where: {
            id: value,
          },
        })
        .then((city) => {
          if (city) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("city Id Not exist");
          }
        });
    }),
  body("polytechnic_type_id")
    .exists({ checkFalsy: true })
    .withMessage("polytechnic type is required")
    .custom((value) => {
      return polytechnictype
        .findOne({
          where: {
            id: value,
          },
        })
        .then((polytechnictype) => {
          if (polytechnictype) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("School type  Not exist");
          }
        });
    }),
];

// const reviewSchema = [
//   body("userrating")
//     .exists({ checkFalsy: true })
//     .withMessage("userrating is required")
//     .isFloat({ min: 0, max: 5 })
//     .withMessage("userrating in between 0 to 5"),

//   body("content")
//     .exists({ checkFalsy: true })
//     .withMessage("review  name is required"),

//   body("type").exists({ checkFalsy: true }).withMessage("type  is required"),

//   body("is_approved")
//     .exists({ checkFalsy: true })
//     .withMessage("is_approved  is required"),

//   body("user_id")
//     .exists({ checkFalsy: true })
//     .withMessage("User Id is required")
//     .custom((value) => {
//       return user
//         .findOne({
//           where: {
//             id: value,
//           },
//         })
//         .then((user) => {
//           if (user) {
//             return true;
//           } else {
//             // Indicates the success of this synchronous custom validator
//             return Promise.reject("User Id Not exist");
//           }
//         });
//     }),

//   body("item_id")
//     .exists({ checkFalsy: true })
//     .withMessage("CollegeAndUniversity Id is required")
//     .custom((value) => {
//       return CollegeAndUniversity.findOne({
//         where: {
//           id: value,
//         },
//       }).then((CollegeAndUniversity) => {
//         if (CollegeAndUniversity) {
//           return true;
//         } else {
//           // Indicates the success of this synchronous custom validator
//           return Promise.reject("CollegeAndUniversity Id Not exist");
//         }
//       });
//     }),
// ];
// const reviewUpdateSchema = [
//   // body("userrating")
//   //   .exists({ checkFalsy: true })
//   //   .withMessage("userrating is required")
//   //   .isFloat({ min: 0, max: 5 })
//   //   .withMessage("userrating in between 0 to 5"),

//   // body("content")
//   //   .exists({ checkFalsy: true })
//   //   .withMessage("content  is required"),

//   // body("type").exists({ checkFalsy: true }).withMessage("type  is required"),

//   // body("is_approved")
//   //   .exists({ checkFalsy: true })
//   //   .withMessage("is_approved  is required"),

//   body("id")
//     .exists({ checkFalsy: true })
//     .withMessage("id is required")
//     .custom((value) => {
//       return review
//         .findOne({
//           where: {
//             id: value,
//           },
//         })
//         .then((review) => {
//           if (review) {
//             return true;
//           } else {
//             // Indicates the success of this synchronous custom validator
//             return Promise.reject("review Does not exist");
//           }
//         });
//     }),

//   // body("user_id")
//   //   .exists({ checkFalsy: true })
//   //   .withMessage("User Id is required")
//   //   .custom((value) => {
//   //     return user
//   //       .findOne({
//   //         where: {
//   //           id: value,
//   //         },
//   //       })
//   //       .then((user) => {
//   //         if (user) {
//   //           return true;
//   //         } else {
//   //           // Indicates the success of this synchronous custom validator
//   //           return Promise.reject("User Id Not exist");
//   //         }
//   //       });
//   //   }),

//   // body("item_id")
//   //   .exists({ checkFalsy: true })
//   //   .withMessage("item Id is required")
//   //   .custom((value) => {
//   //     return CollegeAndUniversity.findOne({
//   //       where: {
//   //         id: value,
//   //       },
//   //     }).then((CollegeAndUniversity) => {
//   //       if (CollegeAndUniversity) {
//   //         return true;
//   //       } else {
//   //         // Indicates the success of this synchronous custom validator
//   //         return Promise.reject("CollegeAndUniversity Id Not exist");
//   //       }
//   //     });
//   //   }),
// ];

const reviewchangestatusSchema = [
  // body("id")
  // .exists({ checkFalsy: true })
  // .withMessage("ID  is required"),

  body("is_approved")
    .exists({ checkFalsy: true })
    .withMessage("is_approved  is required"),

  body("ids")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return review
        .count({
          where: {
            id: JSON.parse(value),
          },
        })
        .then((count) => {
          if (count != JSON.parse(value).length) {
            return Promise.reject("id not exists type Not exist");
          }
          return true;
        });
    }),
];

const affilitionSchema = [
  body("other_affiliations_name")
    .exists({ checkFalsy: true })
    .withMessage("affilation name is required")
    .isLength({ max: 150 })
    .withMessage("affilationname should be less than 150 character"),

  body("other_affiliations_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return affilition
        .findOne({
          where: {
            other_affiliations_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((affilition) => {
          if (affilition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];



const affilitionUpdateSchema = [
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return affilition
        .findOne({
          where: {
            id: value,
          },
        })
        .then((affilition) => {
          if (affilition) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("affilition Does not exist");
          }
        });
    }),

  body("other_affiliations_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return affilition
        .findOne({
          where: {
            other_affiliations_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((affilition) => {
          if (affilition) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];





const CompanyUpdateSchema = [
  body("id").exists({ checkFalsy: true }).withMessage("id is required"),
  body("companies_name")
    .exists({ checkFalsy: true })
    .withMessage("companies_name is required")
    .isLength({ max: 150 })
    .withMessage("companies_name should be less than 150 character"),

  body("companies_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return companies
        .findOne({
          where: {
            companies_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const CompanySchema = [
  body("companies_name")
    .exists({ checkFalsy: true })
    .withMessage("companies_name is required")
    .isLength({ max: 150 })
    .withMessage("companies_name should be less than 150 character"),

  body("companies_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return companies
        .findOne({
          where: {
            companies_slug: value,
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const upcoming_coursesSchema = [
  body("course_name")
    .exists({ checkFalsy: true })
    .withMessage("course_name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return upcoming_courses
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((upcoming_courses) => {
          if (upcoming_courses) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];
const upcoming_coursesUpdateSchema = [
  body("course_name")
    .exists({ checkFalsy: true })
    .withMessage("course_name is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return upcoming_courses
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((upcoming_courses) => {
          if (upcoming_courses) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];



const eligibilitySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const eligibilityUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const salarySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const salaryUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const feeSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),

  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("note").exists({ checkFalsy: true }).withMessage("note is required"),

  body("total_amount")
    .exists({ checkFalsy: true })
    .withMessage("total amount is required"),
];
const feeUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),

  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("title").exists({ checkFalsy: true }).withMessage("title is required"),

  body("note").exists({ checkFalsy: true }).withMessage("note is required"),

  body("total_amount")
    .exists({ checkFalsy: true })
    .withMessage("total amount is required"),
];

const gallerySchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const galleryUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];

const jobSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required"),
];
const jobUpdateSchema = [
  body("course_id")
    .exists({ checkFalsy: true })
    .withMessage("coourse_id is required")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return companies
        .findOne({
          where: {
            companies_slug: value,
          },
        })
        .then((companies) => {
          if (companies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const userSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name must be at least 20 characters."),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Enter valid email address."),

  body("mobile").notEmpty().withMessage("mobile cannot be empty."),

  body("password").isLength({
    min: 6,
  }),

  body("confirmpassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];
const userforgotpassword = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .custom((value) => {
      return user
        .findOne({
          where: {
            email: value,
          },
        })
        .then((user) => {
          if (user) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Email Does not exist");
          }
        });
    }),
];

const userforgotpasswordnew = [
  body("email")
    .exists({ checkFalsy: true })
    .withMessage("email is required")
    .custom((value) => {
      return reviewtokens
        .findOne({
          where: {
            email: value,
          },
        })
        .then((reviewtokens) => {
          if (reviewtokens) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Email Does not exist");
          }
        });
    }),
  body("token")
    .exists({ checkFalsy: true })
    .withMessage("token is required")
    .custom((value) => {
      return reviewtokens
        .findOne({
          where: {
            token: value,
          },
        })
        .then((reviewtokens) => {
          if (reviewtokens) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("token Does not exist");
          }
        });
    }),
  body("password").isLength({
    min: 6,
  }),

  // body("confirmpassword").custom((value, { req }) => {
  //   if (value !== req.body.password) {
  //     throw new Error("Password confirmation does not match password");
  //   }

  //   // Indicates the success of this synchronous custom validator
  //   return true;
  // }),
];

const groupsSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage(" title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("group")
    .exists({ checkFalsy: true })
    .withMessage("group name is required")
    .isLength({ max: 150 })
    .withMessage("group should be less than 150 character"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
];
const groupsUpdateSchema = [
  body("title")
    .exists({ checkFalsy: true })
    .withMessage(" title is required")
    .isLength({ max: 150 })
    .withMessage("title should be less than 150 character"),

  body("group")
    .exists({ checkFalsy: true })
    .withMessage("group name is required")
    .isLength({ max: 150 })
    .withMessage("group should be less than 150 character"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return groups
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((groups) => {
          if (groups) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return groups
        .findOne({
          where: {
            id: value,
          },
        })
        .then((groups) => {
          if (groups) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Group Does not exist");
          }
        });
    }),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
];

const TestimonialSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description is required"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
];

const TestimonialUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage("description is required"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return testimonial
        .findOne({
          where: {
            id: value,
          },
        })
        .then((testimonial) => {
          if (testimonial) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("testimonial Does not exist");
          }
        });
    }),
];
const YoutubeVideoSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("embed_id")
    .exists({ checkFalsy: true })
    .withMessage("video Id is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
];
const YoutubeVideoSchemaupdate = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("embed_id")
    .exists({ checkFalsy: true })
    .withMessage("video Id is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return youtubevideos
        .findOne({
          where: {
            id: value,
          },
        })
        .then((youtubevideos) => {
          if (youtubevideos) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("youtubevideos Does not exist");
          }
        });
    }),
];
const VideoTestimonialSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
  body("video_url")
    .exists({ checkFalsy: true })
    .withMessage("video_url is required"),
];

const VideoTestimonialUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("tag").exists({ checkFalsy: true }).withMessage("tag is required"),
  body("video_url")
    .exists({ checkFalsy: true })
    .withMessage("photo is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return videotestimonial
        .findOne({
          where: {
            id: value,
          },
        })
        .then((videotestimonial) => {
          if (videotestimonial) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("videotestimonial Does not exist");
          }
        });
    }),
];
const TeamSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("designation")
    .exists({ checkFalsy: true })
    .withMessage("tag is required"),
  body("type").exists({ checkFalsy: true }).withMessage("type is required"),
];

const TeamUpdateSchema = [
  body("name")
    .exists({ checkFalsy: true })
    .withMessage("Name is required")
    .isLength({ max: 150 })
    .withMessage("Name should be less than 150 character"),
  body("designation")
    .exists({ checkFalsy: true })
    .withMessage("tag is required"),
  body("type").exists({ checkFalsy: true }).withMessage("type is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return team
        .findOne({
          where: {
            id: value,
          },
        })
        .then((team) => {
          if (team) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("team Does not exist");
          }
        });
    }),
];
const StudentformSchema = [
  body("place")
    .exists({ checkFalsy: true })
    .withMessage(" place is required")
    .isLength({ max: 150 })
    .withMessage("place should be less than 150 character"),

  body("language")
    .exists({ checkFalsy: true })
    .withMessage("language name is required")
    .isLength({ max: 150 })
    .withMessage("language should be less than 150 character"),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage(" meta_description is required"),
  body("page_title")
    .exists({ checkFalsy: true })
    .withMessage(" page_title is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("order").exists({ checkFalsy: true }).withMessage(" order is required"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage(" status is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return studentform
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((studentform) => {
          if (studentform) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const StudentformSchemaUpdate = [
  body("place")
    .exists({ checkFalsy: true })
    .withMessage(" place is required")
    .isLength({ max: 150 })
    .withMessage("place should be less than 150 character"),

  body("language")
    .exists({ checkFalsy: true })
    .withMessage("language name is required")
    .isLength({ max: 150 })
    .withMessage("language should be less than 150 character"),
  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage(" meta_title is required"),
  body("meta_description")
    .exists({ checkFalsy: true })
    .withMessage(" meta_description is required"),
  body("page_title")
    .exists({ checkFalsy: true })
    .withMessage(" page_title is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("order").exists({ checkFalsy: true }).withMessage(" order is required"),
  body("status")
    .exists({ checkFalsy: true })
    .withMessage(" status is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return studentform
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((studentform) => {
          if (studentform) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return studentform
        .findOne({
          where: {
            id: value,
          },
        })
        .then((studentform) => {
          if (studentform) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("studentform Does not exist");
          }
        });
    }),
];
const JobvacanciesSchema = [
  body("position")
    .exists({ checkFalsy: true })
    .withMessage(" position is required")
    .isLength({ max: 150 })
    .withMessage("position should be less than 150 character"),

  body("experience")
    .exists({ checkFalsy: true })
    .withMessage("experience name is required")
    .isLength({ max: 150 })
    .withMessage("experience should be less than 150 character"),
  body("no_of_vacancy")
    .exists({ checkFalsy: true })
    .withMessage(" no_of_vacancy is required"),
  body("location")
    .exists({ checkFalsy: true })
    .withMessage(" location is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),

  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return jobvaccancies
        .findOne({
          where: {
            slug: value,
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];

const JobvacanciesSchemaUpdate = [
  body("position")
    .exists({ checkFalsy: true })
    .withMessage(" position is required")
    .isLength({ max: 150 })
    .withMessage("position should be less than 150 character"),

  body("experience")
    .exists({ checkFalsy: true })
    .withMessage("experience name is required")
    .isLength({ max: 150 })
    .withMessage("experience should be less than 150 character"),
  body("no_of_vacancy")
    .exists({ checkFalsy: true })
    .withMessage(" no_of_vacancy is required"),
  body("location")
    .exists({ checkFalsy: true })
    .withMessage(" location is required"),
  body("description")
    .exists({ checkFalsy: true })
    .withMessage(" description is required"),
  body("slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return jobvaccancies
        .findOne({
          where: {
            slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return jobvaccancies
        .findOne({
          where: {
            id: value,
          },
        })
        .then((jobvaccancies) => {
          if (jobvaccancies) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("job Does not exist");
          }
        });
    }),
];

const PromopageSchema = [
  body("title").exists({ checkFalsy: true }).withMessage(" title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title name is required"),

  body("url").exists({ checkFalsy: true }).withMessage(" url is required"),
];

const PromopageSchemaUpdate = [
  body("title").exists({ checkFalsy: true }).withMessage(" title is required"),

  body("meta_title")
    .exists({ checkFalsy: true })
    .withMessage("meta_title name is required"),

  body("url").exists({ checkFalsy: true }).withMessage(" url is required"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return promopage
        .findOne({
          where: {
            id: value,
          },
        })
        .then((promopage) => {
          if (promopage) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("promopage Does not exist");
          }
        });
    }),
];





const adminpasswordSchema = [
  body("password").isLength({
    min: 6,
  }),

  body("passwordconfirm").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }

    // Indicates the success of this synchronous custom validator
    return true;
  }),
];

const AccreditationsSchema = [
  body("accreditation_name")
    .exists({ checkFalsy: true })
    .withMessage("Accreditations name is required")
    .isLength({ max: 150 })
    .withMessage("Accreditations name should be less than 150 character"),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("keywords name is required")
    .isLength({ max: 150 })
    .withMessage("keywords name should be less than 150 character"),

  body("accreditation_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value) => {
      return accreditation
        .findOne({
          where: {
            accreditation_slug: value,
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];






const AccreditationsSchemaUpdate = [
  body("accreditation_name")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character"),

  body("keywords")
    .exists({ checkFalsy: true })
    .withMessage("keywords name is required")
    .isLength({ max: 150 })
    .withMessage("keywords name should be less than 150 character"),

  body("id")
    .exists({ checkFalsy: true })
    .withMessage("id is required")
    .custom((value) => {
      return accreditation
        .findOne({
          where: {
            id: value,
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return true;
          } else {
            // Indicates the success of this synchronous custom validator
            return Promise.reject("Stream Does not exist");
          }
        });
    }),
  body("accreditation_slug")
    .exists({ checkFalsy: true })
    .withMessage("Slug is required")
    .isLength({ max: 150 })
    .withMessage("Slug should be less than 150 character")
    .custom((value, { req }) => {
      return accreditation
        .findOne({
          where: {
            accreditation_slug: {
              [Op.eq]: value,
            },
            id: {
              [Op.not]: [req.body.id],
            },
          },
        })
        .then((accreditation) => {
          if (accreditation) {
            return Promise.reject("Slug already in use");
          } else {
            // Indicates the success of this synchronous custom validator
            return true;
          }
        });
    }),
];





const globalvalidation = {
  Validate: Validate,
  Test: Test,
  countrySchema: countrySchema,
  countriesUpdateSchema: countriesUpdateSchema,
  citySchema: citySchema,
  cityUpdateSchema: cityUpdateSchema,
  stateSchema: stateSchema,
  updatestateSchema: updatestateSchema,
  AmenitiesSchema: AmenitiesSchema,
  AmenitiesSchemaUpdate: AmenitiesSchemaUpdate,
  schoolSchema: schoolSchema,
  schoolUpdateSchema: schoolUpdateSchema,
  schoolboardSchema: schoolboardSchema,
  schoolboardUpdateSchema: schoolboardUpdateSchema,
  bannerSchema: bannerSchema,
  bannerUpdateSchema: bannerUpdateSchema,
  PageSchema: PageSchema,
  PageUpdateSchema: PageUpdateSchema,
  StreamSchema: StreamSchema,
  StreamSchemaUpdate: StreamSchemaUpdate,
  SubStreamSchema: SubStreamSchema,
  SubStreamSchemaUpdate: SubStreamSchemaUpdate,
  CollegeSchema: CollegeSchema,
  CollegeUpdateSchema: CollegeUpdateSchema,
  recognitionSchema: recognitionSchema,
  recognitionUpdateSchema: recognitionUpdateSchema,
  GeneralcoursesSchema: GeneralcoursesSchema,
  GeneralcoursesSchemaupdate: GeneralcoursesSchemaupdate,
  stream_faqSchema: stream_faqSchema,
  stream_faqSchemaupdate: stream_faqSchemaupdate,
  coursesSchema: coursesSchema,
  coursesUpdateSchema: coursesUpdateSchema,
  abroadpageSchema: abroadpageSchema,
  abroadpageUpdateSchema: abroadpageUpdateSchema,
  landingpageSchema: landingpageSchema,
  landingpageUpdateSchema: landingpageUpdateSchema,
  newscategoriesSchema: newscategoriesSchema,
  newscategoriesUpdateSchema: newscategoriesUpdateSchema,
  newsandeventsSchema: newsandeventsSchema,
  newsandeventsUpdateSchema: newsandeventsUpdateSchema,
  blogSchema: blogSchema,
  blogUpdateSchema: blogUpdateSchema,
  examSchema: examSchema,
  examUpdateSchema: examUpdateSchema,
  scholarlevelSchema: scholarlevelSchema,
  scholarlevelUpdateSchema: scholarlevelUpdateSchema,
  scholartypeSchema: scholartypeSchema,
  scholartypeUpdateSchema: scholartypeUpdateSchema,
  scholarshipSchema: scholarshipSchema,
  scholarshipUpdateSchema: scholarshipUpdateSchema,
  alljoblocationSchema: alljoblocationSchema,
  alljoblocationUpdateSchema: alljoblocationUpdateSchema,
  jobspositionsSchema: jobspositionsSchema,
  jobspositionsUpdateSchema: jobspositionsUpdateSchema,
  joblocationsSchema: joblocationsSchema,
  joblocationsUpdateSchema: joblocationsUpdateSchema,
  jobsenquiresSchema: jobsenquiresSchema,
  jobsenquiresUpdateSchema: jobsenquiresUpdateSchema,
  ourteamsSchema: ourteamsSchema,
  ourteamsUpdateSchema: ourteamsUpdateSchema,
  videotestimonialsSchema: videotestimonialsSchema,
  videotestimonialsUpdateSchema: videotestimonialsUpdateSchema,
  schoolboardrecognitionSchema: schoolboardrecognitionSchema,
  schoolboardrecognitionUpdateSchema: schoolboardrecognitionUpdateSchema,
  reviewSchema: reviewSchema,
  reviewUpdateSchema: reviewUpdateSchema,
  reviewrepliesSchema: reviewrepliesSchema,
  reviewrepliesUpdateSchema: reviewrepliesUpdateSchema,







  AccreditationsSchema: AccreditationsSchema,
  AccreditationsSchemaUpdate: AccreditationsSchemaUpdate,
  areaSchema: areaSchema,
  areaUpdateSchema: areaUpdateSchema,
  schoolSchema: schoolSchema,
  schoolUpdateSchema: schoolUpdateSchema,
  managementSchema: managementSchema,
  managementUpdateSchema: managementUpdateSchema,
  enquirySchema: enquirySchema,



  affilitionUpdateSchema: affilitionUpdateSchema,
  affilitionSchema: affilitionSchema,


  CompanySchema: CompanySchema,
  CompanyUpdateSchema: CompanyUpdateSchema,
  bannerUpdateSchema: bannerUpdateSchema,
  managementSchema: managementSchema,
  managementUpdateSchema: managementUpdateSchema,
  authorSchema: authorSchema,
  authorUpdateSchema: authorUpdateSchema,
  categoriesSchema: categoriesSchema,
  categoriesUpdateSchema: categoriesUpdateSchema,


  polytechnicSchema: polytechnicSchema,
  polytechnicUpdateSchema: polytechnicUpdateSchema,
  // reviewSchema: reviewSchema,
  reviewUpdateSchema: reviewUpdateSchema,
  reviewchangestatusSchema: reviewchangestatusSchema,
  upcoming_coursesUpdateSchema: upcoming_coursesUpdateSchema,
  upcoming_coursesSchema: upcoming_coursesSchema,

  eligibilityUpdateSchema: eligibilityUpdateSchema,
  eligibilitySchema: eligibilitySchema,
  salaryUpdateSchema: salaryUpdateSchema,
  salarySchema: salarySchema,
  feeUpdateSchema: feeUpdateSchema,
  feeSchema: feeSchema,
  galleryUpdateSchema: galleryUpdateSchema,
  gallerySchema: gallerySchema,
  jobUpdateSchema: jobUpdateSchema,
  jobSchema: jobSchema,
  userSchema: userSchema,
  userforgotpassword: userforgotpassword,
  userforgotpasswordnew: userforgotpasswordnew,
  groupsUpdateSchema: groupsUpdateSchema,
  groupsSchema: groupsSchema,
  TestimonialSchema: TestimonialSchema,
  TestimonialUpdateSchema: TestimonialUpdateSchema,
  VideoTestimonialSchema: VideoTestimonialSchema,
  VideoTestimonialUpdateSchema: VideoTestimonialUpdateSchema,
  TeamSchema: TeamSchema,
  TeamUpdateSchema: TeamUpdateSchema,
  StudentformSchema: StudentformSchema,
  StudentformSchemaUpdate: StudentformSchemaUpdate,
  JobvacanciesSchema: JobvacanciesSchema,
  JobvacanciesSchemaUpdate: JobvacanciesSchemaUpdate,
  RedirecturlSchema: RedirecturlSchema,
  RedirecturlSchemaUpdate: RedirecturlSchemaUpdate,
  PromopageSchema: PromopageSchema,
  PromopageSchemaUpdate: PromopageSchemaUpdate,



  adminpasswordSchema: adminpasswordSchema,

  abroadcountriesUpdateSchema: abroadcountriesUpdateSchema,
  abroadcountriesSchema: abroadcountriesSchema,
  abroaduniversitiesUpdateSchema: abroaduniversitiesUpdateSchema,
  abroaduniversitiesSchema: abroaduniversitiesSchema,
  YoutubeVideoSchemaupdate: YoutubeVideoSchemaupdate,
  YoutubeVideoSchema: YoutubeVideoSchema,

};

module.exports = globalvalidation;
