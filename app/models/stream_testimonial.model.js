module.exports = (sequelize, Sequelize) => {
    const  stream_testimonials = sequelize.define("stream_testimonials", {
      video_id: {
        type: Sequelize.INTEGER
      },
  
      stream_id: {
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
  
    return  stream_testimonials;
  };
  