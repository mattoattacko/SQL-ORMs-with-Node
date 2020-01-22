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
      validate: {
        notNull: {
          msg: 'Please provide a value for "title',
        },
        notEmpty: { 
          // our custom error message
          msg: 'Please provide a value for "title"',
        } 
      },
    },
    runtime: {
      type: Sequelize.INTEGER,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "runtime"',
        },
        min: {
          args: 1,
          msg: 'Please provide a value greater than "0" for "runtime"',
        },
      },
    },
    releaseDate: {
      type: Sequelize.DATEONLY,
      allowNull: false, // disallow null
      validate: {
        notNull: {
          msg: 'Please provide a value for "releaseDate"',
        },
        isAfter: {
          args: '1895-12-27',
          msg: 'Please provide a value on or after "1895-12-28" for "releaseDate"',
        },
      },
    },
    isAvailableOnVHS: {
      type: Sequelize.BOOLEAN,
      allowNull: false, // disallow null
      defaultValue: false, // set default value
    },
  }, {sequelize});

  return Movie;
};
