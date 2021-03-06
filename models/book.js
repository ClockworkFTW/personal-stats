const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const bookSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  time: { type: Date, required: true },
  stat: { type: String, required: true },
  book_id: { type: String, required: true },
  title: { type: String, required: true },
  author: { type: String, required: true },
  num_pages: { type: String, required: true },
  cur_page: { type: String, required: true },
  cur_percent: { type: String, required: true },
});

bookSchema.plugin(uniqueValidator);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
