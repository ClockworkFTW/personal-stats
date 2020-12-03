const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const todoSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  stat: { type: String, required: true },
  name: { type: String, required: true },
  project: { type: String, required: true },
  priority: { type: String, required: true },
  link: { type: String, required: true },
  date: { type: Date, required: true },
});

todoSchema.plugin(uniqueValidator);

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
