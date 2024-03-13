module.exports = (sequelize, Sequelize) => {
    const college_groupss = sequelize.define("college_groups", {
      college_and_university_id: {
        type: Sequelize.INTEGER
      },
        group_id: {
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
  
    return  college_groupss;
  };
  