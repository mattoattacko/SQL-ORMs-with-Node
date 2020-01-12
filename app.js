const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'movies.db'
});

// Defines the async function
// async IIFE
// uses a try...catch statement to catch all exceptions thrown. We pass catch() an error param to contain the error details 
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