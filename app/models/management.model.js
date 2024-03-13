module.exports = (sequelize, Sequelize) => {
    const management = sequelize.define("managements", {
        management_name: {
        type: Sequelize.STRING
      },
  
      slug: {
        type: Sequelize.STRING
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
  
    return management;
  };
  