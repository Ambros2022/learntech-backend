module.exports = (sequelize, Sequelize) => {
    const  exam_streams = sequelize.define("exam_streams", {
      exam_id: {
        type: Sequelize.INTEGER
      },
  
      stream_id: {
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
  
    return  exam_streams;
  };
  