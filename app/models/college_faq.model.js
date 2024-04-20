module.exports = (sequelize, Sequelize) => {
    const college_faq = sequelize.define("college_faqs", {
        college_id: {
            type: Sequelize.INTEGER
        },
        questions: {
            type: Sequelize.STRING
        },
        answers: {
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



    return college_faq;
};