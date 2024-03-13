module.exports = (sequelize, Sequelize) => {
    const schoolrecognition = sequelize.define("school_recognition_and_approvals", {
      recognition_id: {
            type: Sequelize.INTEGER
        },
        school_id : {
            type: Sequelize.INTEGER
        },
    } ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return schoolrecognition;
};