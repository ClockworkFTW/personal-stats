const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const sleepSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  stat: { type: String, required: true },
  duration: { type: String, required: true },
});

sleepSchema.plugin(uniqueValidator);

const Sleep = mongoose.model("Sleep", sleepSchema);

module.exports = Sleep;
