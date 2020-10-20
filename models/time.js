const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const timeSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  total_time: { type: String, required: true },
  all_productive_time: { type: String, required: true },
  all_distracting_time: { type: String, required: true },
  very_productive_time: { type: String, required: true },
  productive_time: { type: String, required: true },
  neutral_time: { type: String, required: true },
  distracting_time: { type: String, required: true },
  very_distracting_time: { type: String, required: true },
  business_time: { type: String, required: true },
  communication_and_scheduling_time: { type: String, required: true },
  design_and_composition_time: { type: String, required: true },
  entertainment_time: { type: String, required: true },
  news_time: { type: String, required: true },
  software_development_time: { type: String, required: true },
  reference_and_learning_time: { type: String, required: true },
  shopping_time: { type: String, required: true },
  utilities_time: { type: String, required: true },
  date: { type: Date, required: true },
});

timeSchema.plugin(uniqueValidator);

const Time = mongoose.model("Time", timeSchema);

module.exports = Time;
