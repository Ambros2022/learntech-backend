module.exports = (sequelize, Sequelize) => {
  const College = sequelize.define("colleges", {

    country_id: {
      type: Sequelize.INTEGER
    },
    state_id: {
      type: Sequelize.INTEGER
    },
    city_id: {
      type: Sequelize.INTEGER
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    type: {
      type: Sequelize.ENUM("college", "university"),
    },
    status: {
      type: Sequelize.ENUM("Draft", "Published"),
    },
    home_view_status: {
      type: Sequelize.ENUM("top_college", "default"),
    },
    college_type: {
      type: Sequelize.ENUM("Public", "Deemed", "Private", "Government"),
    },
    listing_order: {
      type: Sequelize.INTEGER
    },
    established: {
      type: Sequelize.STRING
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    meta_keyword: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    map: {
      type: Sequelize.STRING
    },
    icon: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    banner_image: {
      type: Sequelize.STRING
    },
    video_url: {
      type: Sequelize.STRING
    },
    avg_rating: {
      type: Sequelize.FLOAT
    },
    info: {
      type: Sequelize.STRING
    },
    course_fees: {
      type: Sequelize.STRING
    },
    admissions: {
      type: Sequelize.STRING
    },
    placements: {
      type: Sequelize.STRING
    },
    rankings: {
      type: Sequelize.INTEGER
    },
    scholarship: {
      type: Sequelize.STRING
    },
    hostel: {
      type: Sequelize.STRING
    },
    is_associated: {
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

  return College;
};



