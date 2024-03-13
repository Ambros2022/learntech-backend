module.exports = (sequelize, Sequelize) => {
    const Accreditation = sequelize.define("accreditations", {
        accreditation_name: {
            type: Sequelize.STRING
        },
        accreditation_slug: {
            type: Sequelize.STRING
        },
        accreditation_full_name: {
            type: Sequelize.STRING

        },
        accreditation_description: {
            type: Sequelize.STRING
        },
        keywords: {
            type: Sequelize.STRING
        }
    } ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return Accreditation;
};
