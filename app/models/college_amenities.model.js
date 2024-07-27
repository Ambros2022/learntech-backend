module.exports = (sequelize, Sequelize) => {
    const  college_amenities = sequelize.define("college_amenities", {
      amenitie_id: {
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
  
    return  college_amenities;
  };
  