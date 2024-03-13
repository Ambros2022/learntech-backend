module.exports = (sequelize, Sequelize) =>
{
  const modes = sequelize.define("modes",
    {
        mode: {
        type: Sequelize.STRING
      },

   
    
    }
    ,
    {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }


  );

  return modes;
};
