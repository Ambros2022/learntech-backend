module.exports = (sequelize, Sequelize) => {
    const  CollegeGalleries = sequelize.define("college_galleries", {
        image : {
        type: Sequelize.STRING
      },
  college_id: {
        type: Sequelize.INTEGER
      },
      status: {
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
  
    return  CollegeGalleries;
  };
  