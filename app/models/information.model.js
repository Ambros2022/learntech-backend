module.exports = (sequelize, Sequelize) => {
  const information = sequelize.define(
    "information",
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
      overview: {
        type: Sequelize.TEXT,
      },
      entrance_examination: {
        type: Sequelize.TEXT,
      },
      scholarships: {
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

  return information;
};
