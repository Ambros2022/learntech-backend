module.exports = (sequelize, Sequelize) => {
  const City = sequelize.define("cities", {
    city_name: {
      type: Sequelize.STRING
    },
	state_id: {
      type: Sequelize.INTEGER
    },
    city_slug: {
      type: Sequelize.STRING
    },
    city_description: {
      type: Sequelize.STRING
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

  return City;
};
