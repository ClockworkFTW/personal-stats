const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const dietSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  stat: { type: String, required: true },
  active_calories: { type: String, required: true },
  resting_calories: { type: String, required: true },
  dietary_calories: { type: String, required: true },
  protein: { type: String, required: true },
  carbohydrates: { type: String, required: true },
  total_fat: { type: String, required: true },
  caffeine: { type: String, required: true },
});

dietSchema.plugin(uniqueValidator);

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
