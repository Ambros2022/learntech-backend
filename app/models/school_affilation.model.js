module.exports = (sequelize, Sequelize) => {
    const schoolaffiliations = sequelize.define("school_affiliations", {
      affiliations_id: {
            type: Sequelize.INTEGER
        },
        school_id: {
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


  return schoolaffiliations;
};