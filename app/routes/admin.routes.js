const { authJwt, globalvalidation } = require("../middleware");
const countriesController = require("../controllers/countries.controller.js");
const statecontroller = require("../controllers/state.controller");
const citycontroller = require("../controllers/city.controller");
const amenitiescontroller = require("../controllers/amenities.controller");
const schoolboardcontroller = require("../controllers/schoolboard.controller");
const schoolcontroller = require("../controllers/school.controller");
const streamcontroller = require("../controllers/stream.controller");
const substreamcontroller = require("../controllers/substream.controller");
const pagecontroller = require("../controllers/page.controller");
const bannercontroller = require("../controllers/banner.controller");
const Collegecontroller = require("../controllers/college.controller.js");
const databackupcontroller = require("../controllers/databackup.controller");
const recognitioncontroller = require("../controllers/recognition.controller");
const generalcoursecontroller = require("../controllers/generalcourse.controller.js");
const enquirycontroller = require("../controllers/enquiry.controller");
const abroadpagecontroller = require("../controllers/abroadpage.controller.js");
const landingpagecontroller = require("../controllers/landingpage.controller.js");
const newscategoriecontroller = require("../controllers/newscategorie.controller.js");
const newsandeventscontroller = require("../controllers/newsandevents.controller.js");
const blogcontroller = require("../controllers/blog.controller");
const examcontroller = require("../controllers/exam.controller");
const scholarlevelcontroller = require("../controllers/scholarlevel.controller");
const scholartypecontroller = require("../controllers/scholartype.controller");
const scholarshipcontroller = require("../controllers/scholarship.controller");
const alljobslocationcontroller = require("../controllers/alljobslocation.controller");
const jobspositioncontroller = require("../controllers/jobsposition.controller");
const joblocationscontroller = require("../controllers/joblocations.controller");
const jobsenquirescontroller = require("../controllers/jobsenquires.controller");
const ourteamscontroller = require("../controllers/ourteams.controller");
const videotestimonialscontroller = require("../controllers/videotestimonials.controller");
const schoolboardrecognitionscontroller = require("../controllers/schoolboardrecognitions.controller");





const admincontroller = require("../controllers/admin.controller");
const accreditationscontroller = require("../controllers/accreditations.controller");
const systemconficontroller = require("../controllers/systemconfig.controller");

const coursescontroller = require("../controllers/courses.controller");

const winston = require("../config/winston");
const managementcontroller = require("../controllers/management.controller");

const areacontroller = require("../controllers/area.controller");



const affilitioncontroller = require("../controllers/affilition.controller");
const Companycontroller = require("../controllers/company.controller");
// const CollegeAndUniversitycontroller = require("../controllers/CollegeAndUniversity.controller");
const aboutcontroller = require("../controllers/about.controller");
const servicecontroller = require("../controllers/service.controller");
const authorcontroller = require("../controllers/author.controller");
const categoriescontroller = require("../controllers/categories.controller");

const polytechniccontroller = require("../controllers/polytechnic.controller");
const reviewcontroller = require("../controllers/review.controller");
const upcoming_coursescontroller = require("../controllers/upcoming_courses.controller");

const eligibilitycontroller = require("../controllers/eligibility.controller");
const salarycontroller = require("../controllers/salary.controller");
const jobcontroller = require("../controllers/course_job_anlyses.controller");
const gallerycontroller = require("../controllers/gallery.controller");
const feescontroller = require("../controllers/fees.controller");
const syllabuscontroller = require("../controllers/syllabus.controller");
const groupscontroller = require("../controllers/groups.controller");
const testimonialcontroller = require("../controllers/testimonial.controller");
const videotestimonialcontroller = require("../controllers/videotestimonial.controller");
const teamcontroller = require("../controllers/team.controller");
const studentformcontroller = require("../controllers/studentform.controller");
const nricontroller = require("../controllers/nri.controller");
const recognitioneditorcontroller = require("../controllers/recognitioneditior.controller");
const informationcontroller = require("../controllers/information.controller");
const jobvaccanciescontroller = require("../controllers/job.controller");
const websiteimagecontroller = require("../controllers/websiteimage.controller");
const websiteimagepopupcontroller = require("../controllers/websitepopupimage.controller");
const redirecturlcontroller = require("../controllers/redirecturl.controller");
const promopagecontroller = require("../controllers/promopage.controller");
// const newsandeventscontroller = require("../controllers/newsandevents.controller");

const usercontroller = require("../controllers/user.controller");



const abroadcountriescontroller = require("../controllers/abroadcountries.controller");
const abroaduniversitiescontroller = require("../controllers/abroaduniversities.controller");
const youtubevideoscontroller = require("../controllers/youtubevideos.controller");






module.exports = function (app) {
  app.use(function (req, res, next) {
    var logmsg = {
      "Request IP": req.ip,
      Method: req.method,
      URL: req.originalUrl,
      statusCode: res.statusCode,
      headers: req.headers,
      Time: new Date(),
      ErrorMessage: "Display Error If Any for this request",
    };

    let requestBody =
      typeof req.body !== "string" ? JSON.stringify(req.body) : req.body;
    winston.log(
      "info",
      "Method:" +
      req.method +
      " Path:" +
      req.path +
      " Request Body:" +
      req.ip +
      " Request IP:" +
      requestBody +
      " statusCode:" +
      res.statusCode +
      " headers:" +
      req.headers +
      "Time" +
      new Date()
    );
    winston.log("info", "--------------------------------------------------");

    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

    /* ENQUIRY Routes start*/

    app.get(
      "/api/admin/enquiry/get",
      [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
      enquirycontroller.findAll
    );
  
    app.get(
      "/api/admin/enquiry/get/:id",
      [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
      enquirycontroller.findOne
    );
  

  
    app.post(
      "/api/admin/enquiry/delete/:id",
      [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
      enquirycontroller.delete
    );
  

    
    /** enquiry Routes End*/

  /*  Recognisation route End    */

  app.post(
    "/api/admin/recognition/add",
    globalvalidation.recognitionSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioncontroller.create
  );

  app.get(
    "/api/admin/recognition/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioncontroller.findAll
  );

  app.post(
    "/api/admin/recognition/update",
    globalvalidation.recognitionUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioncontroller.update
  );

  app.get(
    "/api/admin/recognition/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioncontroller.findOne
  );



  app.post(
    "/api/admin/recognition/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioncontroller.delete
  );


  /** Recognisation route  End*/
  /** Data backup  start*/


  app.get(
    "/api/admin/backup/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    databackupcontroller.findAll
  );
  app.get(
    "/api/admin/backup/download/:file",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    databackupcontroller.downloadfile
  );
  app.get(
    "/api/admin/backup/request",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    databackupcontroller.backuprequest
  );


  /** Data backup  End*/

  /**  redirecturl Routes Start  **/

  app.get(
    "/api/admin/redirect-url/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    redirecturlcontroller.findAll
  );

  app.get(
    "/api/admin/redirect-url/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    redirecturlcontroller.findOne
  );

  app.post(
    "/api/admin/redirect-url/add",
    globalvalidation.RedirecturlSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    redirecturlcontroller.create
  );

  app.post(
    "/api/admin/redirect-url/update",
    globalvalidation.RedirecturlSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    redirecturlcontroller.update
  );

  app.post(
    "/api/admin/redirect-url/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    redirecturlcontroller.delete
  );


  /**  Countries Routes start **/

  app.get(
    "/api/admin/countries/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    countriesController.findAll
  );
  app.post(
    "/api/admin/countries/add",
    globalvalidation.countrySchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    countriesController.create
  );
  app.get(
    "/api/admin/countries/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    countriesController.findOne
  );



  app.post(
    "/api/admin/countries/update",
    globalvalidation.countriesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    countriesController.update
  );

  app.delete(
    "/api/admin/countries/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    countriesController.delete
  );

  /**  state Routes End*/
  app.get(
    "/api/admin/state/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    statecontroller.findAll
  );

  app.get(
    "/api/admin/state/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    statecontroller.findOne
  );

  app.post(
    "/api/admin/state/add",
    globalvalidation.stateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    statecontroller.create
  );

  app.post(
    "/api/admin/state/update",
    globalvalidation.updatestateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    statecontroller.update
  );

  app.post(
    "/api/admin/state/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    statecontroller.delete
  );

  /**  state Routes End*/

  /**  city Routes End*/
  app.get(
    "/api/admin/city/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    citycontroller.findAll
  );

  app.get(
    "/api/admin/city/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    citycontroller.findOne
  );

  app.post(
    "/api/admin/city/add",
    globalvalidation.citySchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    citycontroller.create
  );

  app.post(
    "/api/admin/city/update",
    globalvalidation.cityUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    citycontroller.update
  );

  app.post(
    "/api/admin/city/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    citycontroller.delete
  );

  /**  city Routes End*/

  /**  Amenities Routes Start*/
  app.get(
    "/api/admin/amenities/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    amenitiescontroller.findAll
  );

  app.get(
    "/api/admin/amenities/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    amenitiescontroller.findOne
  );

  app.post(
    "/api/admin/amenities/add",
    globalvalidation.AmenitiesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    amenitiescontroller.create
  );

  app.post(
    "/api/admin/amenities/update",
    globalvalidation.AmenitiesSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    amenitiescontroller.update
  );

  app.post(
    "/api/admin/amenities/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    amenitiescontroller.delete
  );
  /** amenities Routes End*/

   /** courses  route  start*/

   app.get(
    "/api/admin/courses/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.findAll
  );
  app.get(
    "/api/admin/courses/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.findOne
  );
  app.post(
    "/api/admin/courses/add",
    globalvalidation.coursesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.create
  );
  app.post(
    "/api/admin/courses/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.delete
  );
  app.post(
    "/api/admin/courses/update",
    globalvalidation.coursesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.update
  );

  app.post(
    "/api/admin/courses/updatejob",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updatejob_analysis
  );

  app.post(
    "/api/admin/courses/updateeligibilities",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updateeligibilities
  );
  app.post(
    "/api/admin/courses/updatesalary",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updatesalary
  );

  app.post(
    "/api/admin/courses/updategallery",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updategallery
  );
  app.post(
    "/api/admin/courses/updatefees",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updatefees
  );
  app.post(
    "/api/admin/courses/updatesyllabus",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.updatesyllabus
  );

  app.get(
    "/api/admin/coursesmediums/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.mediumfindAll
  );
  app.get(
    "/api/admin/coursesmodes/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    coursescontroller.modesfindAll
  );

  /** courses  route  End*/



  //**** schoolboard  Routes start  *****/

  app.get(
    "/api/admin/schoolboard/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.findAll
  );

  app.get(
    "/api/admin/schoolboard/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.findOne
  );

  app.post(
    "/api/admin/schoolboard/add",
    globalvalidation.schoolboardSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.create
  );

  app.post(
    "/api/admin/schoolboard/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.delete
  );

  app.post(
    "/api/admin/schoolboard/update",
    globalvalidation.schoolboardUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.update
  );

  app.post(
    "/api/admin/schoolboard/updatefaq",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardcontroller.updatefaq
  );

  //**** school board recognitions Routes start  *****/

  app.get(
    "/api/admin/schoolboardrecognition/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardrecognitionscontroller.findAll
  );

  app.get(
    "/api/admin/schoolboardrecognition/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardrecognitionscontroller.findOne
  );

  app.post(
    "/api/admin/schoolboardrecognition/add",
    globalvalidation.schoolboardrecognitionSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardrecognitionscontroller.create
  );

  app.post(
    "/api/admin/schoolboardrecognition/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardrecognitionscontroller.delete
  );

  app.post(
    "/api/admin/schoolboardrecognition/update",
    globalvalidation.schoolboardrecognitionUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolboardrecognitionscontroller.update
  );

  
  //**** school Routes start  *****/

  app.get(
    "/api/admin/school/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.findAll
  );

  app.get(
    "/api/admin/school/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.findOne
  );

  app.post(
    "/api/admin/school/add",
    globalvalidation.schoolSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.create
  );


  app.post(
    "/api/admin/school/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.delete
  );

  app.post(
    "/api/admin/school/update",
    globalvalidation.schoolUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.update
  );

  app.post(
    "/api/admin/school/updatefaqs",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.updatefaqs
  );

  app.get(
    "/api/admin/schoollevel/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.schoollevelfindAll
  );


 

  app.post(
    "/api/admin/school/updategallery",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    schoolcontroller.updategallery
  );


  /**  Stream Routes Start*/
  app.get(
    "/api/admin/stream/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    streamcontroller.findAll
  );

  app.get(
    "/api/admin/stream/get/:id",
    [globalvalidation.Validate],
    streamcontroller.findOne
  );

  app.get(
    "/api/admin/streamweb/get/:id",
    [globalvalidation.Validate],
    streamcontroller.findOneWebView
  );

  app.post(
    "/api/admin/stream/add",
    globalvalidation.StreamSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    streamcontroller.create
  );

  app.post(
    "/api/admin/stream/update",
    globalvalidation.StreamSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    streamcontroller.update
  );

  app.post(
    "/api/admin/stream/updatefaq",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    streamcontroller.updatefaqs
  );

  app.post(
    "/api/admin/stream/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    streamcontroller.delete
  );

  /**  Stream Routes End*/

  /** Sub Stream Routes Start*/

  app.post(
    "/api/admin/substream/add",
    globalvalidation.SubStreamSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    substreamcontroller.create
  );

  app.get(
    "/api/admin/substream/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    substreamcontroller.findAll
  );

  app.get(
    "/api/admin/substream/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    substreamcontroller.findOne
  );

  app.post(
    "/api/admin/substream/update",
    globalvalidation.SubStreamSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    substreamcontroller.update
  );

  app.post(
    "/api/admin/substream/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    substreamcontroller.delete
  );

  /** Sub Stream Routes End*/

  /**  Page Routes Start*/
  app.get(
    "/api/admin/page/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    pagecontroller.findAll
  );

  app.get(
    "/api/admin/page/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    pagecontroller.findOne
  );

  app.post(
    "/api/admin/page/add",
    globalvalidation.PageSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    pagecontroller.create
  );

  app.post(
    "/api/admin/page/update",
    globalvalidation.PageUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    pagecontroller.update
  );

  app.post(
    "/api/admin/page/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    pagecontroller.delete
  );

  /**  page Routes End*/

  /**  banner Routes End*/

  app.get(
    "/api/admin/banner/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    bannercontroller.findAll
  );

  app.get(
    "/api/admin/banner/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    bannercontroller.findOne
  );

  app.post(
    "/api/admin/banner/add",
    globalvalidation.bannerSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    bannercontroller.create
  );

  app.post(
    "/api/admin/banner/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    bannercontroller.delete
  );

  app.post(
    "/api/admin/banner/update",
    globalvalidation.bannerUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    bannercontroller.update
  );
  /**  banner Routes End*/


  /** College route start*/

  app.post(
    "/api/admin/college/add",
    globalvalidation.CollegeSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.create
  );

  app.get(
    "/api/admin/college/get",
    Collegecontroller.findAll
  );
  app.get(
    "/api/admin/college/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.findOne
  );

  app.post(
    "/api/admin/college/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.delete
  );
  app.post(
    "/api/admin/college/update",
    globalvalidation.CollegeUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.update
  );


  app.post(
    "/api/admin/college/updatefaqs",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.updatefaqs
  );

  app.post(
    "/api/admin/college/updategallery",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Collegecontroller.updategallery
  );



  /** College route end   */

  /**  generalcourses  Routes Start*/
  app.get(
    "/api/admin/generalcourse/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    generalcoursecontroller.findAll
  );

  app.post(
    "/api/admin/generalcourse/add",
    globalvalidation.GeneralcoursesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    generalcoursecontroller.create
  );

  app.post(
    "/api/admin/generalcourse/update",
    globalvalidation.GeneralcoursesSchemaupdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    generalcoursecontroller.update
  );

  app.post(
    "/api/admin/generalcourse/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    generalcoursecontroller.delete
  );
  app.get(
    "/api/admin/generalcourse/get/:id",
    [globalvalidation.Validate],
    generalcoursecontroller.findOne
  );

  app.post(
    "/api/admin/generalcourse/updatefaq",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    generalcoursecontroller.updatefaq
  );
  /** generalcourse Routes End*/


   /**  abroad pages Routes Start*/
   app.get(
    "/api/admin/abroadpage/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadpagecontroller.findAll
  );

  app.get(
    "/api/admin/abroadpage/get/:id",
    [globalvalidation.Validate],
    abroadpagecontroller.findOne
  );


  app.post(
    "/api/admin/abroadpage/add",
    globalvalidation.abroadpageSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadpagecontroller.create
  );

  app.post(
    "/api/admin/abroadpage/update",
    globalvalidation.abroadpageUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadpagecontroller.update
  );

  app.post(
    "/api/admin/abroadpage/updatefaq",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadpagecontroller.updatefaqs
  );

  app.post(
    "/api/admin/abroadpage/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadpagecontroller.delete
  );

  /**  Stream Routes End*/

  

   /**  landingpage Routes End*/
   
   app.get(
    "/api/admin/landingpage/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    landingpagecontroller.findAll
  );

  app.get(
    "/api/admin/landingpage/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    landingpagecontroller.findOne
  );

  app.post(
    "/api/admin/landingpage/add",
    globalvalidation.landingpageSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    landingpagecontroller.create
  );

  app.post(
    "/api/admin/landingpage/update",
    globalvalidation.landingpageUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    landingpagecontroller.update
  );

  app.post(
    "/api/admin/landingpage/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    landingpagecontroller.delete
  );

  /**  landingpage Routes End*/


/**  news categories Routes Start*/
   
app.get(
  "/api/admin/newscategories/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newscategoriecontroller.findAll
);

app.get(
  "/api/admin/newscategories/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newscategoriecontroller.findOne
);

app.post(
  "/api/admin/newscategories/add",
  globalvalidation.newscategoriesSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newscategoriecontroller.create
);

app.post(
  "/api/admin/newscategories/update",
  globalvalidation.newscategoriesUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newscategoriecontroller.update
);

app.post(
  "/api/admin/newscategories/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newscategoriecontroller.delete
);

/**  news categories Routes End*/



/**  news and events Routes Start*/
   
app.get(
  "/api/admin/newsevents/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newsandeventscontroller.findAll
);

app.get(
  "/api/admin/newsevents/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newsandeventscontroller.findOne
);

app.post(
  "/api/admin/newsevents/add",
  globalvalidation.newsandeventsSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newsandeventscontroller.create
);

app.post(
  "/api/admin/newsevents/update",
  globalvalidation.newsandeventsUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newsandeventscontroller.update
);

app.post(
  "/api/admin/newsevents/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  newsandeventscontroller.delete
);

/**  news and events Routes End*/

 /* blog Routes start*/

 app.get(
  "/api/admin/blog/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  blogcontroller.findAll
);

app.get(
  "/api/admin/blog/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  blogcontroller.findOne
);

app.post(
  "/api/admin/blog/add",
  globalvalidation.blogSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  blogcontroller.create
);

app.post(
  "/api/admin/blog/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  blogcontroller.delete
);

app.post(
  "/api/admin/blog/update",
  globalvalidation.blogUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  blogcontroller.update
);

  
 /** exam  route  End*/

 app.get(
  "/api/admin/exam/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.findAll
);
app.get(
  "/api/admin/exam/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.findOne
);
app.post(
  "/api/admin/exam/add",
  globalvalidation.examSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.create
);
app.post(
  "/api/admin/exam/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.delete
);
app.post(
  "/api/admin/exam/update",
  globalvalidation.examUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.update
);
app.post(
  "/api/admin/exam/updatefaq",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  examcontroller.updatefaq
);
// app.post(
//   "/api/admin/exam/updateeligibilities",
//   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
//   examcontroller.updateeligibilities
// );
// app.post(
//   "/api/admin/exam/updatefees",
//   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
//   examcontroller.updatefees
// );
// app.post(
//   "/api/admin/exam/updateexamdates",
//   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
//   examcontroller.updateexamdates
// );

// app.post(
//   "/api/admin/exam/updateexamagelimit",
//   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
//   examcontroller.updateexamagelimit
// );
// app.post(
//   "/api/admin/exam/updateexamifproof",
//   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
//   examcontroller.updateexamifproof
// );


/** Exam  route  End*/

/** scholar level route  start*/

app.get(
  "/api/admin/scholarlevel/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarlevelcontroller.findAll
);
app.get(
  "/api/admin/scholarlevel/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarlevelcontroller.findOne
);
app.post(
  "/api/admin/scholarlevel/add",
  globalvalidation.scholarlevelSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarlevelcontroller.create
);
app.post(
  "/api/admin/scholarlevel/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarlevelcontroller.delete
);
app.post(
  "/api/admin/scholarlevel/update",
  globalvalidation.scholarlevelUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarlevelcontroller.update
);

/**scholar level route end   */

/** scholar type route  start*/

app.get(
  "/api/admin/scholartype/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholartypecontroller.findAll
);
app.get(
  "/api/admin/scholartype/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholartypecontroller.findOne
);
app.post(
  "/api/admin/scholartype/add",
  globalvalidation.scholartypeSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholartypecontroller.create
);
app.post(
  "/api/admin/scholartype/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholartypecontroller.delete
);
app.post(
  "/api/admin/scholartype/update",
  globalvalidation.scholartypeUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholartypecontroller.update
);

/**scholar level route end   */

/** scholarship route  start*/

app.get(
  "/api/admin/scholarship/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarshipcontroller.findAll
);
app.get(
  "/api/admin/scholarship/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarshipcontroller.findOne
);
app.post(
  "/api/admin/scholarship/add",
  globalvalidation.scholarshipSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarshipcontroller.create
);
app.post(
  "/api/admin/scholarship/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarshipcontroller.delete
);
app.post(
  "/api/admin/scholarship/update",
  globalvalidation.scholarshipUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  scholarshipcontroller.update
);

/**scholar level route end   */


/** all job locations route  start*/

app.get(
  "/api/admin/alljoblocation/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  alljobslocationcontroller.findAll
);
app.get(
  "/api/admin/alljoblocation/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  alljobslocationcontroller.findOne
);
app.post(
  "/api/admin/alljoblocation/add",
  globalvalidation.alljoblocationSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  alljobslocationcontroller.create
);
app.post(
  "/api/admin/alljoblocation/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  alljobslocationcontroller.delete
);
app.post(
  "/api/admin/alljoblocation/update",
  globalvalidation.alljoblocationUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  alljobslocationcontroller.update
);

/**all job locations route end   */


/** jobs positions route  start*/

app.get(
  "/api/admin/jobsposition/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobspositioncontroller.findAll
);
app.get(
  "/api/admin/jobsposition/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobspositioncontroller.findOne
);
app.post(
  "/api/admin/jobsposition/add",
  globalvalidation.jobspositionsSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobspositioncontroller.create
);
app.post(
  "/api/admin/jobsposition/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobspositioncontroller.delete
);
app.post(
  "/api/admin/jobsposition/update",
  globalvalidation.jobspositionsUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobspositioncontroller.update
);

/**jobs positions route end   */

/** job locations route  start*/

app.get(
  "/api/admin/joblocations/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  joblocationscontroller.findAll
);
app.get(
  "/api/admin/joblocations/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  joblocationscontroller.findOne
);
app.post(
  "/api/admin/joblocations/add",
  globalvalidation.joblocationsSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  joblocationscontroller.create
);
app.post(
  "/api/admin/joblocations/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  joblocationscontroller.delete
);
app.post(
  "/api/admin/joblocations/update",
  globalvalidation.joblocationsUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  joblocationscontroller.update
);

/**job locations route end   */


/** jobs enquires route  start*/

app.get(
  "/api/admin/jobsenquires/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobsenquirescontroller.findAll
);
app.get(
  "/api/admin/jobsenquires/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobsenquirescontroller.findOne
);
app.post(
  "/api/admin/jobsenquires/add",
  globalvalidation.jobsenquiresSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobsenquirescontroller.create
);
app.post(
  "/api/admin/jobsenquires/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobsenquirescontroller.delete
);
app.post(
  "/api/admin/jobsenquires/update",
  globalvalidation.jobsenquiresUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  jobsenquirescontroller.update
);

/**all-job-locations route end   */


/** our teams route  start*/

app.get(
  "/api/admin/ourteams/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  ourteamscontroller.findAll
);
app.get(
  "/api/admin/ourteams/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  ourteamscontroller.findOne
);
app.post(
  "/api/admin/ourteams/add",
  globalvalidation.ourteamsSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  ourteamscontroller.create
);
app.post(
  "/api/admin/ourteams/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  ourteamscontroller.delete
);
app.post(
  "/api/admin/ourteams/update",
  globalvalidation.ourteamsUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  ourteamscontroller.update
);

/** our teams route end   */

/** video testimonials route  start*/

app.get(
  "/api/admin/videotestimonials/get",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  videotestimonialscontroller.findAll
);
app.get(
  "/api/admin/videotestimonials/get/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  videotestimonialscontroller.findOne
);
app.post(
  "/api/admin/videotestimonials/add",
  globalvalidation.videotestimonialsSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  videotestimonialscontroller.create
);
app.post(
  "/api/admin/videotestimonials/delete/:id",
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  videotestimonialscontroller.delete
);
app.post(
  "/api/admin/videotestimonials/update",
  globalvalidation.videotestimonialsUpdateSchema,
  [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  videotestimonialscontroller.update
);

/** video testimonials route end   */



  ////////////////////////old apis-------------------------------------------------------------------------------



  app.get(
    "/api/admin/dashboardcounts",
    [authJwt.verifyToken, authJwt.isAdmin],
    admincontroller.adminBoard
  );


  /* abroaduniversitiescontroller Routes start*/
  app.get(
    "/api/admin/abroaduniversities/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroaduniversitiescontroller.findAll
  );

  app.get(
    "/api/admin/abroaduniversities/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroaduniversitiescontroller.findOne
  );

  app.post(
    "/api/admin/abroaduniversities/add",
    globalvalidation.abroaduniversitiesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroaduniversitiescontroller.create
  );

  app.post(
    "/api/admin/abroaduniversities/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroaduniversitiescontroller.delete
  );

  app.post(
    "/api/admin/abroaduniversities/update",
    globalvalidation.abroaduniversitiesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroaduniversitiescontroller.update
  );

  /* abroaduniversitiescontroller Routes End*/


  /* abroardcountries Routes start*/
  app.get(
    "/api/admin/abroadcountries/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadcountriescontroller.findAll
  );

  app.get(
    "/api/admin/abroadcountries/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadcountriescontroller.findOne
  );

  app.post(
    "/api/admin/abroadcountries/add",
    globalvalidation.abroadcountriesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadcountriescontroller.create
  );

  app.post(
    "/api/admin/abroadcountries/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadcountriescontroller.delete
  );

  app.post(
    "/api/admin/abroadcountries/update",
    globalvalidation.abroadcountriesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    abroadcountriescontroller.update
  );

  /* abroardcountries Routes End*/


  /**  sytemconfig  Routes Start*/
  /**  sysytem config  Routes Start*/
  app.get(
    "/api/admin/systemconfig/coursetype",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAllcoursetype
  );

  app.get(
    "/api/admin/systemconfig/type",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAlltype
  );
  app.get(
    "/api/admin/systemconfig/collegetype",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAllcollegetype
  );
  app.get(
    "/api/admin/systemconfig/gender_accepted",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAllgender_accepted
  );
  app.get(
    "/api/admin/systemconfig/size_type",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAllsize_type
  );
  app.get(
    "/api/admin/systemconfig/home_view_status",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    systemconficontroller.findAllhome_view_status
  );
  /**  systemconfig  Routes end*/

  app.get(
    "/api/admin/users/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    usercontroller.findAll
  );
  app.post(
    "/api/admin/users/changestatus/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    usercontroller.changestatus
  );




  /** newsand event route  start*/

  // app.get(
  //   "/api/admin/newsandevents/get",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   newsandeventscontroller.findAll
  // );
  // app.get(
  //   "/api/admin/newsandevents/get/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   newsandeventscontroller.findOne
  // );
  // app.post(
  //   "/api/admin/newsandevents/add",
  //   globalvalidation.newsandeventsSchema,
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   newsandeventscontroller.create
  // );
  // app.post(
  //   "/api/admin/newsandevents/delete/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   newsandeventscontroller.delete
  // );
  // app.post(
  //   "/api/admin/newsandevents/update",
  //   globalvalidation.newsandeventsUpdateSchema,
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   newsandeventscontroller.update
  // );
  /** newsand event route end   */

  /**  promo Routes Start*/
  app.get(
    "/api/admin/promo-page/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    promopagecontroller.findAll
  );

  app.get(
    "/api/admin/promo-page/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    promopagecontroller.findOne
  );

  app.post(
    "/api/admin/promo-page/add",
    globalvalidation.PromopageSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    promopagecontroller.create
  );

  app.post(
    "/api/admin/promo-page/update",
    globalvalidation.PromopageSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    promopagecontroller.update
  );

  app.post(
    "/api/admin/promo-page/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    promopagecontroller.delete
  );


  /**  job Routes Start*/
  app.get(
    "/api/admin/job_vacancies/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobvaccanciescontroller.findAll
  );

  app.get(
    "/api/admin/job_vacancies/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobvaccanciescontroller.findOne
  );

  app.post(
    "/api/admin/job_vacancies/add",
    globalvalidation.JobvacanciesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobvaccanciescontroller.create
  );

  app.post(
    "/api/admin/job_vacancies/update",
    globalvalidation.JobvacanciesSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobvaccanciescontroller.update
  );

  app.post(
    "/api/admin/job_vacancies/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobvaccanciescontroller.delete
  );

  /**  websiteimage popup Routes Start*/

  app.post(
    "/api/admin/website-popup-image/edit",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    websiteimagepopupcontroller.createorupdate
  );
  /**  websiteimage  Routes Start*/

  app.post(
    "/api/admin/website-image/edit",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    websiteimagecontroller.createorupdate
  );

  /**  about  Routes Start*/

  app.post(
    "/api/admin/about",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    aboutcontroller.createorupdate
  );
  app.get(
    "/api/admin/about/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    aboutcontroller.findOne
  );

  /**  information  Routes Start*/

  app.post(
    "/api/admin/information",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    informationcontroller.createorupdate
  );
  app.get(
    "/api/admin/information/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    informationcontroller.findOne
  );

  /**  services Routes Start*/

  app.post(
    "/api/admin/service",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    servicecontroller.createorupdate
  );
  app.get(
    "/api/admin/service/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    servicecontroller.findOne
  );

  /**  recognitioneditor Routes Start*/

  app.post(
    "/api/admin/recognition_editor",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioneditorcontroller.createorupdate
  );
  app.get(
    "/api/admin/recognition_editor/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    recognitioneditorcontroller.findOne
  );
  /**  Nri Routes Start*/

  app.post(
    "/api/admin/nri",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    nricontroller.createorupdate
  );
  app.get(
    "/api/admin/nri/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    nricontroller.findOne
  );

  /**  student_form Routes Start*/
  app.get(
    "/api/admin/student_form/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    studentformcontroller.findAll
  );

  app.get(
    "/api/admin/student_form/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    studentformcontroller.findOne
  );

  app.post(
    "/api/admin/student_form/add",
    globalvalidation.StudentformSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    studentformcontroller.create
  );

  app.post(
    "/api/admin/student_form/update",
    globalvalidation.StudentformSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    studentformcontroller.update
  );

  app.post(
    "/api/admin/student_form/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    studentformcontroller.delete
  );

  /**  Stream Routes End*/

  //**** team Routes start  *****/

  app.get(
    "/api/admin/team/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    teamcontroller.findAll
  );

  app.get(
    "/api/admin/team/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    teamcontroller.findOne
  );

  app.post(
    "/api/admin/team/add",
    globalvalidation.TeamSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    teamcontroller.create
  );

  app.post(
    "/api/admin/team/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    teamcontroller.delete
  );

  app.post(
    "/api/admin/team/update",
    globalvalidation.TeamUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    teamcontroller.update
  );

  //**** Testimonial Routes start  *****/

  app.get(
    "/api/admin/testimonial/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    testimonialcontroller.findAll
  );

  app.get(
    "/api/admin/testimonial/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    testimonialcontroller.findOne
  );

  app.post(
    "/api/admin/testimonial/add",
    globalvalidation.TestimonialSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    testimonialcontroller.create
  );

  app.post(
    "/api/admin/testimonial/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    testimonialcontroller.delete
  );

  app.post(
    "/api/admin/testimonial/update",
    globalvalidation.TestimonialUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    testimonialcontroller.update
  );
  //**** Video Testimonial Routes start  *****/

  app.get(
    "/api/admin/videotestimonial/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    videotestimonialcontroller.findAll
  );

  app.get(
    "/api/admin/videotestimonial/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    videotestimonialcontroller.findOne
  );

  app.post(
    "/api/admin/videotestimonial/add",
    globalvalidation.VideoTestimonialSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    videotestimonialcontroller.create
  );

  app.post(
    "/api/admin/videotestimonial/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    videotestimonialcontroller.delete
  );

  app.post(
    "/api/admin/videotestimonial/update",
    globalvalidation.VideoTestimonialUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    videotestimonialcontroller.update
  );
  //**** youtubevideoscontroller  Routes start  *****/

  app.get(
    "/api/admin/youtubevideo/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    youtubevideoscontroller.findAll
  );

  app.get(
    "/api/admin/youtubevideo/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    youtubevideoscontroller.findOne
  );

  app.post(
    "/api/admin/youtubevideo/add",
    globalvalidation.YoutubeVideoSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    youtubevideoscontroller.create
  );

  app.post(
    "/api/admin/youtubevideo/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    youtubevideoscontroller.delete
  );

  app.post(
    "/api/admin/youtubevideo/update",
    globalvalidation.YoutubeVideoSchemaupdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    youtubevideoscontroller.update
  );

  //**** Groups Routes start  *****/

  app.get(
    "/api/admin/group/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    groupscontroller.findAll
  );

  app.get(
    "/api/admin/group/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    groupscontroller.findOne
  );

  app.post(
    "/api/admin/group/add",
    globalvalidation.groupsSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    groupscontroller.create
  );

  app.post(
    "/api/admin/group/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    groupscontroller.delete
  );

  app.post(
    "/api/admin/group/update",
    globalvalidation.groupsUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    groupscontroller.update
  );

  //**** Review Routes start  *****/

  app.get(
    "/api/admin/review/get", reviewcontroller.findAll
  );

  app.get(
    "/api/admin/review/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    reviewcontroller.findOne
  );

  app.post(
    "/api/admin/review/add",
    globalvalidation.reviewSchema, reviewcontroller.create
  );

  app.post(
    "/api/admin/review/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    reviewcontroller.delete
  );

  app.post(
    "/api/admin/review/update",
    globalvalidation.reviewUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    reviewcontroller.update
  );
  app.post(
    "/api/admin/review/changestatus",
    globalvalidation.reviewchangestatusSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    reviewcontroller.changestatus
  );




  //**** polytechnic Routes start  *****/

  app.get(
    "/api/admin/polytechnic/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.findAll
  );
  app.get(
    "/api/admin/polytechnictype/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.PolytechnictypefindAll
  );

  app.get(
    "/api/admin/polytechnic/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.findOne
  );

  app.post(
    "/api/admin/polytechnic/add",
    globalvalidation.polytechnicSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.create
  );

  app.post(
    "/api/admin/polytechnic/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.delete
  );

  app.post(
    "/api/admin/polytechnic/update",
    globalvalidation.polytechnicUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    polytechniccontroller.update
  );

 
  /* author Routes start*/

  app.get(
    "/api/admin/author/get",
    // [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    authorcontroller.findAll
  );

  app.get(
    "/api/admin/author/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    authorcontroller.findOne
  );

  app.post(
    "/api/admin/author/add",
    globalvalidation.authorSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    authorcontroller.create
  );

  app.post(
    "/api/admin/author/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    authorcontroller.delete
  );

  app.post(
    "/api/admin/author/update",
    globalvalidation.authorUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    authorcontroller.update
  );

  /* author Routes end*/

  /* categories Routes start*/
  app.get(
    "/api/admin/categories/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    categoriescontroller.findAll
  );

  app.get(
    "/api/admin/categories/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    categoriescontroller.findOne
  );

  app.post(
    "/api/admin/categories/add",
    globalvalidation.categoriesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    categoriescontroller.create
  );

  app.post(
    "/api/admin/categories/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    categoriescontroller.delete
  );

  app.post(
    "/api/admin/categories/update",
    globalvalidation.categoriesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    categoriescontroller.update
  );

  /* categories Routes End*/


  /**  accreditations Routes Start*/

  app.get(
    "/api/admin/accreditations/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    accreditationscontroller.findAll
  );

  app.post(
    "/api/admin/accreditations/add",
    globalvalidation.AccreditationsSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    accreditationscontroller.create
  );

  app.post(
    "/api/admin/accreditations/update",
    globalvalidation.AccreditationsSchemaUpdate,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    accreditationscontroller.update
  );

  app.post(
    "/api/admin/accreditations/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    accreditationscontroller.delete
  );
  app.get(
    "/api/admin/accreditations/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    accreditationscontroller.findOne
  );
  /** accreditations Routes End*/










  /**  area Routes start*/

  app.get(
    "/api/admin/area/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    areacontroller.findAll
  );

  app.get(
    "/api/admin/area/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    areacontroller.findOne
  );

  app.post(
    "/api/admin/area/add",
    globalvalidation.areaSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    areacontroller.create
  );

  app.post(
    "/api/admin/area/update",
    globalvalidation.areaUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    areacontroller.update
  );

  app.post(
    "/api/admin/area/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    areacontroller.delete
  );

  /**  area Routes End*/





  /* management Routes start*/

  app.get(
    "/api/admin/management/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    managementcontroller.findAll
  );

  app.get(
    "/api/admin/management/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    managementcontroller.findOne
  );

  app.post(
    "/api/admin/management/add",
    globalvalidation.managementSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    managementcontroller.create
  );

  app.post(
    "/api/admin/management/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    managementcontroller.delete
  );

  app.post(
    "/api/admin/management/update",
    globalvalidation.managementUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    managementcontroller.update
  );
  /**  management Routes End        */



  /* Affilition route start*/

  app.get(
    "/api/admin/affilition/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    affilitioncontroller.findAll
  );

  app.get(
    "/api/admin/affilition/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    affilitioncontroller.findOne
  );

  app.post(
    "/api/admin/affilition/add",
    globalvalidation.affilitionSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    affilitioncontroller.create
  );

  app.post(
    "/api/admin/affilition/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    affilitioncontroller.delete
  );

  app.post(
    "/api/admin/affilition/update",
    globalvalidation.affilitionUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    affilitioncontroller.update
  );
  /** Affilation route end*/

  /** CollegeAndUniversity route start*/

  // app.get(
  //   "/api/admin/CollegeAndUniversity/get",
  //   CollegeAndUniversitycontroller.findAll
  // );
  // app.get(
  //   "/api/admin/CollegeAndUniversity/get/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.findOne
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/add",
  //   globalvalidation.CollegeAndUniversitySchema,
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.create
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/delete/:id",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.delete
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/update",
  //   globalvalidation.CollegeAndUniversityUpdateSchema,
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.update
  // );

  // app.post(
  //   "/api/admin/CollegeAndUniversity/updateplacements",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.updateplacements
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/updatefaqs",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.updatefaqs
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/updaterankings",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.updateranking
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/updategallery",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.updategallery
  // );
  // app.post(
  //   "/api/admin/CollegeAndUniversity/updatecutoff",
  //   [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
  //   CollegeAndUniversitycontroller.updatecutoff
  // );
  /** CollegeAndUniversity route end   */

  /** Companies route  start*/

  app.get(
    "/api/admin/Company/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Companycontroller.findAll
  );
  app.get(
    "/api/admin/Company/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Companycontroller.findOne
  );
  app.post(
    "/api/admin/Company/add",
    globalvalidation.CompanySchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Companycontroller.create
  );
  app.post(
    "/api/admin/Company/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Companycontroller.delete
  );
  app.post(
    "/api/admin/Company/update",
    globalvalidation.CompanyUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    Companycontroller.update
  );
  /** companies route end   */

  /** upcoming_courses  route  start*/

  app.get(
    "/api/admin/upcoming_courses/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    upcoming_coursescontroller.findAll
  );
  app.get(
    "/api/admin/upcoming_courses/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    upcoming_coursescontroller.findOne
  );
  app.post(
    "/api/admin/upcoming_courses/add",
    globalvalidation.upcoming_coursesSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    upcoming_coursescontroller.create
  );
  app.post(
    "/api/admin/upcoming_courses/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    upcoming_coursescontroller.delete
  );
  app.post(
    "/api/admin/upcoming_courses/update",
    globalvalidation.upcoming_coursesUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    upcoming_coursescontroller.update
  );

  /**upcoming_courses  route end   */


 

  /**upcoming_courses  route end   */

  /** courses eligibility route  start*/

  app.get(
    "/api/admin/eligibility/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    eligibilitycontroller.findAll
  );
  app.get(
    "/api/admin/eligibility/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    eligibilitycontroller.findOne
  );
  app.post(
    "/api/admin/eligibility/add",
    globalvalidation.eligibilitySchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    eligibilitycontroller.create
  );
  app.post(
    "/api/admin/eligibility/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    eligibilitycontroller.delete
  );
  app.post(
    "/api/admin/eligibility/update",
    globalvalidation.eligibilityUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    eligibilitycontroller.update
  );
  /**courses eligibility route end   */

  /** salary trend route  start*/

  app.get(
    "/api/admin/salary/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    salarycontroller.findAll
  );
  app.get(
    "/api/admin/salary/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    salarycontroller.findOne
  );
  app.post(
    "/api/admin/salary/add",
    globalvalidation.salarySchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    salarycontroller.create
  );
  app.post(
    "/api/admin/salary/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    salarycontroller.delete
  );
  app.post(
    "/api/admin/salary/update",
    globalvalidation.salaryUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    salarycontroller.update
  );
  /**salary trend route end   */

  /** job analysis route  start*/

  app.get(
    "/api/admin/job/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobcontroller.findAll
  );
  app.get(
    "/api/admin/job/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobcontroller.findOne
  );
  app.post(
    "/api/admin/job/add",
    globalvalidation.jobSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobcontroller.create
  );
  app.post(
    "/api/admin/job/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobcontroller.delete
  );
  app.post(
    "/api/admin/job/update",
    globalvalidation.jobUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    jobcontroller.update
  );
  /**job analysis route end   */

  /** gallery route  start*/

  app.get(
    "/api/admin/gallery/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    gallerycontroller.findAll
  );

  app.get(
    "/api/admin/gallery/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    gallerycontroller.findOne
  );
  app.post(
    "/api/admin/gallery/add",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    gallerycontroller.create
  );
  app.post(
    "/api/admin/gallery/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    gallerycontroller.delete
  );
  app.post(
    "/api/admin/gallery/update",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    gallerycontroller.update
  );
  /**gallery route end   */
  /** fee route  start*/

  app.get(
    "/api/admin/fees/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    feescontroller.findAll
  );
  app.get(
    "/api/admin/fees/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    feescontroller.findOne
  );
  app.post(
    "/api/admin/fees/add",
    globalvalidation.feeSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    feescontroller.create
  );
  app.post(
    "/api/admin/fees/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    feescontroller.delete
  );
  app.post(
    "/api/admin/fees/update",
    globalvalidation.feeUpdateSchema,
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    feescontroller.update
  );
  /**fee route end   */

  /** syllabus route  start*/

  app.get(
    "/api/admin/syllabus/get",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    syllabuscontroller.findAll
  );
  app.get(
    "/api/admin/syllabus/get/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    syllabuscontroller.findOne
  );
  app.post(
    "/api/admin/syllabus/add",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    syllabuscontroller.create
  );
  app.post(
    "/api/admin/syllabus/delete/:id",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    syllabuscontroller.delete
  );
  app.post(
    "/api/admin/syllabus/update",
    [authJwt.verifyToken, authJwt.isAdmin, globalvalidation.Validate],
    syllabuscontroller.update
  );
  /**syllabus route end   */

  




};
