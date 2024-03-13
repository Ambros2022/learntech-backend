module.exports = (sequelize, Sequelize) => {
    const syllabus_details= sequelize.define("syllabus_details", {
        syllabus_id: {
        type: Sequelize.INTEGER
      },
      subject: {
        type: Sequelize.STRING
      },
      description: {
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
  
    return syllabus_details;
  };
  