const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: 0,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
/*** Model Include */

db.enquiry = require("../models/enquiry.model.js")(sequelize, Sequelize);
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.countries = require("../models/countries.model.js")(sequelize, Sequelize);
db.state = require("../models/state.model.js")(sequelize, Sequelize);
db.city = require("../models/city.model.js")(sequelize, Sequelize);
db.amenities = require("../models/amenities.model.js")(sequelize, Sequelize);
db.schoolboards = require("../models/school_boards.model.js")(sequelize, Sequelize);
db.school = require("../models/school.model.js")(sequelize, Sequelize);
db.schoolamenities = require("../models/schoolamenities.model.js")(sequelize, Sequelize);
db.schoollevels = require("../models/schoollevel.model.js")(sequelize, Sequelize);
db.school_faqs = require("../models/school_faqs.model.js")(sequelize, Sequelize);
db.schoolgallery = require("../models/school_galleries.model.js")(sequelize, Sequelize);
db.stream = require("../models/stream.model.js")(sequelize, Sequelize);
db.stream_faq = require("../models/stream_faq.model.js")(sequelize, Sequelize);
db.sub_stream = require("../models/sub_stream.model.js")(sequelize, Sequelize);
db.page = require("../models/page.model.js")(sequelize, Sequelize);
db.banner = require("../models/banner.model.js")(sequelize, Sequelize);
db.accesstokens = require("../models/accesstokens.model.js")(sequelize, Sequelize);
db.level = require("./level.model.js")(sequelize, Sequelize);
db.recognition = require("../models/recognition.model.js")(sequelize, Sequelize);
db.general_course = require("./general_course.model.js")(sequelize, Sequelize);
db.general_course_faqs = require("../models/generalcourse_faq.model.js")(sequelize, Sequelize);
db.courses = require("../models/courses.model.js")(sequelize, Sequelize);
db.abroadpages = require("../models/abroadpage.model.js")(sequelize, Sequelize);
db.abroadpage_faqs = require("../models/abroadpage_faq.model.js")(sequelize, Sequelize);
db.college = require("../models/College.model.js")(sequelize, Sequelize);
db.college_stream = require("../models/college_stream.model.js")(sequelize, Sequelize);
db.college_faqs = require("../models/college_faq.model.js")(sequelize, Sequelize);
db.college_amenities = require("../models/college_amenities.model.js")(sequelize, Sequelize);
db.college_recognition = require("../models/college_recognition.model.js")(sequelize, Sequelize);
db.college_gallery = require("../models/college_galleries.model.js")(sequelize, Sequelize);
db.landing_pages = require("../models/landing_page.model.js")(sequelize, Sequelize);
db.news_categories = require("../models/news_categories.model.js")(sequelize, Sequelize);
db.news_and_events = require("../models/news_and_events.model.js")(sequelize, Sequelize);
db.blog = require("../models/blog.model.js")(sequelize, Sequelize);
db.exam = require("../models/exam.model.js")(sequelize, Sequelize);
db.exam_faqs = require("../models/exam_faq.model.js")(sequelize, Sequelize);
db.scholar_levels = require("./scholar_level.model.js")(sequelize, Sequelize);
db.scholar_types = require("./scholar_type.model.js")(sequelize, Sequelize);
db.scholarships = require("./scholarship.model.js")(sequelize, Sequelize);
db.all_job_locations = require("./all_jobs_location.model.js")(sequelize, Sequelize);
db.jobs_positions = require("./jobs_position.model.js")(sequelize, Sequelize);
db.job_locations = require("./job_locations.model.js")(sequelize, Sequelize);
db.jobs_enquires = require("./jobs_enquires.model.js")(sequelize, Sequelize);
db.our_teams = require("./our_teams.model.js")(sequelize, Sequelize);
db.video_testimonials = require("./video_testimonials.model.js")(sequelize, Sequelize);
db.school_board_faqs = require("./school_board_faqs.model.js")(sequelize, Sequelize);
db.school_board_recognitions = require("./school_board_recognitions.model.js")(sequelize, Sequelize);
db.reviews = require("./reviews.model.js")(sequelize, Sequelize);
db.review_replies = require("./review_reply.model.js")(sequelize, Sequelize);
db.users = require("../models/user.model.js")(sequelize, Sequelize);
db.blog_comment = require("./blog_comment.model.js")(sequelize, Sequelize);
db.blog_categories = require("./blog_categories.model.js")(sequelize, Sequelize);
db.scholar_gender = require("../models/scholar_gender.model.js")(sequelize, Sequelize);
db.genders = require("../models/gender.model.js")(sequelize, Sequelize);
db.counsellor_teams = require("./counsellor_teams.model.js")(sequelize, Sequelize);




// db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);



db.polytechnic = require("../models/polytechnic.model.js")(sequelize, Sequelize);


db.area = require("../models/area.model.js")(sequelize, Sequelize);






db.accreditation = require("../models/accreditation.model.js")(sequelize, Sequelize);

db.management = require("../models/management.model.js")(sequelize, Sequelize);

db.affilition = require("../models/affilition.model.js")(sequelize, Sequelize);









db.companies = require("../models/companies.model.js")(sequelize, Sequelize);
db.placements = require("../models/placements.model.js")(sequelize, Sequelize);
db.f_a_qs = require("../models/f_a_qs.model.js")(sequelize, Sequelize);
db.rankings = require("../models/rankings.model.js")(sequelize, Sequelize);
db.author = require("../models/author.model.js")(sequelize, Sequelize);
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);









db.polytechnictype = require("../models/polytechnictype.model.js")(sequelize, Sequelize);
db.polytechnicaccreditations = require("../models/polytechnicaccreditations.model.js")(sequelize, Sequelize);
db.polytechnicamenities = require("../models/polytechnicamenities.model.js")(sequelize, Sequelize);
db.polytechnicmanagment = require("../models/polytechnicmanagment.model.js")(sequelize, Sequelize);
// db.review = require("../models/review.model.js")(sequelize, Sequelize);
db.upcoming_courses = require("../models/upcoming_courses.model.js")(sequelize, Sequelize);

db.course_modes = require("./course_modes.model.js")(sequelize, Sequelize);
db.course_exams = require("./course_exams.model.js")(sequelize, Sequelize);
db.course_companies = require("./course_companies.model.js")(sequelize, Sequelize);
db.modes = require("../models/modes.model.js")(sequelize, Sequelize);
db.mediums = require("../models/mediums.model.js")(sequelize, Sequelize);
db.eligibilities = require("../models/eligibilities.model.js")(sequelize, Sequelize);
db.salary = require("../models/salary.model.js")(sequelize, Sequelize);
db.job = require("../models/course_job_analyses.model.js")(sequelize, Sequelize);
db.gallery = require("../models/gallery.model.js")(sequelize, Sequelize);
db.fees = require("../models/fees.model.js")(sequelize, Sequelize);
db.fee_details = require("../models/fee_details.model.js")(sequelize, Sequelize);
db.syllabus = require("../models/syllabus.model.js")(sequelize, Sequelize);
db.syllabus_details = require("../models/syllabus_details.model.js")(sequelize, Sequelize);
db.upcoming_courses = require("../models/upcoming_courses.model.js")(sequelize, Sequelize);
db.abouts = require("../models/about.model.js")(sequelize, Sequelize);
db.service = require("../models/service.model.js")(sequelize, Sequelize);
db.resettokens = require("../models/resettoken.model.js")(sequelize, Sequelize);
db.groups = require("../models/groups.model.js")(sequelize, Sequelize);
db.testimonial = require("../models/testimonial.model.js")(sequelize, Sequelize);
db.videotestimonial = require("../models/videotestimonial.model.js")(sequelize, Sequelize);
db.team = require("../models/team.model.js")(sequelize, Sequelize);
db.studentform = require("../models/student_form.model.js")(sequelize, Sequelize);
db.commingform = require("../models/comming_form_sidetab.model.js")(sequelize, Sequelize);
db.nri = require("../models/nri.model.js")(sequelize, Sequelize);
db.recognitioneditor = require("../models/recognitioneditor.model.js")(sequelize, Sequelize);
db.information = require("../models/information.model.js")(sequelize, Sequelize);
db.jobvaccancies = require("../models/jobvaccancies.model.js")(sequelize, Sequelize);
db.websiteimage = require("../models/websiteimage.model.js")(sequelize, Sequelize);
db.websitepopup = require("../models/websitepopup.model.js")(sequelize, Sequelize);
db.redirecturl = require("../models/redirecturl.model.js")(sequelize, Sequelize);
db.promopage = require("../models/promo.model.js")(sequelize, Sequelize);
db.newsandevents = require("./newsandeventes.model.js")(sequelize, Sequelize);







db.cutoff = require("../models/cutoff.model.js")(sequelize, Sequelize);
db.cutoffdetails = require("../models/cutoff_details.model.js")(sequelize, Sequelize);


db.exam_eligibilities = require("../models/exam_eligibilities.model.js")(sequelize, Sequelize);
db.exam_feedetails = require("../models/exam_feedetails.model.js")(sequelize, Sequelize);
db.exam_dates = require("../models/exam_dates.model.js")(sequelize, Sequelize);
db.exam_agelimits = require("../models/exam_agelimits.model.js")(sequelize, Sequelize);
db.exam_id_proof_details = require("../models/exam_id_proofs.model.js")(sequelize, Sequelize);

db.databackup = require("../models/databackup.model.js")(sequelize, Sequelize);



// db.exams = require("./exams.model.js")(sequelize, Sequelize);



db.abroadcountries = require("../models/abroadcountries.model.js")(sequelize, Sequelize);
db.abroad_universities = require("../models/abroaduniversities.model.js")(sequelize, Sequelize);

db.youtubevideos = require("../models/youtubevideos.model.js")(sequelize, Sequelize);




/***  Relation ship courses  */

db.exam.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});
db.newsandevents.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

db.courses.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "college",
});
db.courses.belongsTo(db.general_course, {
  foreignKey: "general_course_id",
  as: "generalcourse",
});

db.college.hasMany(db.courses, {
  foreignKey: "college_id",
  as: "courses",
});
/***  Relation ship school-boards */

db.schoolboards.hasMany(db.school_board_faqs, { as: "schoolboardfaqs", foreignKey: "school_board_id" });
db.school_board_faqs.belongsTo(db.schoolboards, {
  foreignKey: "school_board_id",
  as: "schoolboardfaqs",
});
db.schoolboards.hasMany(db.school_board_recognitions, { as: "boardrecognitions" });
db.school_board_recognitions.belongsTo(db.schoolboards, {
  foreignKey: "school_board_id",
  as: "boardrecognitions",
});

db.school_board_recognitions.belongsTo(db.recognition, {
  foreignKey: "recognition_id",
  as: "brdrecognitions",
});

db.schoolboards.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});
db.schoolboards.belongsTo(db.state, {
  foreignKey: "state_id",
  as: "state",
});
db.schoolboards.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "citys",
});

/***  Relation ship school  */

db.school.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

db.school.belongsTo(db.state, {
  foreignKey: "state_id",
  as: "state",
});

db.school.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "citys",
});

db.school.belongsTo(db.schoolboards, {
  foreignKey: "school_board_id",
  as: "schoolboard",
});
// db.review.belongsTo(db.school, {
//   foreignKey: "item_id",
//   where: { type: 'school' },
//   as: "reviewschools",
// });






db.school.hasMany(db.schoolamenities, { as: "schoolamenities" });
db.schoolamenities.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolamenities",
});

db.schoolamenities.belongsTo(db.amenities, {
  foreignKey: "amenitie_id",
  as: "schamenities",
});



db.school.hasMany(db.schoollevels, { as: "schoollevels" });
db.schoollevels.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoollevels",
});

db.schoollevels.belongsTo(db.level, {
  foreignKey: "level_id",
  as: "schlevelname",
});


db.school.hasMany(db.school_faqs, { as: "schfaqs", foreignKey: "school_id" });
db.school_faqs.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolfaqs",
});

db.school.hasMany(db.schoolgallery, { as: "schgallery", foreignKey: "school_id" });




db.fees.hasMany(db.fee_details, { as: "fees" });
db.fee_details.belongsTo(db.fees, {
  foreignKey: "school_id",
  as: "fee_details",
});

/***  Relation ship  school board recognitions */

db.school_board_recognitions.belongsTo(db.recognition, {
  foreignKey: "recognition_id",
  as: "schboardrecognitions",
});
db.school_board_recognitions.belongsTo(db.schoolboards, {
  foreignKey: "school_board_id",
  as: "schoolboards",
});



/***  resettokens ship users  */

// db.resettokens.belongsTo(db.user, {
//   foreignKey: "user_id",
//   as: "users",
// });


/*** states relationship */
db.countries.hasMany(db.state, { as: "state" });
db.state.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

/*** cities relationship */
db.state.hasMany(db.city, { as: "city" });
db.city.belongsTo(db.state, {
  foreignKey: "state_id",
  as: "state",
});



/***  Relation ship college  */

db.college.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

db.college.belongsTo(db.state, {
  foreignKey: "state_id",
  as: "state",
});

db.college.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "citys",
});


db.college.hasMany(db.college_stream, { as: "collegestreams" });
db.college_stream.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "collegestreams",
});


db.college_stream.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "clgstreams",
});

db.college.hasMany(db.college_amenities, { as: "collegeamenities" });
db.college_amenities.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "collegeamenities",
});

db.college_amenities.belongsTo(db.amenities, {
  foreignKey: "amenitie_id",
  as: "clgamenities",
});



db.college.hasMany(db.college_recognition, { as: "collegerecognitions" });
db.college_recognition.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "collegerecognitions",
});

db.college_recognition.belongsTo(db.recognition, {
  foreignKey: "recognition_id",
  as: "clgrecognitions",
});



db.college.hasMany(db.college_faqs, { as: "collegefaqs", foreignKey: "college_id" });
db.college_faqs.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "collegefaqs",
});

db.college.hasMany(db.college_gallery, { as: "clggallery", foreignKey: "college_id" });



/***  Relation ship college stream  */

db.stream.hasMany(db.college_stream, { as: "clgstreamm" });
db.college_stream.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "state",
});

// college_stream.belongsTo(db.college, {
//   foreignKey: 'college_id',
//   as: 'college'
// });




/***  Relation ship stream  */

db.stream.hasMany(db.stream_faq, { as: "streamfaqs", foreignKey: "stream_id" });
db.stream_faq.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "streamfaqs",
});

db.stream.hasMany(db.exam, { as: "exam" });
db.exam.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "state",
});


/***  Relation ship generalcourses  */

db.general_course.hasMany(db.general_course_faqs, { as: "generalcoursefaqs", foreignKey: "general_course_id" });
db.general_course_faqs.belongsTo(db.general_course, {
  foreignKey: "general_course_id",
  as: "generalcoursefaqs",
});

db.stream.hasMany(db.general_course, {
  foreignKey: "stream_id",
  as: "general_courses"
});

db.general_course.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "streams",
});

db.general_course.belongsTo(db.sub_stream, {
  foreignKey: "sub_streams_id",
  as: "sub_streams",
});



/***  Relation ship abroadpage  */

db.abroadpages.hasMany(db.abroadpage_faqs, { as: "abroadpagefaqs", foreignKey: "abroad_page_id" });
db.abroadpage_faqs.belongsTo(db.abroadpages, {
  foreignKey: "abroad_page_id",
  as: "abroadpagefaqs",
});


db.countries.hasMany(db.abroadpages, { as: "abroadpages", foreignKey: "country_id" });
db.abroadpages.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

/***  Relation ship news and events  */


db.news_categories.hasMany(db.news_and_events, { as: "newsandevents", foreignKey: "category_id" });
db.news_and_events.belongsTo(db.news_categories, {
  foreignKey: "category_id",
  as: "newscategories",
});


//Exam RELATIONSHIP

db.stream.hasMany(db.exam, { as: "exams", foreignKey: "stream_id" });
db.exam.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "stream",
});


db.exam.hasMany(db.exam_faqs, { as: "examfaqs", foreignKey: "exam_id" });
db.exam_faqs.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examfaqs",
});




/***  Relation ship scholarship  */

db.scholarships.belongsTo(db.countries, {
  foreignKey: "country_id",
  as: "country",
});

db.scholarships.belongsTo(db.scholar_levels, {
  foreignKey: "level_id",
  as: "scholarlevels",
});

db.scholarships.belongsTo(db.scholar_types, {
  foreignKey: "type_id",
  as: "scholartypes",
});


db.scholarships.hasMany(db.scholar_gender, { as: "schgenders", foreignKey: "scholar_id" });
// db.scholar_gender.belongsTo(db.scholarships, {
//   foreignKey: "scholar_id",
//   as: "schgenders",
// });


db.scholar_gender.belongsTo(db.genders, {
  foreignKey: "gender_id",
  as: "genders",
});

/***  Relation ship  job location */

// db.job_locations.belongsTo(db.all_job_locations, {
//   foreignKey: "job_location_id",
//   as: "alljoblocations",
// });
// db.job_locations.belongsTo(db.jobs_positions, {
//   foreignKey: "jobs_position_id",
//   as: "jobspositions",
// });


db.jobs_positions.hasMany(db.job_locations, { as: "jobpositionlocation" });
db.job_locations.belongsTo(db.jobs_positions, {
  foreignKey: "jobs_position_id",
  as: "jobpositionlocation",
});


db.job_locations.belongsTo(db.all_job_locations, {
  foreignKey: "job_location_id",
  as: "jobpositionslocation",
});


/***  Relation ship  jobs enquiry */

db.jobs_enquires.belongsTo(db.all_job_locations, {
  foreignKey: "job_location_id",
  as: "alljoblocations",
});
db.jobs_enquires.belongsTo(db.jobs_positions, {
  foreignKey: "jobs_position_id",
  as: "jobspositions",
});


/***  Relation ship  blog comment */

// db.blog_comment.belongsTo(db.blog, {
//   foreignKey: "blog_id",
//   as: "blogcomment",
// });

db.blog.hasMany(db.blog_comment, { as: "blogcomment" });

db.blog_comment.belongsTo(db.blog, {
  foreignKey: "blog_id",
  as: "blogcomment",
});
// db.jobs_enquires.belongsTo(db.jobs_positions, {
//   foreignKey: "jobs_position_id",
//   as: "jobspositions",
// });




// db.general_course.belongsTo(db.sub_stream, {
//   foreignKey: "sub_streams_id",
//   as: "sub_streams",
// });

//  db.general_course.hasMany(db.general_course_faqs, { as: "generalcoursefaqs", foreignKey: "general_course_id" });
// db.general_course_faqs.belongsTo(db.general_course, {
//   foreignKey: "general_course_id",
//   as: "generalcoursefaqs",
// });



// db.stream.hasMany(db.generalcourse, { as: "ugcourse" });
// db.generalcourse.belongsTo(db.stream, {
//   foreignKey: "stream_id",
//   as: "ugcourse",
// });
// db.stream.hasMany(db.generalcourse, { as: "pgcourse" });
// db.generalcourse.belongsTo(db.stream, {
//   foreignKey: "stream_id",
//   as: "pgcourse",
// });
// db.stream.hasMany(db.generalcourse, { as: "diplomacourse" });
// db.generalcourse.belongsTo(db.stream, {
//   foreignKey: "stream_id",
//   as: "diplomacourse",
// });
// db.stream.hasMany(db.generalcourse, { as: "doctratecourse" });
// db.generalcourse.belongsTo(db.stream, {
//   foreignKey: "stream_id",
//   as: "doctratecourse",
// });









// State.belongsTo(Country, { foreignKey: 'countryId' }); 



/*** studentform  Relation ship  */
db.studentform.hasMany(db.commingform, { as: "stdform" });
db.commingform.belongsTo(db.studentform, {
  foreignKey: "students_coming_from_id",
  as: "stdform",
});





/***  Relation ship review  */

// db.reviews.belongsTo(db.college, {
//   foreignKey: "college_id",
//   as: "clgreview",
// });

// db.review.belongsTo(db.courses, {
//   foreignKey: "item_id",
//   as: "maincourse",
// });
// db.review.belongsTo(db.stream, {
//   foreignKey: "item_id",
//   as: "reviewstream",
// });

// db.college.hasMany(db.reviews, {
//   foreignKey: "college_id",
//   as: "reviewcollege",
// }); 

// db.users.hasMany(db.reviews, {
//   foreignKey: "user_id",
//   as: "reviewuser",
// }); 

db.college.hasMany(db.reviews, { as: "clgreview" });
db.reviews.belongsTo(db.college, {
  foreignKey: "college_id",
  as: "clgreview",
});

db.users.hasMany(db.reviews, { as: "reviewuser" });
db.reviews.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "reviewuser",
});

db.school.hasMany(db.reviews, { as: "sclreview" });
db.reviews.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "sclreview",
});

db.schoolboards.hasMany(db.reviews, { as: "sclbrdreview" });
db.reviews.belongsTo(db.schoolboards, {
  foreignKey: "school_board_id",
  as: "sclbrdreview",
});

// db.courses.hasMany(db.reviews, { as: "coursereview" });
db.reviews.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "coursereview",
});

// db.courses.hasMany(db.reviews, { as: "coursereview" });
// db.reviews.belongsTo(db.courses, {
//   foreignKey: "course_id",
//   as: "coursereview",
// });



db.reviews.hasMany(db.review_replies, { as: "reviewreply" });
db.review_replies.belongsTo(db.reviews, {
  foreignKey: "review_id",
  as: "reviewreply",
});

db.review_replies.belongsTo(db.reviews, {
  foreignKey: "review_id",
  as: "reviewrply",
});















db.placements.belongsTo(db.companies, {
  foreignKey: "company_id",
  as: "placement_company",
});























db.cutoff.hasMany(db.cutoffdetails, { as: "cutoffdetails", foreignKey: "cut_offs_id" });
db.cutoffdetails.belongsTo(db.cutoff, {
  foreignKey: "cut_offs_id",
  as: "cutoffdetails",
});

db.cutoffdetails.belongsTo(db.general_course, {
  foreignKey: "course_id",
  as: "coursecutoff",
});
















// db.exam.hasMany(db.newsandevents, { as: "examnews" });
// db.newsandevents.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "examnews",
// });



// db.exam.hasMany(db.stream,{ as: "examstream",foreignKey:"stream_id"});
// db.stream.belongsTo(db.exam, {
//   foreignKey: "stream_id",
//   as: "examstream",
// });



// db.exam.hasMany(db.exam_eligibilities, { as: "eligibilities" });
// db.exam_eligibilities.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "eligibilities",
// });
// db.exam.hasMany(db.exam_feedetails, { as: "feedetails" });
// db.exam_feedetails.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "feedetails",
// });
// db.exam.hasMany(db.exam_dates, { as: "examdates" });
// db.exam_dates.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "examdates",
// });

// db.exam.hasMany(db.exam_agelimits, { as: "examagelimit" });
// db.exam_agelimits.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "examagelimit",
// });
// db.exam.hasMany(db.exam_id_proof_details, { as: "examidproof" });
// db.exam_id_proof_details.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "examidproof",
// });
// db.exam.hasMany(db.exam_faqs, { as: "examfaqs" });
// db.exam_faqs.belongsTo(db.exam, {
//   foreignKey: "exam_id",
//   as: "examfaqs",
// });







// db.city.hasMany(db.polytechnic, { as: "city" });


// db.area.hasMany(db.polytechnic, { as: "area" });


db.polytechnic.belongsTo(db.area, {
  foreignKey: "area_id",
  as: "areas",
});

// db.polytechnictype.hasMany(db.polytechnic, { as: "polytechnictype" });
db.polytechnic.belongsTo(db.polytechnictype, {
  foreignKey: "polytechnic_type_id",
  as: "polytechnictype",
});


//polytechnicaccreditations RELATIONSHIP

db.polytechnic.hasMany(db.polytechnicaccreditations, { as: "polytechnicaccreditations" });
db.polytechnicaccreditations.belongsTo(db.polytechnic, {
  foreignKey: "polytechnic_id",
  as: "polytechnicaccreditations",
});
db.accreditation.hasMany(db.polytechnicaccreditations, { as: "plt" });
db.polytechnicaccreditations.belongsTo(db.accreditation, {
  foreignKey: "accreditation_id",
  as: "plt",
});


//polytechnicamenities RELATIONSHIP

db.polytechnic.hasMany(db.polytechnicamenities, { as: "polytechnicamenities" });
db.polytechnicamenities.belongsTo(db.polytechnic, {
  foreignKey: "polytechnic_id ",
  as: "polytechnicamenities",
});
db.amenities.hasMany(db.polytechnicamenities, { as: "pltamenities" });
db.polytechnicamenities.belongsTo(db.amenities, {
  foreignKey: "amenities_id",
  as: "pltamenities",
});


db.polytechnic.hasMany(db.polytechnicmanagment, { as: "polytechnicmanagment" });
db.polytechnicmanagment.belongsTo(db.polytechnic, {
  foreignKey: "polytechnic_id ",
  as: "polytechnicmanagment",
});
db.management.hasMany(db.polytechnicmanagment, { as: "pltmanagement" });
db.polytechnicmanagment.belongsTo(db.management, {
  foreignKey: "management_id",
  as: "pltmanagement",
});

//mode course+mode relationship
db.modes.hasMany(db.course_modes, { as: "modess" });
db.course_modes.belongsTo(db.modes, {
  foreignKey: "modes_id",
  as: "modess",
});

// //exam course+exam relationship
// db.exam.hasMany(db.course_exams, { as: "exams" });
// db.course_exams.belongsTo(db.exam, {
//   foreignKey: "exams_id",
//   as: "exams",
// });




/***  Relation ship blogs  */

// db.blog_categories.hasMany(db.blog, { as: "blogcategories", foreignKey: "category_id" });
db.blog.belongsTo(db.blog_categories, {
  foreignKey: "category_id",
  as: "blogcategories",
});

// db.author.hasMany(db.blog, { as: "author" });
// db.blog.belongsTo(db.author, {
//   foreignKey: "author_id",
//   as: "author",
// });
// db.categories.hasMany(db.blog, { as: "categories" });
// db.blog.belongsTo(db.categories, {
//   foreignKey: "category_id",
//   as: "categories",
// });


// db.blog.belongsTo(db.groups, {
//   foreignKey: "group_id",
//   as: "groups",
// });


/*** stream Relation ship  */
db.stream.hasMany(db.sub_stream, { as: "substreams" });
db.sub_stream.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "stream",
});


/*** sub stream Relation ship  */
// db.stream.hasMany(db.stream_faq, { as: "faqs" });
// db.stream_faq.belongsTo(db.stream, {
//   foreignKey: "stream_id",
//   as: "stream",
// });







/*** area with city_id Relation ship  */
db.city.hasMany(db.area, { as: "area" });
db.area.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "city",
});




/*** Model Include */
/***course relationship */


// db.role.belongsToMany(db.user, {
//   through: "user_roles",
//   foreignKey: "roleId",
//   otherKey: "userId"
// });
// db.user.belongsToMany(db.role, {
//   through: "user_roles",
//   foreignKey: "userId",
//   otherKey: "roleId"
// });





db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
