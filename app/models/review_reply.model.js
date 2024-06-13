module.exports = (sequelize, Sequelize) => {
    const review_replies = sequelize.define("review_replies", {
        content: {
            type: Sequelize.STRING
        },
        user_id: {
            type: Sequelize.INTEGER
        },
        review_id: {
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

    return review_replies;
};
