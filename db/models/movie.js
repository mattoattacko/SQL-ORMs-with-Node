const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Movie extends Sequelize.Model {}
  Movie.init({
    // Sets custom primary key column
    // "primaryKey: true" tells Sequelize to generate the primary key column using the property name defined in the model (for us its 'id').
    // The ID should be a number, so our data tpe is INTEGER.
    // "autoIncrement: true" auto generates an ID that increments by 1 for each new entry.
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false, // disallow null
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false, // disallow null
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false, // disallow null
      defaultValue: false, // set default value
    },
  }, {sequelize});

  return Movie;
};
