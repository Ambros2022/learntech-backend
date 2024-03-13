module.exports = (sequelize, Sequelize) => {
  const CollegeAndUniversity = sequelize.define("college_and_universities", {
    type: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    established: {
      type: Sequelize.STRING
    },
    city_id : {
      type: Sequelize.INTEGER
    },
    area_id: {
      type: Sequelize.INTEGER
    },
    rank: {
      type: Sequelize.INTEGER
    },
    slug : {
      type: Sequelize.STRING
    },
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
      type: Sequelize.STRING
    },
    code_before_body: {
      type: Sequelize.STRING
    },
    facts: {
      type: Sequelize.STRING
    },
    college_type: {
      type: Sequelize.STRING
    },
    genders_accepted: {
      type: Sequelize.STRING
    },
    campus_size: {
      type: Sequelize.STRING
    },
    campus_size_type: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    map: {
      type: Sequelize.STRING
    },
    home_view_status: {
      type: Sequelize.STRING
    },
    order: {
      type: Sequelize.STRING
    },
    about: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    video: {
      type: Sequelize.STRING
    },
    video_full_url: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    scholarship: {
      type: Sequelize.STRING
    },
    exam_data: {
      type: Sequelize.STRING
    },
    why_choose: {
      type: Sequelize.STRING
    },
    career_opportunities: {
      type: Sequelize.STRING
    },
    listing_order : {
      type: Sequelize.INTEGER
    },
    keywords: {
      type: Sequelize.STRING
    },
    top_featured_order: {
      type: Sequelize.INTEGER
    },
    is_top_featured: {
      type: Sequelize.INTEGER
    },
    undergraduate: {
      type: Sequelize.STRING
    },
    placements: {
      type: Sequelize.STRING
    },
    postgraduate: {
      type: Sequelize.STRING
    },
    Doctorate: {
      type: Sequelize.STRING
    },
    Diploma: {
      type: Sequelize.STRING
    },
    Scholarships: {
      type: Sequelize.STRING
    },
    admissions: {
      type: Sequelize.STRING
    },
    avg_rating: {
      type: Sequelize.FLOAT
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

  return CollegeAndUniversity;
};



