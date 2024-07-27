module.exports = (sequelize, Sequelize) => {
    const abroadpage_faq = sequelize.define("abroadpage_faqs", {
        abroad_page_id: {
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



    return abroadpage_faq;
};
