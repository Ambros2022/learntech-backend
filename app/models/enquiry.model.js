module.exports = (sequelize, Sequelize) => {
  const Enquiry = sequelize.define("enquiries", {
    name: {
      type: Sequelize.STRING
    },
    
    email: {
      type: Sequelize.STRING
    },
    course_name: {
      type: Sequelize.STRING
    },
    college_name: {
      type: Sequelize.STRING
    },
   gender: {
      type: Sequelize.ENUM('male', 'female', 'others')
    },
   newsletters: {
      type: Sequelize.ENUM('yes', 'no')
    },
  current_qualification: {
      type: Sequelize.STRING
    },
    course_in_mind: {
      type: Sequelize.STRING
    },
   dob: {
      type: Sequelize.STRING
    },
    contact_number: {
      type: Sequelize.STRING
    },
    current_url: {
      type: Sequelize.STRING
    },
   description: {
      type: Sequelize.TEXT
    },
    location: {
      type: Sequelize.STRING
    },
    mobile_verified: {
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

  return Enquiry;
};
