const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  type: String,
  date: Date,
  value: Number,
  unit: String,
});

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
