const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const heartSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  stat: { type: String, required: true },
  resting_heart_rate: { type: String, required: true },
  heart_rate_variability: { type: String, required: true },
});

heartSchema.plugin(uniqueValidator);

const Heart = mongoose.model("Heart", heartSchema);

module.exports = Heart;
