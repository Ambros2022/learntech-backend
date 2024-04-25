module.exports = (sequelize, Sequelize) => {
  const scholarships = sequelize.define("scholarships", {
    level_id: {
      type: Sequelize.STRING
    },
    type_id: {
      type: Sequelize.STRING
    },
    country_id: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    gender: {
      type: Sequelize.ENUM("male", "female", "others"),
    },
    amount: {
      type: Sequelize.STRING
    },
    last_date: {
      type: Sequelize.TEXT
    },
    total_scholarships: {
      type: Sequelize.STRING
    },
    is_eligible: {
      type: Sequelize.STRING
    },
    logo: {
      type: Sequelize.STRING
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    meta_keywords: {
      type: Sequelize.STRING
    },
    overview: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.ENUM("Draft", "Published"),
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

  return scholarships;
};
