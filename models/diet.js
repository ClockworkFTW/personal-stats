const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  calories: Number,
  carbs: Number,
  fat: Number,
  protein: Number,
  cholesterol: Number,
  sodium: Number,
  sugar: Number,
  fiber: Number,
  date: Date,
  water: Number,
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
