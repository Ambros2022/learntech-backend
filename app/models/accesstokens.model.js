
module.exports = (sequelize, Sequelize) => {
  const accesstokens = sequelize.define("accesstokens", {

    token: {
      type: Sequelize.STRING
    },
    expires_at: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    }

  }
    ,
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return accesstokens;
};
