module.exports = (sequelize, Sequelize) => {
    const board_colleges = sequelize.define("board_colleges", {
        board_id: {
        type: Sequelize.INTEGER
      },
  
      college_id: {
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
  
    return board_colleges;
  };
  