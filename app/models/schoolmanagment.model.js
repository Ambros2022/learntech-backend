module.exports = (sequelize, Sequelize) => {
    const schoolmanagment = sequelize.define("school_managements", {
        management_id: {
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


  return schoolmanagment;
};