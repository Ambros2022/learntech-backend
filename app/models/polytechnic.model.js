module.exports = (sequelize, Sequelize) => {
  const polytechnic = sequelize.define("polytechnics", {
    polytechnic_name: {
      type: Sequelize.STRING
    },
    polytechnic_slug : {
      type: Sequelize.STRING
    },
    city_id: {
      type: Sequelize.INTEGER
    },
    area_id : {
      type: Sequelize.INTEGER
    },
    polytechnic_type_id : {
      type: Sequelize.INTEGER
    },
    polytechnic_logo  : {
      type: Sequelize.STRING
    },
    status  : {
      type: Sequelize.TEXT
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

  return polytechnic;
};
