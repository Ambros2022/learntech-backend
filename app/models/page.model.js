module.exports = (sequelize, Sequelize) => {
  const pages = sequelize.define("pages", {
    url: {
      type: Sequelize.STRING,
    },
    top_description: {
      type: Sequelize.STRING
    },
    bottom_description: {
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

  return pages;
};
