module.exports = (sequelize, Sequelize) => {
  const exam_faqs = sequelize.define("exam_faqs", {
    questions: {
      type: Sequelize.STRING
    },
    answers: {
      type: Sequelize.STRING
    },
    exam_id: {
      type: Sequelize.INTEGER
    }
       
  }
  ,
  {
    
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true 
  }
  
  );

  

  return exam_faqs;
};

