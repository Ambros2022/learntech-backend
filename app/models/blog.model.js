module.exports = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blogs", {
    title: {
      type: Sequelize.STRING
    },
    category_id: {
      type: Sequelize.INTEGER
    },
    author_id: {
      type: Sequelize.INTEGER
    },
    group_id: {
      type: Sequelize.INTEGER
    },
    meta_description: {
      type: Sequelize.TEXT
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_keyword: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    cover_image: {
      type: Sequelize.STRING
    },
    body: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.TEXT
    },
    keywords: {
      type: Sequelize.STRING
    },
    home_view_status: {
      type: Sequelize.STRING
    },
    listing_order: {
      type: Sequelize.INTEGER
    },
    promo_banner: {
      type: Sequelize.STRING
    },
    promo_banner_status: {
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

  return Blog;
};


