module.exports = (sequelize, Sequelize) => {
  const Schoolboards = sequelize.define(
    "school_boards",
    {
      country_id: {
        type: Sequelize.STRING,
      },
      state_id: {
        type: Sequelize.STRING,
      },
      city_id: {
        type: Sequelize.STRING,
      },
      name: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.ENUM("male", "female", "Co-Ed"),
      },
      board_type: {
        type: Sequelize.ENUM("state", "national", "international", "default"),
      },
      logo: {
        type: Sequelize.STRING,
      },
      avg_rating: {
        type: Sequelize.STRING,
      },
      listing_order: {
        type: Sequelize.STRING,
      },
      established: {
        type: Sequelize.STRING,
      },
      result_date: {
        type: Sequelize.STRING,
      },
      info: {
        type: Sequelize.STRING,
      },
      time_table: {
        type: Sequelize.STRING,
      },
      reg_form: {
        type: Sequelize.STRING,
      },
      syllabus: {
        type: Sequelize.STRING,
      },
      results: {
        type: Sequelize.STRING,
      },
      sample_paper: {
        type: Sequelize.STRING,
      },
      address: {
        type: Sequelize.STRING
      },
      map: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM("Draft", "Published"),
      },
      meta_title: {
        type: Sequelize.STRING
      },
      meta_description: {
        type: Sequelize.INTEGER
      },
      meta_keyword: {
        type: Sequelize.INTEGER
      },
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
