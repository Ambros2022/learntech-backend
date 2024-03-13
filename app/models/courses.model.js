module.exports = (sequelize, Sequelize) => {
    const courses= sequelize.define("courses", {
        college_id: {
        type: Sequelize.INTEGER
      },
      medium_id: {
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.STRING
      }, 
  
      course_group: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
  
      course_details_structure: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      career_prospects: {
        type: Sequelize.STRING
      }, 
  
      brochure: {
        type: Sequelize.STRING
      },
      
      video: {
        type: Sequelize.STRING
      },
      video_full_url: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('Draft', 'Published')	
      }, 
      course_type: {
        type: Sequelize.STRING
      }, 
      meta_title: {
        type: Sequelize.STRING
      },
      meta_description: {
        type: Sequelize.STRING
      },
      meta_keyword: {
        type: Sequelize.STRING
      },
      code_before_head: {
        type: Sequelize.STRING
      }, 
      code_before_body: {
        type: Sequelize.STRING
      },
      syllabus: {
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
  
    return courses;
  };
  