const Sequelize = require('sequelize');

// Code configures the Sequelize instance and requires the Movie model defined in the models/movie.js file

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);

module.exports = db;