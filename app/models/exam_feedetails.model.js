module.exports = (sequelize, Sequelize) => {
    const  exam_feedetails= sequelize.define("exam_fee_details", {
      exam_id: {
        type: Sequelize.INTEGER
      },
      category: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
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

  
    return  exam_feedetails;
  };
  