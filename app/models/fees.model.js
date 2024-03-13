module.exports = (sequelize, Sequelize) => {
    const  fees= sequelize.define("fees", {
        course_id: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.ENUM('semester', 'year')
      },
      title: {
        type: Sequelize.STRING
      }, 
  
      note: {
        type: Sequelize.STRING
      }, 
      total_amount: {
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
  
    return  fees;
  };
  