module.exports = (sequelize, Sequelize) => {
    const  exam_eligibilities= sequelize.define("exam_qualification_eligibilities", {
      exam_id: {
        type: Sequelize.INTEGER
      },
      title: {
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

  
    return  exam_eligibilities;
  };
  