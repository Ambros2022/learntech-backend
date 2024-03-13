module.exports = (sequelize, Sequelize) => {
    const polytechnicaccreditations = sequelize.define("polytechnic_accreditations", {
        accreditation_id : {
            type: Sequelize.INTEGER
        },
        polytechnic_id  : {
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


  return polytechnicaccreditations;
};
