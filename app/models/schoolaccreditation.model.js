module.exports = (sequelize, Sequelize) => {
    const schoolaccreditations = sequelize.define("school_accreditations", {
        accreditation_id : {
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


  return schoolaccreditations;
};
