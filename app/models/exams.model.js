module.exports = (sequelize, Sequelize) => {
    const exams= sequelize.define("exams", {
       
      // status: {
      //   type: Sequelize.ENUM('Draft', 'Published')	
      // }, 
      // meta_title: {
      //   type: Sequelize.STRING
      // },
      // meta_description: {
      //   type: Sequelize.STRING
      // },
      // meta_keyword: {
      //   type: Sequelize.STRING
      // },
      // code_before_head: {
      //   type: Sequelize.STRING
      // }, 
      // code_before_body: {
      //   type: Sequelize.STRING
      // }
     
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
  
    return exams;
  };
  