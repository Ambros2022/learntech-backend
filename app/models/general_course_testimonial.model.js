module.exports = (sequelize, Sequelize) => {
  const general_course_testimonials = sequelize.define("general_course_testimonials", {
    video_id: {
      type: Sequelize.INTEGER
    },

    general_course_id: {
      type: Sequelize.INTEGER
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

  return general_course_testimonials;
};
