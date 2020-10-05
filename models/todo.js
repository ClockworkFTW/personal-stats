const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  name: String,
  project: String,
  priority: String,
  link: String,
  date: Date,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
