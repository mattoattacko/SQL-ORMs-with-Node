// We will use this more modularized app.js file as opposed to our original design in app_v1.js.
// The entry file imports the database and destructures the 'Movie' model imported from db.models.
// The app.js file only contains the code related to syncing models, querying data, and CRUD operations.

const db = require('./db');
const { Movie } = db.models;

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

  } catch (error) {
    console.error('Error connecting to the database my dude: ', error);
  }
})();