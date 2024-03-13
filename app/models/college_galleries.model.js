module.exports = (sequelize, Sequelize) => {
    const  college_galleries = sequelize.define("college_galleries", {
        image : {
        type: Sequelize.STRING
      },
  
      college_id: {
        type: Sequelize.INTEGER
      },
      status: {
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
  
    return  college_galleries;
  };
  