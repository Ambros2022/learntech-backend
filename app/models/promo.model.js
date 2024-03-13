module.exports = (sequelize, Sequelize) => {
  const promopage = sequelize.define(
    "promo_pages",
    {
      title: {
        type: Sequelize.STRING,
      },
      meta_title: {
        type: Sequelize.STRING,
      },

      meta_description: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT,
      },

      image: {
        type: Sequelize.STRING,
      },

      url: {
        type: Sequelize.TEXT,
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

  return promopage;
};
