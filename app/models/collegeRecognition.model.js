module.exports = (sequelize, Sequelize) => {
    const collegeRecognition = sequelize.define("college_recognition", {
        recognition_id: {
        type: Sequelize.INTEGER
      },
  
      college_and_university_id: {
        type: Sequelize.INTEGER
      },
      
    }
      ,
      {
        freezeTableName: true,
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
      }
  
  
    );
  
    return  collegeRecognition;
  };
  