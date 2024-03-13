module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    provider_name: {
      type: Sequelize.STRING
    },
    provider_id: {
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

  return User;
};
