module.exports = (sequelize, Sequelize) => {
  const school = sequelize.define("schools", {
    country_id: {
      type: Sequelize.INTEGER
    },
    state_id: {
      type: Sequelize.INTEGER
    },
    city_id: {
      type: Sequelize.INTEGER
    },
    school_board_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("Draft", "Published"),
    },
    home_view_status: {
      type: Sequelize.ENUM("top_school", "default"),
    },
    school_type: {
      type: Sequelize.ENUM("Public", "Deemed", "Private", "Government"),
    },
    listing_order: {
      type: Sequelize.STRING
    },
    established: {
      type: Sequelize.STRING
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
    address: {
      type: Sequelize.INTEGER
    },
    map: {
      type: Sequelize.STRING
    },
    icon: {
      type: Sequelize.STRING
    },
    banner_image: {
      type: Sequelize.STRING
    },
    video_url: {
      type: Sequelize.INTEGER
    },
    avg_rating: {
      type: Sequelize.FLOAT
    },
    info: {
      type: Sequelize.STRING
    },
    admissions_process: {
      type: Sequelize.STRING
    },
    extracurriculars: {
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

  return school;
};
