module.exports = (sequelize, Sequelize) => {
    const groups = sequelize.define("groups", {
        title: {
            type: Sequelize.STRING
        },
        group: {
            type: Sequelize.STRING
        },

        slug: {
            type: Sequelize.STRING
        },
        meta_title: {
            type: Sequelize.STRING
        },
        meta_description: {
            type: Sequelize.STRING
        },

        description: {
            type: Sequelize.TEXT
        },

        status: {
            type: Sequelize.ENUM('Active', 'Inactive')
        },
        listing_status: {
            type: Sequelize.ENUM('Active', 'Inactive')
        },
        order: {
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

    return groups;
};
