// We will use this more modularized app.js file as opposed to our original design in app_v1.js.
// The entry file imports the database and destructures the 'Movie' model imported from db.models.
// The app.js file only contains the code related to syncing models, querying data, and CRUD operations.

const db = require('./db');
const { Movie, Person } = db.models;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    const movie = await Movie.create({
      title: 'Matt & Charles: Episode 1',
      runtime: 81,
      releaseDate: '2000-01-02',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'Matt & Charles 7: Return of the Matt',
      runtime: 120,
      releaseDate: '2001-01-03',
      isAvailableOnVHS: true,
    });
    console.log(movie2.toJSON());

    // New Person Record
    const person = await Person.create({
      firstName: 'Matt',
      lastName: 'Attack',
    });
    console.log(person.toJSON());

    // New Instance
    const movie3 = await Movie.build({
      title: 'Toy Story 3: Oh Dickins',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    console.log(movie3.toJSON());

  } catch (error) {
    // This if says "if the error is SequelizeValidationError, map over the error item(s) and return an array holding any error messages." 
    // In our case, we are outputting them to the console.
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map(err => err.message);
      console.error('Validation errors: ', errors);
    } 
    // In this else block, we use a 'throw' statement to rethrow other types of errors caught by catch. ie: general or unforseen errors.
    else {
      throw error;
    }
  }
})();