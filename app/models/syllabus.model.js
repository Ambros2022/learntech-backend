module.exports = (sequelize, Sequelize) => {
    const syllabus= sequelize.define("syllabus", {
        course_id: {
        type: Sequelize.INTEGER
      },
     
      title: {
        type: Sequelize.STRING
      }, 
  
      
    }
    ,
    {
      freezeTableName: true,
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
  
    return syllabus;
  };
  