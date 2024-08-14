module.exports = (sequelize, Sequelize) => {
    const genders = sequelize.define("genders", {
        name: {
            type: Sequelize.STRING
        },

    }
    );

    return genders;
};
