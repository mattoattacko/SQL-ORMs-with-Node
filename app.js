// We will use this more modularized app.js file as opposed to our original design in app_v1.js.
// The entry file imports the database and destructures the 'Movie' model imported from db.models.
// The app.js file only contains the code related to syncing models, querying data, and CRUD operations.

const db = require('./db');
const { Movie, Person } = db.models;
const { Op } = db.Sequelize;

(async () => {
  await db.sequelize.sync({ force: true });

  try {
    // All model instances
    const movie = await Movie.create({
      title: 'Toy Story 1',
      runtime: 81,
      releaseDate: '2000-01-02',
      isAvailableOnVHS: true,
    });
    console.log(movie.toJSON());

    const movie2 = await Movie.create({
      title: 'Toy Story 2',
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
      title: 'Toy Story 3',
      runtime: 103,
      releaseDate: '2010-06-18',
      isAvailableOnVHS: false,
    });
    await movie3.save(); // save the record
    console.log(movie3.toJSON());

    // // Find by Primary Key
    const movieById = await Movie.findByPk(1);
    console.log(movieById.toJSON());

    // Find One
    const movieByRuntime = await Movie.findOne({ where: { runtime: 103 }});
    console.log(movieByRuntime.toJSON());

    // Returning a subset of data with attributes
    //
    // const movies = await Movie.findAll({
    //   attributes: ['id', 'title'],
    //   where: {
    //     releaseDate: {
    //       [Op.gte]: '2004-01-01', // >= date
    //     // title: {
    //     //   [Op.endsWith]: 's'
    //     // },
    //     },
    //     runtime: {
    //       [Op.gt]: 95, // > than 95
    //     },
    //   },
    //   // order: [['releaseDate', 'ASC']], // dates in ascending order
    //   order: [['id', 'DESC']] // IDs in descending order
    // });
    // console.log( movies.map(movie => movie.toJSON()) );

    // Update a record w/ save()
    //
    // const toyStory3 = await Movie.findByPk(3);
    // toyStory3.isAvailableOnVHS = true;
    // await toyStory3.save();
    // console.log( toyStory3.get({ plain: true}) );

    // Update a record w/ update()
    //
    // const toyStory3 = await Movie.findByPk(3);
    // await toyStory3.update({
    //   title: 'Fake Toy Story 3', // new title
    //   isAvailableOnVHS: true,
    // },{ fields: [ 'title', 'isAvailableOnVHS'] });

    // console.log( toyStory3.get({ plain: true }) );

    // Find a Record
    //
    // const toyStory = await Movie.findByPk(1);

    // Delete a Record
    //
    // await toyStory.destroy();

    // Find & Log All Movies
    //
    const movies = await Movie.findAll();
    console.log ( movies.map(movie => movie.toJSON()));

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