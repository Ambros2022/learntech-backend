module.exports = (sequelize, Sequelize) => {
    const college_accreditation = sequelize.define("college_accreditations", {
      accreditation_id: {
        type: Sequelize.INTEGER
      },
  
      college_and_university_id: {
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
  
    return college_accreditation;
  };
  