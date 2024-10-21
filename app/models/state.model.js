module.exports = (sequelize, Sequelize) => {
  const State = sequelize.define("states", {
    name: {
      type: Sequelize.STRING
    },
    country_id: {
      type: Sequelize.INTEGER
    },
    is_top: {
      type: Sequelize.STRING
    },

  }
    ,
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return State;
};