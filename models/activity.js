const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  type: String,
  date: Date,
  value: Number,
  unit: String,
});

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
