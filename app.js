const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Movie model
// We extend from Sequelize.Model, which is part of Sequelize's API for model definition. 
// To initialize and configure the model, we call static class init() method on the model name (Movie). 
// Movie.init() defines a new table in the DB w/ the name 'Movies'. Sequelize will look for information in the 'Movies' table. 
// REMEMBER! The model name is singular and the table name is plural. Don't worry, Sequelize uses inflection to auto pluralize the table name. 
//
class Movie extends Sequelize.Model {}
Movie.init();

// Defines the async function. async IIFE
// Uses a try...catch statement to catch all exceptions thrown. We pass catch() an error param to contain the error details. 
// await sequelize.authenticate() tests the connection 
// 
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to database successful');
  } catch (error) {
    console.error('Error connecting to database');
  }
})();