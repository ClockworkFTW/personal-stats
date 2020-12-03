const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const dietSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  stat: { type: String, required: true },
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fat: { type: Number, required: true },
  protein: { type: Number, required: true },
  cholesterol: { type: Number, required: true },
  sodium: { type: Number, required: true },
  sugar: { type: Number, required: true },
  fiber: { type: Number, required: true },
  date: { type: Date, required: true },
});

dietSchema.plugin(uniqueValidator);

const Diet = mongoose.model("Diet", dietSchema);

module.exports = Diet;
