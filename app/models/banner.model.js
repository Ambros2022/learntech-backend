
module.exports = (sequelize, Sequelize) => {

const banner = sequelize.define("banners", {
   
      title: {
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.STRING
      },
      link: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM('draft', 'published')
      },
      promo_banner: {
        type: Sequelize.ENUM('Draft','All_Exam_page','All_News_page','All_Scholarship_page','Nri_page','Study_Abroad_page','All_college_page','All_university_page','All_school_page')
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
  
    return banner;
  };
  