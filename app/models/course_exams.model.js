module.exports = (sequelize, Sequelize) =>
{
  const course_exams = sequelize.define("course_exams",
    {
      courses_id: {
        type: Sequelize.INTEGER
      },

      exams_id: {
        type: Sequelize.INTEGER
      },
    
    }
    ,
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return course_exams;
};
