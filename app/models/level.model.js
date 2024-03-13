module.exports = (sequelize, Sequelize) => {
    const level = sequelize.define("levels", {
      level_name: {
            type: Sequelize.STRING
        }
    } ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return level;
};
