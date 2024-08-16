module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.INTEGER
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    banner_image: {
      type: Sequelize.INTEGER
    },
    meta_title: {
      type: Sequelize.INTEGER
    },
    meta_description: {
      type: Sequelize.TEXT
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    overview: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('Draft', 'Published')
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

  return Blog;
};


