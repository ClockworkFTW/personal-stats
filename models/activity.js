const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const activitySchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: String, required: true },
  value: { type: String, required: true },
  unit: String,
});

activitySchema.plugin(uniqueValidator);

const Activity = mongoose.model("Activity", activitySchema);

module.exports = Activity;
