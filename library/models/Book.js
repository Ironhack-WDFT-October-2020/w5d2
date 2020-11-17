const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: String,
  description: String,
  author: String,
  rating: Number
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;