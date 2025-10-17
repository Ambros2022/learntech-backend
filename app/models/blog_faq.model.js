module.exports = (sequelize, Sequelize) => {
  const BlogFaq = sequelize.define("blog_faqs", {
    blog_id: {
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
    underscored: true 
  }
  
  );

  

  return BlogFaq;
};
