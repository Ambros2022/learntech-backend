module.exports = (sequelize, Sequelize) => {
  const service = sequelize.define(
    "services",
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
        type: Sequelize.TEXT,
      },
      code_before_body: {
        type: Sequelize.TEXT,
      },
      what_we_are_doing: {
        type: Sequelize.TEXT,
      },
      recognition_and_approvals: {
        type: Sequelize.TEXT,
      },
      career_planning: {
        type: Sequelize.TEXT,
      },
      fees_back_offers: {
        type: Sequelize.TEXT,
      },
      free_counseling: {
        type: Sequelize.TEXT,
      }
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return service;
};
