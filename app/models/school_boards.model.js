module.exports = (sequelize, Sequelize) => {
  const Schoolboards = sequelize.define(
    "school_boards",
    {
      name: {
        type: Sequelize.STRING,
      },
      // established: {
      //   type: Sequelize.STRING,
      // },
      // city_id: {
      //   type: Sequelize.INTEGER,
      // },
      // area_id: {
      //   type: Sequelize.INTEGER,
      // },
      // rank: {
      //   type: Sequelize.INTEGER,
      // },
      slug: {
        type: Sequelize.STRING,
      },

      // address: {
      //   type: Sequelize.STRING,
      // },
      // logo: {
      //   type: Sequelize.STRING,
      // },
      // status: {
      //   type: Sequelize.STRING,
      // },
    },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Schoolboards;
};
