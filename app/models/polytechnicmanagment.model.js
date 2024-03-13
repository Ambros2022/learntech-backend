module.exports = (sequelize, Sequelize) => {
    const polytechnicmanagment = sequelize.define("polytechnic_managements", {
        management_id: {
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


  return polytechnicmanagment;
};