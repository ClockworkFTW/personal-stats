const mongoose = require("mongoose");

const timeSchema = new mongoose.Schema({
  total_time: String,
  all_productive_time: String,
  all_distracting_time: String,
  very_productive_time: String,
  productive_time: String,
  neutral_time: String,
  distracting_time: String,
  very_distracting_time: String,
  business_time: String,
  communication_and_scheduling_time: String,
  design_and_composition_time: String,
  entertainment_time: String,
  news_time: String,
  software_development_time: String,
  reference_and_learning_time: String,
  shopping_time: String,
  utilities_time: String,
  date: Date,
});

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
