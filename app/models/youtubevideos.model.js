module.exports = (sequelize, Sequelize) => {
  const youtubevideos = sequelize.define(
    "youtubevideos",
    {
      name: {
        type: Sequelize.STRING,
      },
      embed_id: {
        type: Sequelize.STRING,
      },
      Img_thumbnail: {
        type: Sequelize.STRING
      },

      meta_description: {
        type: Sequelize.TEXT,
      },
      meta_title: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.TEXT,
      },
      listing_order: {
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

  return youtubevideos;
};
