module.exports = (sequelize, Sequelize) => {
    const genders = sequelize.define("genders", {
        name: {
            type: Sequelize.STRING
        },

    },
        {

            timestamps: true,
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }

    );

    return genders;
};
