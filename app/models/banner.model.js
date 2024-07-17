
module.exports = (sequelize, Sequelize) => {

  const banner = sequelize.define("banners", {

    title: {
      type: Sequelize.STRING
    },
    link: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM('draft', 'published')
    },
    promo_banner: {
      type: Sequelize.ENUM('Draft','All_Exams_page','All_News_page','All_Scholarship_page','Nri_page','Study_Abroad_page','All_college_page','All_courses_page','All_university_page','All_school_page','Services_Page','All_about_page','All_our_teams')
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
