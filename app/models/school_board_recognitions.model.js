module.exports = (sequelize, Sequelize) => {
    const school_board_recognitions = sequelize.define("school_board_recognitions", {

        recognition_id: {
            type: Sequelize.INTEGER
        },
        school_board_id: {
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

    return school_board_recognitions;
};