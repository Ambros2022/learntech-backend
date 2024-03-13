
module.exports = (sequelize, Sequelize) => {
    const f_a_qs = sequelize.define("f_a_qs", {
   
        college_id: {
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
  
    return f_a_qs;
  };
  