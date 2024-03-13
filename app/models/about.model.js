
module.exports = (sequelize, Sequelize) => {
    const abouts = sequelize.define("abouts", {
   
        meta_title: {
        type: Sequelize.STRING
      },
      meta_description: {
        type: Sequelize.STRING
      },
      meta_keyword: {
        type: Sequelize.STRING
      },
      code_before_head: {
        type: Sequelize.TEXT
      },
      code_before_body: {
        type: Sequelize.TEXT
      },
      who_we_are: {
        type: Sequelize.TEXT
      },
      our_mission: {
        type: Sequelize.TEXT
      },
      our_vision: {
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
  
    return abouts;
  };
  