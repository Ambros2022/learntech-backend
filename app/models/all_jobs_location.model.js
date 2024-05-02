module.exports = (sequelize, Sequelize) => {
    const all_job_locations = sequelize.define("all_job_locations", {
        name: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("Draft", "Published"),
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

    return all_job_locations;
};
