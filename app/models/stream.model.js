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
    meta_keyword: {
      type: Sequelize.TEXT
    },
    listing_order: {
      type: Sequelize.INTEGER
    },
    banner: {
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

  return Stream;
};
