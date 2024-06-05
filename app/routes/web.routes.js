const { authJwt, globalvalidation } = require("../middleware");
const winston = require("../config/winston");
const homecontroller = require("../controllers/website/home.controller");
// const webapicontroller = require("../controllers/website/webapi.controller");
const webapicontroller = require("../controllers/website/webapi.controller");

const redirecturlcontroller = require("../controllers/redirecturl.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    var logmsg = {
      'Request IP': req.ip,
      'Method': req.method,
      'URL': req.originalUrl,
      'statusCode': res.statusCode,
      'headers': req.headers,
      'Time': new Date(),
      'ErrorMessage': 'Display Error If Any for this request'
    };


    let requestBody = (typeof req.body !== 'string') ? JSON.stringify(req.body) : req.body;
    winston.log('info', 'Method:' + req.method + ' Path:' + req.path
      + ' Request Body:' + req.ip
      + ' Request IP:' + requestBody

      + ' statusCode:' + res.statusCode
      + ' headers:' + req.headers
      + 'Time' + new Date()

    );
    winston.log('info', '--------------------------------------------------');


    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  // Loction apis //

  app.get("/api/website/country/get", webapicontroller.allcountries);

  app.get("/api/website/states/get", webapicontroller.allstates);


  //End  Loction apis //

  // homrpage apis //
  app.get("/api/website/stream_exams/get", webapicontroller.allstream_exams);

  app.get("/api/website/home/searchbar", webapicontroller.searchbarhome);

  app.get("/api/website/banner/get", webapicontroller.allbanners);

  app.get("/api/website/explorecollege/get", webapicontroller.exploreCollege);

  app.get("/api/website/exploreexam/get", webapicontroller.exploreexam);

  app.get("/api/website/explorecourses/get", webapicontroller.explorecourses);

  app.get("/api/website/newsandblogs/get", webapicontroller.newsandblogs);


  // end home page apis






  app.get(
    "/api/website/generalcourse/get", webapicontroller.allgeneralcourses
  );

  app.get("/api/website/stream/general/get", webapicontroller.streamGeneralcourse);

  app.get("/api/website/stream/get", webapicontroller.allstreams);

  app.get("/api/website/streamfindone/get/:id", webapicontroller.findOnestream);

  app.get("/api/website/allcourses/get", webapicontroller.allcourses);




  app.post(
    "/api/website/enquiry", globalvalidation.enquirySchema, [globalvalidation.Validate], webapicontroller.enquiry
  );








  app.get("/api/website/colleges/get", webapicontroller.allcolleges);


  app.get("/api/website/collegefindone/get/:id", webapicontroller.collegefindOne);

  app.get("/api/website/courses/get", webapicontroller.courses);

  app.get("/api/website/coursefindone/get/:id", webapicontroller.coursefindone);

  app.get("/api/website/schools/get", webapicontroller.allschools);

  app.get("/api/website/schoolfindone/get/:id", webapicontroller.schoolfindone);

  app.get("/api/website/abroadpages/get", webapicontroller.abroadpages);

  app.get("/api/website/abroadpagefindone/get/:id", webapicontroller.abroadcollegefindone);

  app.get("/api/website/exams/get", webapicontroller.allentranceexams);

  app.get("/api/website/examfindone/get/:id", webapicontroller.findoneexam);

  app.get("/api/website/news/get", webapicontroller.news);

  app.get("/api/website/newsfindone/get/:id", webapicontroller.newsfindone);

  app.get("/api/website/blog/get", webapicontroller.blogs);

  app.get("/api/website/blogfindone/get/:id", webapicontroller.blogfindone);

  app.get("/api/website/schoolboard/get", webapicontroller.schoolboards);

  app.get("/api/website/schoolboardfindone/get/:id", webapicontroller.schoolboardfindone);

  app.get("/api/website/scholarships/get", webapicontroller.scholarships);

  app.get("/api/website/scholarshipfindone/get/:id", webapicontroller.scholarshipfindone);

  app.get("/api/website/pagefindone/get/:url", webapicontroller.pagefindone);

  app.get("/api/website/allvideotestimonials/get", webapicontroller.videotestimonial);

  app.get("/api/website/jobposition/get", webapicontroller.jobpositions);

  app.get("/api/website/alljoblocation/get", webapicontroller.alljoblocations);

  app.post("/api/website/addjobsenquires/get", webapicontroller.addjobenquires);

  app.get("/api/website/ourteams/get", webapicontroller.ourteams);





























































































  



  // redirection

  app.get(
    "/api/website/redirecturl/get", redirecturlcontroller.findAll
  );

  app.get(
    "/api/website/redirecturl/config", redirecturlcontroller.getFile
  );

  /* start Home page apis*/

  app.post(
    "/api/website/home/header", homecontroller.pagetdata
  );

  app.post(
    "/api/website/home/topcrousel", homecontroller.topcollege
  );

  app.post(
    "/api/website/home/blogsandnews", homecontroller.blogsandnews
  );

  app.get(
    "/api/website/home/hompagevideos", homecontroller.findhomepagevideos
  );
  app.get(
    "/api/website/home/streams", homecontroller.findAllstreams
  );
  app.get(
    "/api/website/home/exams", homecontroller.findAllexams
  );

  /* End Home page apis*/
  app.post(
    "/api/website/home/enquiry", globalvalidation.enquirySchema, [globalvalidation.Validate], homecontroller.enquiry
  );
  app.post(
    "/api/website/home/landingpageenquiry", globalvalidation.enquirySchema, [globalvalidation.Validate], homecontroller.landingpageenquiry
  );
  app.post(
    "/api/website/home/horizonschoolenquiry", globalvalidation.enquirySchema, [globalvalidation.Validate], homecontroller.horizonschoolenquiry
  );


  app.post(
    "/api/website/home/uploadpdf", homecontroller.uploadpdf
  );
  app.post(
    "/api/website/home/generalcourse", homecontroller.generalcourse
  );
  app.post(
    "/api/website/home/courses/stream", homecontroller.coursesbystreamid
  );
  app.get(
    "/api/website/home/courses/:slug", homecontroller.findOnecourse
  );

  app.get(
    "/api/website/home/collegecourses/:slug", homecontroller.findcollegecourseone
  );

  app.get(
    "/api/website/home/exams", homecontroller.allentranceexams
  );
  app.get(
    "/api/website/home/allentranceexams/get/:slug", homecontroller.findoneexam
  );
  app.get(
    "/api/website/home/topcollegebangalore", homecontroller.topcollegebangalore
  );
  app.get(
    "/api/website/home/college/get/:slug", homecontroller.findonecollege
  );
  app.get(
    "/api/website/home/group", homecontroller.findallgroup
  );
  app.get(
    "/api/website/home/collegetype", homecontroller.findAllcollegetype
  );
  app.get(
    "/api/website/home/citys", homecontroller.findallcitys
  );
  app.get(
    "/api/website/home/allgeneralcourse", homecontroller.findAllgeneralcourse
  );
  app.get(
    "/api/website/home/accreditaions", homecontroller.findallaccreditaions
  );
  app.get(
    "/api/website/home/managments", homecontroller.findallmanagments
  );

  app.get(
    "/api/website/home/topschoolbangalore", homecontroller.topschoolbangalore
  );
  app.get(
    "/api/website/home/school/get/:slug", homecontroller.findoneschool
  );
  app.get(
    "/api/website/home/schoolclassification", homecontroller.findAllschoolclassification
  );
  app.get(
    "/api/website/home/schoolboards", homecontroller.findallschoolboards
  );
  app.get(
    "/api/website/home/schoollevels", homecontroller.findallschoollevels
  );
  app.get(
    "/api/website/home/schooltypes", homecontroller.findallschooltypes
  );



  app.get(
    "/api/website/home/authors", homecontroller.findAllauthor
  );
  app.get(
    "/api/website/home/categories", homecontroller.findAllcategories
  );

  app.get(
    "/api/website/home/upcomingexam", homecontroller.findallupcommingexams
  );


  app.get(
    "/api/website/blog/get", homecontroller.allblogs
  );

  app.get(
    "/api/website/blog/get/:id",
    homecontroller.findoneblog
  );

  app.get(
    "/api/website/home/news", homecontroller.allnews
  );
  app.get(
    "/api/website/home/abroaduniversities", homecontroller.allabroaduniversities
  );
  app.get(
    "/api/website/home/abroadcountries", homecontroller.allabroadcountries
  );

  app.get(
    "/api/website/home/news/get/:slug", homecontroller.findonenews
  );

  app.get(
    "/api/website/page/get/:urlsegment",
    homecontroller.findOnePage
  );

  app.get(
    "/api/website/nri/get", homecontroller.nripage
  );
  app.get(
    "/api/website/recognitioneditor/get", homecontroller.recognitioneditorpage
  );
  app.get(
    "/api/website/services/get", homecontroller.servicespage
  );
  app.get(
    "/api/website/about/get", homecontroller.aboutpage
  );


  app.get(
    "/api/website/home/scholarship", homecontroller.allscholarships
  );
  app.get(
    "/api/website/home/scholarship/get/:slug", homecontroller.findonescholarship
  );
  app.get(
    "/api/website/testimonial/get", homecontroller.alltestimonial
  );

  app.get(
    "/api/website/home/team", homecontroller.allteam
  );


  app.get(
    "/api/website/promobanner", homecontroller.allpromotionalbanners
  );




  app.get(
    "/api/website/home/sitemap/get", homecontroller.sitemap
  );
  app.get(
    "/api/website/home/seolink/get", homecontroller.seolink
  );



};



