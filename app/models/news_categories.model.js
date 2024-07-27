module.exports = (sequelize, Sequelize) => {
    const news_categorie = sequelize.define("news_categories", {
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

    return news_categorie;
};

