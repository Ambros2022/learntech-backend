module.exports = (sequelize, Sequelize) => {
    const organization_page_steps = sequelize.define("organization_page_steps", {
      organization_page_id: {
        type: Sequelize.STRING,
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      order_by: {
        type: Sequelize.STRING
      },
    }
      ,
      {
  
        timestamps: true,
        underscored: true,
        createdAt: "created_at",
        updatedAt: "updated_at",
  
      }
  
    );
  
    return organization_page_steps;
  };
  