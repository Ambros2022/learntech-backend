module.exports = (sequelize, Sequelize) => {
    const organization_pages = sequelize.define("organization_pages", {
        title: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
        categories: {
            type: Sequelize.ENUM('Streams', 'Courses', 'Exams', 'Study_Abroad'),
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

    return organization_pages;
};
