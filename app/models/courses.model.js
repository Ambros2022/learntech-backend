module.exports = (sequelize, Sequelize) => {
  const courses = sequelize.define("courses", {
    college_id: {
      type: Sequelize.INTEGER
    },
    general_course_id: {
      type: Sequelize.INTEGER
    },
    course_type: {
      type: Sequelize.ENUM("UG", "PG", "Diploma", "Doctorate", "Default"),
    },
    slug: {
      type: Sequelize.STRING
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    course_details: {
      type: Sequelize.STRING
    },
    eligibility: {
      type: Sequelize.STRING
    },
    fee_structure: {
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
      updatedAt: "updated_at",

    }

  );
  //*** Relation Ship */
  /* Stream.associate = function(models) {
     Stream.hasMany(models.sub_stream, {as: 'substreams'});
     Stream.hasMany(models.stream_faqs, {as: 'streamfaqs'});
   };*/

  return courses;
};
