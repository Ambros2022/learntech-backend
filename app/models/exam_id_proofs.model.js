module.exports = (sequelize, Sequelize) => {
    const  exam_id_proof_details= sequelize.define("exam_id_proof_details", {
      exam_id: {
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.STRING
      }
     
    }
    ,
    {
      
      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
   
    }
    
    );

  
    return  exam_id_proof_details;
  };
  