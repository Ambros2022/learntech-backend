module.exports = (sequelize, Sequelize) => {
    const gallery= sequelize.define("course_images", {
        course_id: {
        type: Sequelize.INTEGER
      },
      images: {
        type: Sequelize.TEXT
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
  //*** Relation Ship */
   /* Stream.associate = function(models) {
      Stream.hasMany(models.sub_stream, {as: 'substreams'});
      Stream.hasMany(models.stream_faqs, {as: 'streamfaqs'});
    };*/
  
    return  gallery;
  };
  