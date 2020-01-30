const Sequelize = require('sequelize');

// Code configures the Sequelize instance and requires the Movie model defined in the models/movie.js file
// The file exports the db object thats holding the Sequelize and database configs, as well as the models. 
// Exposing the Sequelize package when we import models into our code means that we have all of the Sequelize methods and functionality available to us. 

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

const db = {
  sequelize,
  Sequelize,
  models: {},
};

db.models.Movie = require('./models/movie.js')(sequelize);
// import new model
db.models.Person = require('./models/person.js')(sequelize);

module.exports = db;