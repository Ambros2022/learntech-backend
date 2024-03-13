module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
        category_name: {
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


  return Categories;
};
