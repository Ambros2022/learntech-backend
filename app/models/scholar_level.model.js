module.exports = (sequelize, Sequelize) => {
    const scholar_level = sequelize.define("scholar_levels", {
        name: {
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

    return scholar_level;
};
