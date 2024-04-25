module.exports = (sequelize, Sequelize) => {
    const jobs_positions = sequelize.define("jobs_positions", {
        name: {
            type: Sequelize.STRING
        },
        job_description: {
            type: Sequelize.STRING
        },
        exp_required: {
            type: Sequelize.STRING
        },
        total_positions: {
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

    return jobs_positions;
};
