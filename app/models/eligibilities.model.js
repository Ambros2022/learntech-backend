module.exports = (sequelize, Sequelize) => {
    const  eligibilities= sequelize.define("eligibilities", {
        course_id: {
        type: Sequelize.INTEGER
      },
      stream: {
        type: Sequelize.STRING
      },
      description: {
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
  
    return  eligibilities;
  };
  