module.exports = (sequelize, Sequelize) => {
  const SubStream = sequelize.define("sub_streams", {
    sub_stream_name: {
      type: Sequelize.STRING
    },
    sub_stream_slug: {
      type: Sequelize.STRING
    },
    sub_stream_description: {
      type: Sequelize.STRING
    },
    stream_id: {
      type: Sequelize.INTEGER
    }

    
    
  }
  ,
  {
    
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true 
  }
  
  );



  return SubStream;
};
