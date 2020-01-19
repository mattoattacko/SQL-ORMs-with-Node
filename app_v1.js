const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db',
  // logging: false //disables SQL logging to console
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
// We can force sync all models by passing { force: true} to the sync() method. Calling 'sync({ force: true })' issues a DROP TABLE IF EXISTS statement, then issues CREATE TABLE IF NOT EXISTS statement. 
// 
(async () => {
  await sequelize.sync({ force: true });

  try {
    // Instance of the Movie class represents a database row
    const movie = await Movie.create({
      title: 'Charles is my co-driver',
    });
    console.log(movie.toJSON());

    // testing new entry
    const movie2 = await Movie.create({
      title: 'Matt & Charles Excellent Adventure',
    });
    console.log(movie2.toJSON());

  } catch (error) {
    console.error('Error connecting to database: ', error);
  }
})();