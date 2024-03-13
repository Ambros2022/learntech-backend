
module.exports = (sequelize, Sequelize) => {
    const school_faqs = sequelize.define("school_faqs", {
   
      school_id: {
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
      updatedAt: "updated_at"
    }
    
    
    );
  
    return school_faqs;
  };
  