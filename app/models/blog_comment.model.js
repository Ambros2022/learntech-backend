module.exports = (sequelize, Sequelize) => {
  const blog_comment = sequelize.define("blog_comments", {
    name: {
      type: Sequelize.STRING
    },
    blog_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT
    },
    is_approved: {
      type: Sequelize.INTEGER
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

  return blog_comment;
};
