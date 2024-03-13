module.exports = (sequelize, Sequelize) => {
  const school = sequelize.define("schools", {
    school_name: {
      type: Sequelize.STRING
    },
    school_logo: {
      type: Sequelize.STRING
    },
    school_slug : {
      type: Sequelize.STRING
    },
    meta_title: {
      type: Sequelize.STRING
    },
  	meta_description: {
      type: Sequelize.STRING
    },
    established: {
      type: Sequelize.STRING
    },
    address : {
      type: Sequelize.STRING
    },
    map: {
      type: Sequelize.STRING
    },
    about: {
      type: Sequelize.STRING
    },
    extra_curricular: {
      type: Sequelize.STRING
    },
    // school_board_id: {
    //   type: Sequelize.INTEGER
    // },
    city_id: {
      type: Sequelize.INTEGER
    },
    area_id : {
      type: Sequelize.INTEGER
    },
    school_type_id : {
      type: Sequelize.INTEGER
    },
    genders_accepted: {
      type: Sequelize.STRING
    },
    total_seats  : {
      type: Sequelize.INTEGER
    },
    status  : {
      type: Sequelize.TEXT
    },
    avg_rating: {
      type: Sequelize.FLOAT
    },
    listing_order: {
      type: Sequelize.INTEGER
    },
    video_url: {
      type: Sequelize.STRING
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

  return school;
};
