module.exports = (sequelize, Sequelize) => {
  const newsandevents = sequelize.define("news_and_events", {
    category_id: {
      type: Sequelize.STRING
    },
    country_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.INTEGER
    },
    banner_image: {
      type: Sequelize.STRING
    },
    pdf_file: {
      type: Sequelize.STRING
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    overview: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('Draft', 'Published'),
    },
    pdf_name: {
      type: Sequelize.STRING
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

  return newsandevents;
};

