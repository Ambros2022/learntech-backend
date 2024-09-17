module.exports = (sequelize, Sequelize) => {
    const abroadpage = sequelize.define("abroadpages", {

        country_id: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },
        slug: {
            type: Sequelize.STRING
        },
        info: {
            type: Sequelize.TEXT
        },
        backgroundimage: {
            type: Sequelize.TEXT
        },
        meta_title: {
            type: Sequelize.TEXT
        },
        meta_description: {
            type: Sequelize.TEXT
        },
        meta_keyword: {
            type: Sequelize.TEXT
        },
        level_of_study: {
            type: Sequelize.ENUM("UG", "PG", "professional"),
        },
        // level_of_exams: {
        //     type: Sequelize.ENUM("Language-Proficiency","Aptitude-Test","Streams"),
        // },
        // status: {
        //     type: Sequelize.ENUM("Draft", "Published"),
        // },
    }
        ,
        {
            timestamps: true,
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at"
        }


    );

    return abroadpage;
};
