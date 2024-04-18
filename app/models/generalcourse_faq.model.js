module.exports = (sequelize, Sequelize) => {
  const generalcourse_faqs= sequelize.define("general_course_faqs", {
    general_course_id: {
      type: Sequelize.INTEGER
    },
    questions: {
      type: Sequelize.STRING
    },
    answers: {
      type: Sequelize.STRING
    },
   
       
  }
  ,
  {
    
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    
  }
  
  );

  

  return generalcourse_faqs;
};
