module.exports = (sequelize, Sequelize) => {
  const redirecturl = sequelize.define(
    "redirect_urls",
    {
      old_url: {
        type: Sequelize.STRING,
      },
      new_url: {
        type: Sequelize.STRING,
      },
      status_code: {
        type: Sequelize.ENUM("301", "307", "503"),
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
 
  return redirecturl;
};
