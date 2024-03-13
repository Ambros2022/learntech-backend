module.exports = (sequelize, Sequelize) => {
    const polytechnicamenities = sequelize.define("polytechnic_amenities", {
        amenities_id : {
            type: Sequelize.INTEGER
        },
        polytechnic_id : {
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


  return polytechnicamenities;
};