module.exports = (sequelize, Sequelize) => {
  const boardschools = sequelize.define(
    "boards_schools",
    {
      board_id: {
        type: Sequelize.INTEGER,
      },
      school_id: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return boardschools;
};
