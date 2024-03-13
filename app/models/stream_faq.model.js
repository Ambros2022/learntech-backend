module.exports = (sequelize, Sequelize) => {
  const StreamFaq = sequelize.define("stream_faqs", {
    questions: {
      type: Sequelize.STRING
    },
    answers: {
      type: Sequelize.STRING
    },
    stream_id: {
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

  

  return StreamFaq;
};
