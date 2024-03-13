module.exports = (sequelize, Sequelize) => {
    const schooltype = sequelize.define("school_types", {
        type: {
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


  return schooltype;
};
