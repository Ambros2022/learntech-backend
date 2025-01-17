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
