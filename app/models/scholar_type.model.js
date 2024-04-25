module.exports = (sequelize, Sequelize) => {
    const scholar_type = sequelize.define("scholar_types", {
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

    return scholar_type;
};
