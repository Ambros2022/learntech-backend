module.exports = (sequelize, Sequelize) => {
    const  exam_dates= sequelize.define("exam_date_remembers", {
      exam_id: {
        type: Sequelize.INTEGER
      },
      event: {
        type: Sequelize.STRING
      },
      start_date: {
        type: Sequelize.INTEGER
      }, 
      end_date: {
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

  
    return  exam_dates;
  };
  