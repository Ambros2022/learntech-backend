module.exports = (sequelize, Sequelize) => {
  const websiteimage = sequelize.define(
    "website_images",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      image_key: {
        type: Sequelize.STRING,
      },
      image: {
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

  return websiteimage;
};
