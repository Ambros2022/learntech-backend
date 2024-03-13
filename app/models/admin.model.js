module.exports = (sequelize, Sequelize) => {
  const Admin = sequelize.define("admins", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
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

  return Admin;
};
