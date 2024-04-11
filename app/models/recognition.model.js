module.exports = (sequelize, Sequelize) => {
  const recognition = sequelize.define("recognition_and_approvals", {
    recognition_approval_name: {
      type: Sequelize.STRING
    },

    recognition_approval_slug: {
      type: Sequelize.STRING
    },
    recognition_approval_full_name: {
      type: Sequelize.STRING
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

  return recognition;
};
