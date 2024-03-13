module.exports = (sequelize, Sequelize) => {
    const testimonial = sequelize.define("testimonials", {
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
        photo: {
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

    return testimonial;
};
