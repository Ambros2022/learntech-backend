module.exports = (sequelize, Sequelize) => {
    const fee_details= sequelize.define("fee_details", {
        fee_id: {
        type: Sequelize.INTEGER
      },
      sub_title: {
        type: Sequelize.STRING
      },
      amount: {
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
  
    return fee_details;
  };
  