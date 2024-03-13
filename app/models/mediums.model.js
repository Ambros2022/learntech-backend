module.exports = (sequelize, Sequelize) =>
{
  const mediums = sequelize.define("mediums",
    {
        medium : {
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

  return 	mediums;
};
