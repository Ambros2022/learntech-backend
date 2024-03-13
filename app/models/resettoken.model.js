module.exports = (sequelize, Sequelize) => {
    const resettokens = sequelize.define("resettokens", {
        user_id: {
            type: Sequelize.INTEGER,
        },
        email: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.INTEGER
        },
        expiration: {
            type: Sequelize.INTEGER
        },

        used: {
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

    return resettokens;
};
