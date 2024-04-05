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
db.admin = require("../models/admin.model.js")(sequelize, Sequelize);
db.countries = require("../models/countries.model.js")(sequelize, Sequelize);
db.state = require("../models/state.model.js")(sequelize, Sequelize);
db.city = require("../models/city.model.js")(sequelize, Sequelize);
db.amenities = require("../models/amenities.model.js")(sequelize, Sequelize);
db.schoolboards = require("../models/school_boards.model.js")(sequelize, Sequelize);
db.school = require("../models/school.model.js")(sequelize, Sequelize);
db.stream = require("../models/stream.model.js")(sequelize, Sequelize);
db.sub_stream = require("../models/sub_stream.model.js")(sequelize, Sequelize);
db.page = require("../models/page.model.js")(sequelize, Sequelize);
db.banner = require("../models/banner.model.js")(sequelize, Sequelize);




db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.CollegeAndUniversity = require("../models/CollegeAndUniversity.model.js")(sequelize, Sequelize);

db.polytechnic = require("../models/polytechnic.model.js")(sequelize, Sequelize);
db.generalcourse = require("../models/generalcourse.model.js")(sequelize, Sequelize);
db.enquiry = require("../models/enquiry.model.js")(sequelize, Sequelize);

db.area = require("../models/area.model.js")(sequelize, Sequelize);
db.blog = require("../models/blog.model.js")(sequelize, Sequelize);


db.stream_faq = require("../models/stream_faq.model.js")(sequelize, Sequelize);


db.accreditation = require("../models/accreditation.model.js")(sequelize, Sequelize);

db.management = require("../models/management.model.js")(sequelize, Sequelize);
db.enquiry = require("../models/enquiry.model.js")(sequelize, Sequelize);
db.affilition = require("../models/affilition.model.js")(sequelize, Sequelize);
db.recognition = require("../models/recognition.model.js")(sequelize, Sequelize);
db.college_accreditation = require("../models/college_accreditation.model.js")(sequelize, Sequelize);
db.college_affiliation = require("../models/college_affiliation.model.js")(sequelize, Sequelize);

db.college_stream = require("../models/college_stream.model.js")(sequelize, Sequelize);

db.college_management= require("../models/college_managements.model.js")(sequelize, Sequelize);
db.college_amenities  = require("../models/college_amenities.model.js")(sequelize, Sequelize);
db.college_groupss = require("../models/college_groups.model.js")(sequelize, Sequelize);
db.board_colleges = require("../models/board_colleges.model.js")(sequelize, Sequelize);
db.university_colleges = require("../models/university_colleges.model.js")(sequelize, Sequelize);
db.collegeRecognition = require("../models/collegeRecognition.model.js")(sequelize, Sequelize);
db.companies = require("../models/companies.model.js")(sequelize, Sequelize);
db.placements = require("../models/placements.model.js")(sequelize, Sequelize);
db.f_a_qs= require("../models/f_a_qs.model.js")(sequelize, Sequelize);
db.rankings= require("../models/rankings.model.js")(sequelize, Sequelize);
db.author = require("../models/author.model.js")(sequelize, Sequelize);
db.categories = require("../models/categories.model.js")(sequelize, Sequelize);
db.schooltype = require("../models/schooltype.model.js")(sequelize, Sequelize);

db.level = require("./level.model.js")(sequelize, Sequelize);
db.boardschools = require("../models/boardsschool.model.js")(sequelize, Sequelize);

db.schoollevels = require("../models/schoollevel.model.js")(sequelize, Sequelize);
db.schoolaccreditations = require("../models/schoolaccreditation.model.js")(sequelize, Sequelize);
db.schoolamenities = require("../models/schoolamenities.model.js")(sequelize, Sequelize);
db.schoolmanagment = require("../models/schoolmanagment.model.js")(sequelize, Sequelize);
db.schoolaffiliations = require("../models/school_affilation.model.js")(sequelize, Sequelize);
db.schoolrecognition = require("../models/school_recognition.model.js")(sequelize, Sequelize);
db.polytechnictype = require("../models/polytechnictype.model.js")(sequelize, Sequelize);
db.polytechnicaccreditations = require("../models/polytechnicaccreditations.model.js")(sequelize, Sequelize);
db.polytechnicamenities = require("../models/polytechnicamenities.model.js")(sequelize, Sequelize);
db.polytechnicmanagment = require("../models/polytechnicmanagment.model.js")(sequelize, Sequelize);
db.review = require("../models/review.model.js")(sequelize, Sequelize);
db.upcoming_courses = require("../models/upcoming_courses.model.js")(sequelize, Sequelize);
db.courses = require("../models/courses.model.js")(sequelize, Sequelize);
db.course_modes= require("./course_modes.model.js")(sequelize, Sequelize);
db.course_exams= require("./course_exams.model.js")(sequelize, Sequelize);
db.course_companies= require("./course_companies.model.js")(sequelize, Sequelize);
db.modes = require("../models/modes.model.js")(sequelize, Sequelize);
db.mediums = require("../models/mediums.model.js")(sequelize, Sequelize);
db.eligibilities = require("../models/eligibilities.model.js")(sequelize, Sequelize);
db.salary= require("../models/salary.model.js")(sequelize, Sequelize);
db.job= require("../models/course_job_analyses.model.js")(sequelize, Sequelize);
db.gallery= require("../models/gallery.model.js")(sequelize, Sequelize);
db.fees= require("../models/fees.model.js")(sequelize, Sequelize);
db.fee_details= require("../models/fee_details.model.js")(sequelize, Sequelize);
db.syllabus= require("../models/syllabus.model.js")(sequelize, Sequelize);
db.syllabus_details= require("../models/syllabus_details.model.js")(sequelize, Sequelize);
db.upcoming_courses= require("../models/upcoming_courses.model.js")(sequelize, Sequelize);
db.abouts = require("../models/about.model.js")(sequelize, Sequelize);
db.service= require("../models/service.model.js")(sequelize, Sequelize);
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

db.collegegallery= require("../models/collegegallery.model.js")(sequelize, Sequelize);
db.schoolgallery= require("../models/school_galleries.model.js")(sequelize, Sequelize);
db.cutoff= require("../models/cutoff.model.js")(sequelize, Sequelize);
db.cutoffdetails= require("../models/cutoff_details.model.js")(sequelize, Sequelize);

db.exam= require("../models/exam.model.js")(sequelize, Sequelize);
db.exam_eligibilities= require("../models/exam_eligibilities.model.js")(sequelize, Sequelize);
db.exam_feedetails= require("../models/exam_feedetails.model.js")(sequelize, Sequelize);
db.exam_dates= require("../models/exam_dates.model.js")(sequelize, Sequelize);
db.exam_agelimits= require("../models/exam_agelimits.model.js")(sequelize, Sequelize);
db.exam_id_proof_details= require("../models/exam_id_proofs.model.js")(sequelize, Sequelize);
db.exam_faqs= require("../models/exam_faq.model.js")(sequelize, Sequelize);
db.databackup= require("../models/databackup.model.js")(sequelize, Sequelize);


db.scholarships = require("./scholarship.model.js")(sequelize, Sequelize);
db.exams = require("./exams.model.js")(sequelize, Sequelize);
db.CollegeGalleries = require("./CollegeGalleries.model.js")(sequelize, Sequelize);
db.school_faqs= require("../models/school_faqs.model.js")(sequelize, Sequelize);

db.abroadcountries= require("../models/abroadcountries.model.js")(sequelize, Sequelize);
db.abroad_universities= require("../models/abroaduniversities.model.js")(sequelize, Sequelize);
db.generalcourse_faqs= require("../models/generalcourse_faq.model.js")(sequelize, Sequelize);
db.youtubevideos= require("../models/youtubevideos.model.js")(sequelize, Sequelize);



/***  resettokens ship users  */

db.resettokens.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "users",
});


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








/*** abroad_universities with country_id Relation ship  */
// db.abroadcountries.hasMany(db.abroad_universities, { as: "abroaduniversities" });
db.abroad_universities.belongsTo(db.abroadcountries, {
  foreignKey: "country_id",
  as: "country",
});

db.CollegeAndUniversity.hasMany(db.CollegeGalleries, { as: "CollegeGalleriess",foreignKey: 'college_id'  });
db.CollegeGalleries.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "collegeAndUniversity",
});



// State.belongsTo(Country, { foreignKey: 'countryId' }); 



/*** studentform  Relation ship  */
db.studentform.hasMany(db.commingform, { as: "stdform" });
db.commingform.belongsTo(db.studentform, {
  foreignKey: "students_coming_from_id",
  as: "stdform",
});





/***  Relation ship review  */

db.review.belongsTo(db.user, {
  foreignKey: "user_id",
  as: "users",
});
db.review.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "item_id",
  as: "CollegeAndUniversity",
});
db.review.belongsTo(db.courses, {
  foreignKey: "item_id",
  as: "maincourse",
});
db.review.belongsTo(db.stream, {
  foreignKey: "item_id",
  as: "reviewstream",
});


db.review.belongsTo(db.school, {
  foreignKey: "item_id",
  where:{type:'school'},
  as: "reviewschools",
});



/***  Relation ship schoolboards  */
// db.schoolboards.belongsTo(db.city, {
//   foreignKey: "city_id",
//   as: "citys",
// });

// db.schoolboards.belongsTo(db.area, {
//   foreignKey: "area_id",
//   as: "areas",
// });







//COLLEGE AND UNIVERSITY RELATIONSHIP



db.placements.belongsTo(db.companies, {
  foreignKey: "company_id",
  as: "placement_company",
});



db.CollegeAndUniversity.hasMany(db.board_colleges, { as: "board_colleges",foreignKey:"college_id" });
db.board_colleges.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "board_id",
  as: "boardname",
});

db.CollegeAndUniversity.hasMany(db.board_colleges, { as: "college_board",foreignKey:"board_id" });
db.board_colleges.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "college_name",
});


db.CollegeAndUniversity.hasMany(db.university_colleges, { as: "university_colleges",foreignKey:"college_id"} );
db.university_colleges.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "university_id",
  as: "uniname",
});



// Foo.hasOne(Bar);
// Bar.belongsTo(Foo);
// db.CollegeAndUniversity.hasMany(db.university_colleges, { as: "university_colleges",foreignKey:"college_id"} );
// db.university_colleges.belongsTo(db.CollegeAndUniversity, {
//   foreignKey: "university_id",
//   as: "uu",
// });


// db.university_colleges.belongsToMany(db.CollegeAndUniversity, { as: "aa",foreignKey:"university_id"});




db.CollegeAndUniversity.hasMany(db.college_affiliation, { as: "college_affiliation" });
db.college_affiliation.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "college_affiliation",
});

db.college_affiliation.belongsTo(db.affilition, {
  foreignKey: "affiliations_id",
  as: "affiliationname",
});


db.CollegeAndUniversity.hasMany(db.college_stream, { as: "college_stream" });
db.college_stream.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "college_stream",
});

db.college_stream.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "streamname",
});




db.CollegeAndUniversity.hasMany(db.college_accreditation, { as: "college_accreditation" });
db.college_accreditation.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "college_accreditation",
});
db.college_accreditation.belongsTo(db.accreditation, {
  foreignKey: "accreditation_id",
  as: "accreditationname",
});


db.CollegeAndUniversity.hasMany(db.college_amenities, { as: "college_amenities" });
db.college_amenities.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "college_amenities",
});
db.college_amenities.belongsTo(db.amenities, {
  foreignKey: "amenities_id",
  as: "amenitiename",
});

db.CollegeAndUniversity.hasMany(db.collegeRecognition, { as: "collegeRecognition" });
db.collegeRecognition.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "collegeRecognition",
});
db.collegeRecognition.belongsTo(db.recognition, {
  foreignKey: "recognition_id",
  as: "recognitionname",
});

db.CollegeAndUniversity.hasMany(db.college_management, { as: "college_management" });
db.college_management.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id ",
  as: "college_management",
});

db.college_management.belongsTo(db.management, {
  foreignKey: "management_id",
  as: "managementname",
});

db.CollegeAndUniversity.hasMany(db.college_groupss, { as: "college_groups" });
db.college_groupss.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_and_university_id",
  as: "college_groupss",
});

db.groups.hasMany(db.college_groupss, { as: "colllegegroup" });
db.college_groupss.belongsTo(db.groups, {
  foreignKey: "group_id",
  as: "groupname",
});







db.CollegeAndUniversity.hasMany(db.placements, { as: "placement",foreignKey:"college_id" });
db.placements.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "placement",
});


db.CollegeAndUniversity.hasMany(db.f_a_qs, { as: "faqs",foreignKey:"college_id" });
db.f_a_qs.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "placement",
});







db.CollegeAndUniversity.hasMany(db.rankings, { as: "rankings",foreignKey:"college_id" });
db.rankings.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "rankings",
});



db.CollegeAndUniversity.hasMany(db.collegegallery, { as: "collegegallery",foreignKey:"college_id" });
db.collegegallery.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "collegegallery",
});

db.school.hasMany(db.schoolgallery, { as: "schoolgallery",foreignKey:"school_id" });
db.schoolgallery.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolgallery",
});

db.CollegeAndUniversity.hasMany(db.cutoff, { as: "cutoff",foreignKey:"college_id" });
db.cutoff.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "cutoff",
});

db.cutoff.hasMany(db.cutoffdetails, { as: "cutoffdetails",foreignKey:"cut_offs_id"});
db.cutoffdetails.belongsTo(db.cutoff, {
  foreignKey: "cut_offs_id",
  as: "cutoffdetails",
});

db.cutoffdetails.belongsTo(db.generalcourse, {
  foreignKey: "course_id",
  as: "coursecutoff",
});








//Courses RELATIONSHIP

db.courses.belongsTo(db.mediums, {
  foreignKey: "medium_id",
  as: "medium",
});
db.eligibilities.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "course1",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "college",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "college",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "courses_college",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "courses_college",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "coursesug",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "coursesug",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "coursespg",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "coursespg",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "coursesdiploma",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "coursesdiploma",
});
db.CollegeAndUniversity.hasMany(db.courses, { as: "coursesdoctorate",foreignKey:"college_id"});
db.courses.belongsTo(db.CollegeAndUniversity, {
  foreignKey: "college_id",
  as: "coursesdoctorate",
});

db.generalcourse.hasMany(db.courses, { as: "course",foreignKey:"course_id"});
db.courses.belongsTo(db.generalcourse, {
  foreignKey: "course_id",
  as: "course",
});
db.courses.hasMany(db.job, { as: "jobanalysis" });
db.job.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "jobanalysis",
});

db.courses.hasMany(db.eligibilities, { as: "eligibilities" });
db.eligibilities.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "eligibilities",
});

db.courses.hasMany(db.salary, { as: "salary" });
db.salary.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "salary",
});

db.courses.hasMany(db.fees, { as: "cousrsefees" });
db.fees.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "cousrsefees",
});
db.courses.hasMany(db.syllabus, { as: "coursesyllabus" ,foreignKey:"course_id"});
db.syllabus.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "coursesyllabus",
});


db.syllabus.hasMany(db.syllabus_details, { as: "syllabussdetails",foreignKey:"syllabus_id"});
db.syllabus_details.belongsTo(db.syllabus, {
  foreignKey: "syllabus_id",
  as: "syllabussdetails",
});

db.courses.hasMany(db.gallery, { as: "gallery" });
db.gallery.belongsTo(db.courses, {
  foreignKey: "course_id",
  as: "gallery",
});



db.courses.hasMany(db.course_companies,{as:"coursecompanies",foreignKey:"courses_id"});
db.course_companies.belongsTo(db.courses, {
  foreignKey: "courses_id",
  as: "coursecompanies",
});




db.fees.hasMany(db.fee_details, { as: "feedetail",foreignKey:"fee_id"});
db.fee_details.belongsTo(db.fees, {
  foreignKey: "fee_id",
  as: "feedetail",
});


//fess relationship
db.courses.hasMany(db.course_modes, { as: "coursemodes",foreignKey:"courses_id"});
db.course_modes.belongsTo(db.courses, {
  foreignKey: "courses_id",
  as: "coursemodes",
});

db.courses.hasMany(db.course_exams, { as: "courseexams",foreignKey:"courses_id"});
db.course_exams.belongsTo(db.courses, {
  foreignKey: "courses_id",
  as: "courseexams",
});


//Exam RELATIONSHIP

db.exam.hasMany(db.newsandevents,{ as: "examnews"});
db.newsandevents.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examnews",
});



db.exam.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "stream",
});
// db.exam.hasMany(db.stream,{ as: "examstream",foreignKey:"stream_id"});
// db.stream.belongsTo(db.exam, {
//   foreignKey: "stream_id",
//   as: "examstream",
// });



db.exam.hasMany(db.exam_eligibilities, { as: "eligibilities" });
db.exam_eligibilities.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "eligibilities",
});
db.exam.hasMany(db.exam_feedetails, { as: "feedetails" });
db.exam_feedetails.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "feedetails",
});
db.exam.hasMany(db.exam_dates, { as: "examdates" });
db.exam_dates.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examdates",
});

db.exam.hasMany(db.exam_agelimits, { as: "examagelimit" });
db.exam_agelimits.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examagelimit",
});
db.exam.hasMany(db.exam_id_proof_details, { as: "examidproof" });
db.exam_id_proof_details.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examidproof",
});
db.exam.hasMany(db.exam_faqs, { as: "examfaqs" });
db.exam_faqs.belongsTo(db.exam, {
  foreignKey: "exam_id",
  as: "examfaqs",
});



//schoolamenities RELATIONSHIP

db.school.hasMany(db.schoolamenities, { as: "schoolamenities" });
db.schoolamenities.belongsTo(db.school, {
  foreignKey:"school_id",
  as: "schoolamenities",
});

db.schoolamenities.belongsTo(db.amenities, {
  foreignKey: "amenities_id",
  as: "schamenitiename",
});

//schoolaccreditations boardschools

db.school.hasMany(db.boardschools, { as: "boardschools" });
db.boardschools.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "boardschools",
});

db.boardschools.belongsTo(db.schoolboards, {
  foreignKey: "board_id",
  as: "schbrdname",
});


//schoolaccreditations levels

db.school.hasMany(db.schoollevels, { as: "schoollevels" });
db.schoollevels.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoollevels",
});

db.schoollevels.belongsTo(db.level, {
  foreignKey: "level_id",
  as: "schlevelname",
});
//schoolaccreditations RELATIONSHIP

db.school.hasMany(db.schoolaccreditations, { as: "schoolaccreditations" });
db.schoolaccreditations.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolaccreditations",
});

db.schoolaccreditations.belongsTo(db.accreditation, {
  foreignKey: "accreditation_id",
  as: "schaccreditationname",
});





//schoolmanagment RELATIONSHIP
db.school.hasMany(db.schoolmanagment, { as: "schoolmanagment" });
db.schoolmanagment.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolmanagment",
});
db.schoolmanagment.belongsTo(db.management, {
  foreignKey: "management_id",
  as: "schmanagementname",
});

//schoolaffiliations RELATIONSHIP
db.school.hasMany(db.schoolaffiliations, { as: "schoolaffiliations" });
db.schoolaffiliations.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolaffiliations",
});
db.schoolaffiliations.belongsTo(db.affilition, {
  foreignKey: "affiliations_id",
  as: "schaffiliationname",
});


//schoolrecognition RELATIONSHIP
db.school.hasMany(db.schoolrecognition, { as: "schoolrecognition" });
db.schoolrecognition.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolrecognition",
});

db.schoolrecognition.belongsTo(db.recognition, {
  foreignKey: "recognition_id",
  as: "schrecognitionname",
});

db.fees.hasMany(db.fee_details, { as: "fees" });
db.fee_details.belongsTo(db.fees, {
  foreignKey: "school_id",
  as: "fee_details",
});



db.school.hasMany(db.school_faqs, { as: "schfaqs",foreignKey:"school_id" });
db.school_faqs.belongsTo(db.school, {
  foreignKey: "school_id",
  as: "schoolfaqs",
});
/***  Relation ship polytechnic  */

// db.city.hasMany(db.polytechnic, { as: "city" });
db.polytechnic.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "citys",
});

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

//schoolmanagment RELATIONSHIP
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

//exam course+exam relationship
db.exam.hasMany(db.course_exams, { as: "exams" });
db.course_exams.belongsTo(db.exam, {
  foreignKey: "exams_id",
  as: "exams",
});




/***  Relation ship blogs  */

db.author.hasMany(db.blog, { as: "author" });
db.blog.belongsTo(db.author, {
  foreignKey: "author_id",
  as: "author",
});
db.categories.hasMany(db.blog, { as: "categories" });
db.blog.belongsTo(db.categories, {
  foreignKey: "category_id",
  as: "categories",
});

// db.college_groups.hasMany(db.blog, { as: "groupsss" });
db.blog.belongsTo(db.groups, {
  foreignKey: "group_id",
  as: "groups",
});


/*** stream Relation ship  */
db.stream.hasMany(db.sub_stream, { as: "substreams" });
db.sub_stream.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "stream",
});


/*** sub stream Relation ship  */
db.stream.hasMany(db.stream_faq, { as: "faqs" });
db.stream_faq.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "stream",
});


/*** generl course Relation ship  */
db.generalcourse.hasMany(db.generalcourse_faqs, { as: "faqs",foreignKey:"generalcourse_id" });
db.generalcourse_faqs.belongsTo(db.generalcourse, {
  foreignKey: "generalcourse_id",
  as: "generalcourse",
});




/*** area with city_id Relation ship  */
db.city.hasMany(db.area, { as: "area" });
db.area.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "city",
});
/***  Relation ship generalcourses  */

db.sub_stream.hasMany(db.generalcourse, { as: "sub_stream" });
db.generalcourse.belongsTo(db.sub_stream, {
  foreignKey: "sub_stream_id",
  as: "sub_stream",
});
db.stream.hasMany(db.generalcourse, { as: "str" });
db.generalcourse.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "streams",
});
db.stream.hasMany(db.generalcourse, { as: "ugcourse" });
db.generalcourse.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "ugcourse",
});
db.stream.hasMany(db.generalcourse, { as: "pgcourse" });
db.generalcourse.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "pgcourse",
});
db.stream.hasMany(db.generalcourse, { as: "diplomacourse" });
db.generalcourse.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "diplomacourse",
});
db.stream.hasMany(db.generalcourse, { as: "doctratecourse" });
db.generalcourse.belongsTo(db.stream, {
  foreignKey: "stream_id",
  as: "doctratecourse",
});


/*** CollegeAndUniversityRelation ship  */
db.city.hasMany(db.CollegeAndUniversity, { as: "CollegeAndUniversity" });
db.CollegeAndUniversity.belongsTo(db.city, {
  foreignKey: "city_id",
  as: "city",
});

db.area.hasMany(db.CollegeAndUniversity, { as: "CollegeAndUniversity" });
db.CollegeAndUniversity.belongsTo(db.area, {
  foreignKey: "area_id",
  as: "area",
});

// db.area.hasMany(db.school, { as: "school" });
// db.school.belongsTo(db.area, {
//   foreignKey: "area_id",
//   as: "area",
// });





/*** Model Include */
/***course relationship */


db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});





db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
