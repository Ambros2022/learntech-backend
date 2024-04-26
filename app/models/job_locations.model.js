module.exports = (sequelize, Sequelize) => {
    const joblocations = sequelize.define("job_locations", {
        job_location_id : {
            type: Sequelize.STRING
        },
        jobs_position_id  : {
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


  return joblocations;
};
