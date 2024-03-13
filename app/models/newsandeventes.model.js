module.exports = (sequelize, Sequelize) => {
    const newsandevents = sequelize.define("news_and_events", {
        title: {
        type: Sequelize.STRING
      },
      news_type: {
        type: Sequelize.STRING
      },
      exam_id: {
        type: Sequelize.INTEGER
      },
      meta_title: {
        type: Sequelize.STRING
      },
      meta_description: {
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
      top_featured_order: {
        type: Sequelize.INTEGER
      },
      is_top_featured: {
        type: Sequelize.INTEGER
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
  
    return newsandevents;
  };
  
  