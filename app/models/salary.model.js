module.exports = (sequelize, Sequelize) => {
    const salary = sequelize.define("salary_trends", {
        course_id : {
        type: Sequelize.INTEGER
      },
      salary_year : {
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
      updatedAt: "updated_at"
    }
    
    
    );
  
    return salary;
  };
  