module.exports = (sequelize, Sequelize) => {
    const blog_categorie = sequelize.define("blog_categories", {
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

    return blog_categorie;
};