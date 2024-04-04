module.exports = (sequelize, Sequelize) => {
  const Schoolboards = sequelize.define(
    "school_boards",
    {
      name: {
        type: Sequelize.STRING,
      },
    slug: {
        type: Sequelize.STRING,
      },

  
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Schoolboards;
};
