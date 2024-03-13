module.exports = (sequelize, Sequelize) => {
    const viedotestimonial = sequelize.define("video_testimonials", {
        title: {
            type: Sequelize.STRING
        },
        name: {
            type: Sequelize.STRING
        },

        designation: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.TEXT
        },
        tag: {
            type: Sequelize.ENUM('College', 'University', 'Bangalore Study')
        },
        video_url: {
            type: Sequelize.STRING
        },
        full_url: {
            type: Sequelize.STRING
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

    return viedotestimonial;
};
