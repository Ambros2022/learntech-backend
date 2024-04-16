module.exports = (sequelize, Sequelize) => {
  const schoolamenities = sequelize.define("school_amenities", {
    amenitie_id: {
      type: Sequelize.INTEGER
    },
    school_id: {
      type: Sequelize.INTEGER
    },
  },
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return schoolamenities;
};