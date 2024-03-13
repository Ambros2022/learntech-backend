module.exports = (sequelize, Sequelize) => {
    const abroadcountries = sequelize.define("abroad_countries", {
      country_name: {
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


  return abroadcountries;
};
