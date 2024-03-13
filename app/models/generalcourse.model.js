module.exports = (sequelize, Sequelize) => {
  const generalcourse = sequelize.define("general_courses", {
  
    course_stream_name: {
      type: Sequelize.STRING
    },
    is_deleted: {
      type: Sequelize.INTEGER
    },
    course_short_name: {
      type: Sequelize.STRING
    },
    course_stream_slug: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    admission: {
      type: Sequelize.TEXT
    },
    carrier_opportunities: {
      type: Sequelize.TEXT
    }
    ,
    course_type: {
      type: Sequelize.TEXT
    }
    ,
    meta_description: {
      type: Sequelize.TEXT
    },
    meta_title: {
      type: Sequelize.STRING
    }
    ,
    logo: {
      type: Sequelize.STRING
    },
    stream_id: {
      type: Sequelize.INTEGER
    }
    ,
    sub_stream_id: {
      type: Sequelize.INTEGER
    },
    promo_banner: {
      type: Sequelize.STRING
    },
    promo_banner_status: {
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

  return generalcourse;
};
