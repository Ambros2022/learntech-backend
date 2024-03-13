module.exports = (sequelize, Sequelize) => {
    const databackup = sequelize.define("data_back_ups", {
        title: {
            type: Sequelize.STRING
        },
        path: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.INTEGER,

        }
    } ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return databackup;
};
