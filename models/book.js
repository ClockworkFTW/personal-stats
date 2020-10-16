const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  num_pages: String,
  curr_page: String,
  curr_percent: String,
  date: Date,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
