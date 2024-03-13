module.exports = (sequelize, Sequelize) => {
  const schoollevels = sequelize.define(
    "school_levels",
    {
      level_id: {
        type: Sequelize.INTEGER,
      },
      school_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return schoollevels;
};
