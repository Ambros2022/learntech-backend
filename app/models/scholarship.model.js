module.exports = (sequelize, Sequelize) => {
  const scholarships = sequelize.define("scholarships", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    conducted_by: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    rewards: {
      type: Sequelize.STRING
    },
    last_date: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.TEXT
    }
    
  }
  ,
  {
    
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
  
  
  );

  return scholarships;
};
