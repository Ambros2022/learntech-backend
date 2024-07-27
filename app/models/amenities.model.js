module.exports = (sequelize, Sequelize) => {
    const Amenities = sequelize.define("amenities", {
        amenities_name: {
            type: Sequelize.STRING
        },
        amenities_slug: {
            type: Sequelize.STRING
        },
        amenities_logo: {
            type: Sequelize.STRING
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


    return Amenities;
};
