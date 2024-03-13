module.exports = (sequelize, Sequelize) =>
{
  const course_companies = sequelize.define("course_companies",
    {
      courses_id:{
        type: Sequelize.INTEGER
      },

      companies_id: {
        type: Sequelize.INTEGER
      },
    
    
    }
    ,
    {
      // freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return course_companies;
};
