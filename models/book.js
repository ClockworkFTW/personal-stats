const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  book_id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  num_pages: { type: String, required: true },
  cur_page: { type: String, required: true },
  cur_percent: { type: String, required: true },
  date: { type: Date, required: true },
});

bookSchema.plugin(uniqueValidator);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
