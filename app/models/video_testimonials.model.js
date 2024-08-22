module.exports = (sequelize, Sequelize) => {
    const video_testimonials = sequelize.define("video_testimonials", {
        title: {
            type: Sequelize.STRING,
        },
        name: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        video_url: {
            type: Sequelize.STRING
        },
        full_url: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.ENUM('Draft','About_us_page','Testimonial_page')
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

    return video_testimonials;
};