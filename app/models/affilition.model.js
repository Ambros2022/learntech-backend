module.exports = (sequelize, Sequelize) => {
    const affilition = sequelize.define("affiliations", {
      other_affiliations_name: {
        type: Sequelize.STRING
      },
  
      other_affiliations_slug: {
        type: Sequelize.STRING
      },
      other_affiliations_description: {
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
  
    return affilition;
  };
  