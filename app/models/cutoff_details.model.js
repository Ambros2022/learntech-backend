module.exports = (sequelize, Sequelize) => {
  const cutoffdetails = sequelize.define(
    "cut_offs_details",
    {
      cut_offs_id: {
        type: Sequelize.INTEGER,
      },
      course_id: {
        type: Sequelize.INTEGER,
      },
      category: {
        type: Sequelize.STRING,
      },
      rank: {
        type: Sequelize.STRING,
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

  return cutoffdetails;
};
