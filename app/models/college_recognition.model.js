module.exports = (sequelize, Sequelize) => {
  const college_recognition = sequelize.define("college_recognitions", {
    recognition_id: {
      type: Sequelize.INTEGER
    },

    college_id: {
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

  return college_recognition;
};
