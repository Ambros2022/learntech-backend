module.exports = (sequelize, Sequelize) => {
    const  college_testimonials = sequelize.define("college_testimonials", {
      video_id: {
        type: Sequelize.INTEGER
      },
  
      college_id: {
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
  
    return  college_testimonials;
  };
  