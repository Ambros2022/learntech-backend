module.exports = (sequelize, Sequelize) => {
    const job= sequelize.define("course_job_analyses", {
        course_id: {
        type: Sequelize.INTEGER
      },
      job_profile: {
        type: Sequelize.STRING
      },
      job_description: {
        type: Sequelize.STRING
      }, 
      average_salary: {
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
  
    return  job;
  };
  