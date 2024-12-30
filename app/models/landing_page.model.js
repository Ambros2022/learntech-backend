module.exports = (sequelize, Sequelize) => {
    const landing_page = sequelize.define("landing_pages", {
        name: {
            type: Sequelize.STRING
        },
        link: {
            type: Sequelize.STRING
        },
        logo: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.ENUM("Draft", "Published"),
        },
        listing_order: {
            type: Sequelize.INTEGER
          },
    },
        {

            timestamps: true,
            underscored: true,
            createdAt: "created_at",
            updatedAt: "updated_at",

        }

    );


    return landing_page;
};