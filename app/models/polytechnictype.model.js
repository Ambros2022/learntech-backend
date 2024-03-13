module.exports = (sequelize, Sequelize) => {
    const polytechnictype = sequelize.define("polytechnic_types", {
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


  return polytechnictype;
};
