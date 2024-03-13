module.exports = (sequelize, Sequelize) => {
    const upcoming_courses= sequelize.define("upcoming_courses", {
        course_name: {
        type: Sequelize.STRING
      },
      slug : {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      }, 
  
      belongs_to: {
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
  //*** Relation Ship */
   /* Stream.associate = function(models) {
      Stream.hasMany(models.sub_stream, {as: 'substreams'});
      Stream.hasMany(models.stream_faqs, {as: 'streamfaqs'});
    };*/
  
    return upcoming_courses;
  };
  