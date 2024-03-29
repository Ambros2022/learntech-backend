module.exports = (sequelize, Sequelize) => {
  const Stream = sequelize.define("streams", {
    name: {
      type: Sequelize.STRING
    },
    slug: {
      type: Sequelize.STRING
    },
    h1_title: {
      type: Sequelize.TEXT
    },
    logo: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    top_college: {
      type: Sequelize.TEXT
    },
    meta_title: {
      type: Sequelize.STRING
    },
    meta_description: {
      type: Sequelize.STRING
    },
    meta_keyboard: {
      type: Sequelize.TEXT
    },
    listing_order: {
      type: Sequelize.INTEGER
    },

    // stream_description: {
    //   type: Sequelize.TEXT
    // },


    // keywords: {
    //   type: Sequelize.STRING
    // },

    // ug_box: {
    //   type: Sequelize.TEXT
    // },
    // pg_box: {
    //   type: Sequelize.TEXT
    // },
    // diploma_box: {
    //   type: Sequelize.STRING
    // },
    // doctorate_box: {
    //   type: Sequelize.TEXT
    // },
    // description_box: {
    //   type: Sequelize.TEXT
    // },
    // eligibility_criteria: {
    //   type: Sequelize.TEXT
    // },
    // placement_career: {
    //   type: Sequelize.TEXT
    // },
    // top_recruiters: {
    //   type: Sequelize.TEXT
    // },
    // job_analysis: {
    //   type: Sequelize.TEXT
    // },

    // icon: {
    //   type: Sequelize.STRING
    // },
    // home_view_status: {
    //   type: Sequelize.STRING
    // },

    // promo_banner: {
    //   type: Sequelize.STRING
    // },
    // promo_banner_status: {
    //   type: Sequelize.STRING
    // },


  }
    ,
    {

      timestamps: true,
      underscored: true,
      createdAt: "created_at",
      updatedAt: "updated_at",

    }

  );
  //*** Relation Ship */
  /* Stream.associate = function(models) {
     Stream.hasMany(models.sub_stream, {as: 'substreams'});
     Stream.hasMany(models.stream_faqs, {as: 'streamfaqs'});
   };*/

  return Stream;
};
