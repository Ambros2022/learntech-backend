module.exports = (sequelize, Sequelize) => {
  const websitepopup = sequelize.define(
    "web_pop_up_images",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("Hide", "Active"),
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return websitepopup;
};
