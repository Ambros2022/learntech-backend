module.exports = (sequelize, Sequelize) => {
    const  school_galleries = sequelize.define("school_galleries", {
        image : {
        type: Sequelize.STRING
      },
  
      school_id: {
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
  
    return  school_galleries;
  };
  