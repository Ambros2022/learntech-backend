module.exports = (sequelize, Sequelize) => {
  const jobvaccancies = sequelize.define(
    "job_vacancies",
    {
      position: {
        type: Sequelize.STRING,
      },
      experience: {
        type: Sequelize.STRING,
      },
      no_of_vacancy: {
        type: Sequelize.INTEGER,
      },

      location: {
        type: Sequelize.TEXT,
      },

      slug: {
        type: Sequelize.STRING,
      },

      description: {
        type: Sequelize.TEXT,
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

  return jobvaccancies;
};
