module.exports = (sequelize, Sequelize) => {
  const recognitioneditor = sequelize.define(
    "recognition_approval_editors",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      meta_title: {
        type: Sequelize.STRING,
      },
      meta_description: {
        type: Sequelize.STRING,
      },

      meta_keyword: {
        type: Sequelize.STRING,
      },
      code_before_head: {
        type: Sequelize.STRING,
      },
      code_before_body: {
        type: Sequelize.STRING,
      },

      editor: {
        type: Sequelize.TEXT,
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return recognitioneditor;
};
