module.exports = (sequelize, Sequelize) => {
  const exam = sequelize.define("exams", {
    stream_id: {
      type: Sequelize.STRING,
    },
    country_id: {
      type: Sequelize.STRING
    },
    exam_title: {
      type: Sequelize.STRING,
    },
    slug: {
      type: Sequelize.STRING,
    },
    upcoming_date: {
      type: Sequelize.STRING,
    },
    exam_short_name: {
      type: Sequelize.STRING,
    },
    cover_image: {
      type: Sequelize.STRING,
    },
    meta_title: {
      type: Sequelize.STRING,
    },
    meta_description: {
      type: Sequelize.STRING,
    },
    meta_keywords: {
      type: Sequelize.STRING,
    },
    overview: {
      type: Sequelize.STRING,
    },
    exam_dates: {
      type: Sequelize.STRING,
    },
    eligibility_criteria: {
      type: Sequelize.STRING,
    },
    syllabus: {
      type: Sequelize.STRING,
    },
    cutoff: {
      type: Sequelize.STRING,
    },
    admit_card: {
      type: Sequelize.STRING,
    },
    exam_centers: {
      type: Sequelize.STRING,
    },
    results: {
      type: Sequelize.STRING,
    },
    prepretion_tips: {
      type: Sequelize.STRING,
    },
    counseling: {
      type: Sequelize.STRING,
    },
    accept_colleges: {
      type: Sequelize.STRING
    },
    promo_banner: {
      type: Sequelize.INTEGER
    },
    promo_banner_status: {
      type: Sequelize.ENUM("Draft", "Published"),
    },
    status: {
      type: Sequelize.ENUM("Draft", "Published"),
    },
    logo: {
      type: Sequelize.STRING,
    },
    level_of_study: {
      type: Sequelize.ENUM("UG", "PG", "Professional"),
    },
    types_of_exams: {
      type: Sequelize.ENUM("Language_Proficiency", "Aptitude_Test", "Streams"),
    },
  },
    {
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  //*** Relation Ship */
  /* Stream.associate = function(models) {
      Stream.hasMany(models.sub_stream, {as: 'substreams'});
      Stream.hasMany(models.stream_faqs, {as: 'streamfaqs'});
    };*/

  return exam;
};
