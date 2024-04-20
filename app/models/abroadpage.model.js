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
        }
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
