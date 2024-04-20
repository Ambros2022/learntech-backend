module.exports = (sequelize, Sequelize) => {
  const Enquiry = sequelize.define("enquiries", {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    contact_number: {
      type: Sequelize.STRING
    },
    location: {
      type: Sequelize.STRING
    },
    course_in_mind: {
      type: Sequelize.STRING
    },
    college_name: {
      type: Sequelize.STRING
    },
    school_name: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT
    },
    current_url: {
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

  return Enquiry;
};
