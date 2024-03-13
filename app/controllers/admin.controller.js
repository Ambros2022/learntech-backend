const db = require("../models");
const CollegeAndUniversity = db.CollegeAndUniversity;
const school = db.school;
const Op = db.Sequelize.Op;
const PUBLISHED = 'Published';
const DRAFT = 'Draft';

const polytechnic = db.polytechnic;
const scholarship = db.scholarships;
const generalcourse = db.generalcourse;
const enquiry = db.enquiry;
const city = db.city;
const area = db.area;
const blog = db.blog;
const user = db.user;
const exam = db.exam;

exports.adminBoard = async  (req, res) => {
  //res.status(200).send("Admin Content.");

  const polytechnics = await  polytechnic.count();
  const exams = await  exam.count();
  const scholarships = await  scholarship.count();
  const users = await  user.count();
  const enquiries = await  enquiry.count();
  const areas = await  area.count();
  const cities = await  city.count();
  const blogs = await  blog.count();
  const published_blogs = await  blog.count({
    where: {
        status: PUBLISHED
      }
  });
  const published_polytechnics = await  polytechnic.count({
    where: {
        status: PUBLISHED
      }
  });
  const published_scholarships = await  scholarship.count({
    where: {
        status: PUBLISHED
      }
  });
  const published_exams = await  exam.count({
    where: {
        status: PUBLISHED
      }
  });

  const generalcourses = await  generalcourse.count();


  const college = await  CollegeAndUniversity.count({
    where: {
        type: 'college'
      }
  });
  const published_college = await  CollegeAndUniversity.count({
    where: {
        type: 'college',
        status: PUBLISHED
      }
  });
  
  
  const university = await  CollegeAndUniversity.count({
    where: {
        type: 'university'
      }
  });

  const published_university = await  CollegeAndUniversity.count({
    where: {
        type: 'university',
        status: PUBLISHED
      }
  });

  const board = await  CollegeAndUniversity.count({
    where: {
        type: 'board'
      }
  });

  const published_board = await  CollegeAndUniversity.count({
    where: {
        type: 'board',
        status: PUBLISHED
      }
  });


  const schools = await  school.count();
  const published_schools = await  school.count({
    where: {
        status: PUBLISHED
      }
  });

  res.status(200).send({
    status:1,
    message:"success",
    data:{
    college: college,
    published_college: published_college,
    university: university,
    published_university:published_university,
    board: board,
    published_board: published_board,
    school: schools,
    published_school: published_schools,
    polytechnic: polytechnics,
    published_polytechnic :published_polytechnics,
    exam: exams,
    published_exam :published_exams,
    scholarship: scholarships,
    published_scholarship:published_scholarships,
    generalcourse: generalcourses,
    users: users,
    enquiry: enquiries,
    area: areas,
    city: cities,
    blog: blogs,
    published_blog: published_blogs}
  
   
  });
  
 
};



