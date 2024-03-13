module.exports = (sequelize, Sequelize) => {
    const Author = sequelize.define("authors", {
        author_name: {
            type: Sequelize.STRING
        },
        designation: {
            type: Sequelize.STRING
        },
        photo: {
            type: Sequelize.STRING

        },
        description: {
            type: Sequelize.STRING
        }
        
    } ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );


  return Author;
};
