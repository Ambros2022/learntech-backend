module.exports = (sequelize, Sequelize) => {
  const team = sequelize.define("the_teams", {
    name: {
      type: Sequelize.STRING
    },

    designation: {
      type: Sequelize.TEXT
    },
    linked_in_link: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.ENUM('Board', 'Team')
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

  return team;
};
