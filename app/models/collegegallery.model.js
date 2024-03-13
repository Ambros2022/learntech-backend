module.exports = (sequelize, Sequelize) => {
    const collegegallery= sequelize.define("college_galleries", {
      college_id: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.TEXT
      },
      status: {
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
  
    return  collegegallery;
  };
  