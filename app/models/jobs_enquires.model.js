module.exports = (sequelize, Sequelize) => {
  const jobsenquires = sequelize.define("jobs_enquires", {
    jobs_position_id: {
      type: Sequelize.STRING
    },
    job_location_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.STRING
    },
    d_o_b: {
      type: Sequelize.STRING
    },
    current_location: {
      type: Sequelize.STRING
    },
    total_exp: {
      type: Sequelize.STRING
    },
    resume: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('Draft', 'Published'),
    }
  },
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return jobsenquires;
};
