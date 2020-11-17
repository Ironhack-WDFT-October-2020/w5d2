const mongoose = require('mongoose');
const Celebrity = require('../models/celebrity');

mongoose.connect('mongodb://localhost/lab-mongoose-movies', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
  {
    name: "Gerhard Schroeder",
    occupation: "politician",
    catchPhrase: "Ich will hier rein",
  },
  {
    name: "Leonardo diCaprio",
    occupation: "actor",
    catchPhrase: "I'm the king of the world",
  },
  {
    name: "Harrison Ford",
    occupation: "actor",
    catchPhrase: "I hate snakes",
  },
  {
    name: "Christoph Waltz",
    occupation: "actor",
    catchPhrase: "I was expecting you James",
  },
  {
    name: "Samuel L. Jackson",
    occupation: "actor",
    catchPhrase: "Say what again"
  }

];
Celebrity.insertMany(celebrities)
  .then(result => {
    console.log('Seed successfull');
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(`An error occured: ${err}`);
  });