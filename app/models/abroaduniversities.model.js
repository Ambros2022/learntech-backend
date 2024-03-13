
module.exports = (sequelize, Sequelize) => {
  const abroad_universities = sequelize.define("abroad_universities", {
 
    university_name: {
      type: Sequelize.STRING
    },
    country_id: {
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

  return abroad_universities;
};
