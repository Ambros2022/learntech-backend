module.exports = (sequelize, Sequelize) => {
    const counsellor_teams = sequelize.define("counsellor_teams", {
        name: {
            type: Sequelize.STRING,
        },
        location: {
            type: Sequelize.STRING
        },
        experience: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        image: {
            type: Sequelize.STRING
        },
        info: {
            type: Sequelize.STRING
        },
        listing_order: {
            type: Sequelize.INTEGER
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

    return counsellor_teams;
};