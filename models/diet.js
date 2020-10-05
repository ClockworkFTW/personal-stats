const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema({
  calories: String,
  carbs: String,
  fat: String,
  protein: String,
  cholesterol: String,
  sodium: String,
  sugar: String,
  fiber: String,
  date: Date,
  water: String,
});

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
