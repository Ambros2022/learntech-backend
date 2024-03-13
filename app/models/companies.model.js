
module.exports = (sequelize, Sequelize) => {
    const companies = sequelize.define("companies", {
   
        companies_name: {
        type: Sequelize.STRING
      },
      companies_logo: {
        type: Sequelize.STRING
      },
      companies_slug: {
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
  
    return companies;
  };
  