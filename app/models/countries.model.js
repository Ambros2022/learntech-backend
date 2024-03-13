
module.exports = (sequelize, Sequelize) => {
  const countries = sequelize.define("countries", {

    name: {
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

  return countries;
};
