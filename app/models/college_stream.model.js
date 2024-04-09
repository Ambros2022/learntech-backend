module.exports = (sequelize, Sequelize) => {
    const  college_stream = sequelize.define("college_streams", {
        stream_id : {
        type: Sequelize.INTEGER
      },
  
      college_id: {
        type: Sequelize.INTEGER
      },
      
    }
      ,
      {
  
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
  
  
    );
  
    return  college_stream;
  };
  