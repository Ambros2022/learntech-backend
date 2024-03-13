module.exports = (sequelize, Sequelize) => {
  const studentform = sequelize.define(
    "students_coming_froms",
    {
      place: {
        type: Sequelize.STRING,
      },
      language: {
        type: Sequelize.STRING,
      },
      meta_title: {
        type: Sequelize.STRING,
      },

      slug: {
        type: Sequelize.STRING,
      },

      meta_description: {
        type: Sequelize.STRING,
      },

      page_title: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT,
      },
      order: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.ENUM('Draft', 'Published'),
      },
    },
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

  return studentform;
};
