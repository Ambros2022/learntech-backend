module.exports = (sequelize, Sequelize) => {
    const scholar_gender = sequelize.define("scholar_genders", {
        gender_id: {
            type: Sequelize.INTEGER
        },

        scholar_id: {
            type: Sequelize.INTEGER
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

    return scholar_gender;
};
