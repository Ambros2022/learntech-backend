
module.exports = (sequelize, Sequelize) => {
  const area = sequelize.define("areas", {
 
    area_name: {
      type: Sequelize.STRING
    },
    area_slug: {
      type: Sequelize.STRING
    },
    area_description: {
      type: Sequelize.STRING
    },
    city_id: {
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

  return area;
};
