module.exports = (sequelize, Sequelize) => {
  const generalcourse_faqs= sequelize.define("generalcourse_faqs", {
    questions: {
      type: Sequelize.STRING
    },
    answers: {
      type: Sequelize.STRING
    },
    generalcourse_id: {
      type: Sequelize.INTEGER
    }
       
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
