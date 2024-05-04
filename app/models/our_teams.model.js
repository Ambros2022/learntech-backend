module.exports = (sequelize, Sequelize) => {
    const our_teams = sequelize.define("our_teams", {
        name: {
            type: Sequelize.STRING,
        },
        designation: {
            type: Sequelize.STRING
        },
        linked_in_link: {
            type: Sequelize.STRING
        },
        image: {
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

    return our_teams;
};