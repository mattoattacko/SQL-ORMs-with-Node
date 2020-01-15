const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Movie model / creates Movies table
// We extend from Sequelize.Model, which is part of Sequelize's API for model definition. 
// To initialize and configure the model, we call static class init() method on the model name (Movie). 
// Movie.init() defines a new table in the DB w/ the name 'Movies'. Sequelize will look for information in the 'Movies' table. 
// REMEMBER! The model name is singular and the table name is plural. Don't worry, Sequelize uses inflection to auto pluralize the table name. 
//

// This creates a column for movie titles
// aka "this code initializes a model representing a 'Movies' table in a db, with one column: 'title' ".
// We set the model attributes by defining a column named 'title' by passing init() an object with a 'title' property. 
// Each column needs a data type. 
// The 'title' should be a string data type, so we set the value of 'title' to Sequelize.STRING
// Sequelize.STRING indicates that the value of 'title' should be a variable length string.
// We need a sequelize property that defines the sequelize instance to attach to the model, so we attach the Sequelize instance by setting the sequelize property to the variable 'sequelize'. Else it will throw an error. 
class Movie extends Sequelize.Model {}
Movie.init({
  title: Sequelize.STRING
}, { sequelize }); // same as { sequelize: sequelize }

// Defines the async function. async IIFE
// Uses a try...catch statement to catch all exceptions thrown. We pass catch() an error param to contain the error details. 
// Can use 'await sequelize.authenticate()' in the try block to test the connection 
// 
(async () => {
  await sequelize.sync();

  try {
 
  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
})();