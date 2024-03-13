module.exports = (sequelize, Sequelize) => {
    const  exam_agelimits= sequelize.define("exam_age_limits", {
      exam_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      },
      description: {
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

  
    return  exam_agelimits;
  };
  