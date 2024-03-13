module.exports = (sequelize, Sequelize) =>
{
  const rankings = sequelize.define("rankings",
    {
      college_id: {
        type: Sequelize.INTEGER
      },

      ranking_name: {
        type: Sequelize.STRING
      },
      ranking_description: {
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

  return rankings;
};
