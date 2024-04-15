module.exports = (sequelize, Sequelize) => {
  const generalcourse = sequelize.define("general_courses", {

    stream_id: {
      type: Sequelize.INTEGER
    },
    sub_streams_id: {
      type: Sequelize.INTEGER
    },
    course_type: {
      type: Sequelize.ENUM("UG", "PG", "Diploma", "Doctorate", "Default"),
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    short_name: {
      type: Sequelize.STRING
    },
    duration: {
      type: Sequelize.INTEGER
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.TEXT
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    syllabus: {
      type: Sequelize.TEXT
    },
    admissions: {
      type: Sequelize.TEXT
    },
    career_opportunities: {
      type: Sequelize.TEXT
    },
    top_college: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    is_trending: {
      type: Sequelize.STRING
    },
    is_top_rank: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("Draft", "Published"),
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

  return generalcourse;
};
