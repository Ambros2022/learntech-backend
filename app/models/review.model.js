module.exports = (sequelize, Sequelize) => {
    const review = sequelize.define("reviews", {
      name: {
        type: Sequelize.STRING
      },
      userrating: {
        type: Sequelize.FLOAT              
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      item_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      type: {
        type: Sequelize.TEXT
      },
      is_approved: {
        type: Sequelize.INTEGER
      },
      slug: {
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
  
    return review;
  };
  