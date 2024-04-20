module.exports = (sequelize, Sequelize) => {
  const college_galleries = sequelize.define("college_galleries", {
    college_id: {
      type: Sequelize.INTEGER
    },
    image: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.INTEGER
    },

  }
    ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return college_galleries;
};
