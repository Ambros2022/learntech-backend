module.exports = (sequelize, Sequelize) => {
  const exam= sequelize.define(
    "exams",
    {
      meta_title: {
        type: Sequelize.STRING,
      },
      meta_description: {
        type: Sequelize.STRING,
      },
      meta_keyword: {
        type: Sequelize.STRING,
      },
      slug: {
        type: Sequelize.STRING,
      },
      stream_id: {
        type: Sequelize.INTEGER
      },
      upcoming_date: {
        type: Sequelize.STRING,
      },
      centers: {
        type: Sequelize.STRING,
      },
      exam_pattern: {
        type: Sequelize.STRING,
      },
      important_dates: {
        type: Sequelize.STRING,
      },
      tips: {
        type: Sequelize.STRING,
      },
      card: {
        type: Sequelize.STRING,
      },
      colleges: {
        type: Sequelize.STRING,
      },
      results: {
        type: Sequelize.STRING,
      },
      exam_title: {
        type: Sequelize.STRING,
      },
      exam_short_name: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("Draft", "Published"),
      },

      exam_description: {
        type: Sequelize.STRING,
      },

      eligibility_criteria: {
        type: Sequelize.STRING,
      },
      cover_image: {
        type: Sequelize.STRING,
      },
      keywords: {
        type: Sequelize.STRING,
      },
      home_view_status: {
        type: Sequelize.STRING
      },
      listing_order : {
        type: Sequelize.INTEGER
      },
      promo_banner: {
        type: Sequelize.STRING
      },
      promo_banner_status: {
        type: Sequelize.STRING
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
