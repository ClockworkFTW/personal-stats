const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const workoutSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  time: { type: Date, required: true },
  stat: { type: String, required: true },
  duration: { type: String, required: true },
  type: { type: String, required: true },
});

workoutSchema.plugin(uniqueValidator);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
