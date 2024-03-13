module.exports = (sequelize, Sequelize) =>
{
  const placements = sequelize.define("placements",
    {
      college_id: {
        type: Sequelize.INTEGER
      },

      company_id: {
        type: Sequelize.INTEGER
      },
      year: {
        type: Sequelize.INTEGER
      },
      highest_package: {
        type: Sequelize.INTEGER
      },
      no_of_placements: {
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

  return placements;
};
