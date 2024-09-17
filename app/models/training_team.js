module.exports = (sequelize, Sequelize) => {
    const training_teams = sequelize.define("training_teams", {
        name: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING
        },
        experience : {
            type: Sequelize.STRING
        },
        description : {
            type: Sequelize.STRING
        },
    }
        ,
        {

            timestamps: true,
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",

        }

    );

    return training_teams;
};