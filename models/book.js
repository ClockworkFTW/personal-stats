const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  num_pages: String,
  curr_page: String,
  curr_percent: String,
  created_at: Date,
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
