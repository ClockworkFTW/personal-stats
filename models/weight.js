const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const weightSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  stat: { type: String, required: true },
  weight: { type: String, required: true },
  body_fat_percentage: { type: String, required: true },
});

weightSchema.plugin(uniqueValidator);

const Weight = mongoose.model("Weight", weightSchema);

module.exports = Weight;
