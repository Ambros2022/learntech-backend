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
      content: {
        type: Sequelize.TEXT
      },
      is_approved: {
        type: Sequelize.INTEGER
      },
      review_type: {
        type: Sequelize.ENUM('school', 'college'),
      },
      college_id: {
        type: Sequelize.INTEGER
      },
      course_id: {
        type: Sequelize.INTEGER
      },
      course_type: {
        type: Sequelize.ENUM('UG', 'PG', 'Diploma', 'Doctorate', 'Default'),
      },
      school_id: {
        type: Sequelize.INTEGER
      },
      school_board_id: {
        type: Sequelize.INTEGER
      },
      grade: {
        type: Sequelize.STRING
      },
      likes: {
        type: Sequelize.STRING
      },
      dislikes: {
        type: Sequelize.STRING
      },
      is_reported: {
        type: Sequelize.INTEGER
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
  