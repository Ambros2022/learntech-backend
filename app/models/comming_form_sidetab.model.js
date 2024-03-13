module.exports = (sequelize, Sequelize) => {
  const commingform = sequelize.define("coming_from_side_tabs", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    students_coming_from_id : {
      type: Sequelize.INTEGER
    },
    order : {
      type: Sequelize.INTEGER
    }
       
  }
  ,
  {
    required: false,
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true 
  }
  
  );

  

  return commingform;
};
