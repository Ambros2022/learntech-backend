module.exports = (sequelize, Sequelize) =>
{
  const course_modes = sequelize.define("course_modes",
    {
      courses_id: {
        type: Sequelize.INTEGER
      },

      modes_id: {
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

  return course_modes;
};
