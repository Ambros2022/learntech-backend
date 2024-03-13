module.exports = (sequelize, Sequelize) =>
{
  const university_colleges = sequelize.define("university_colleges",
    {
      college_id: {
        type: Sequelize.INTEGER
      },

      university_id: {
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

  return university_colleges;
};
