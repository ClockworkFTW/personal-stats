const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const workoutSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  calories: { type: Number, required: true },
  minutes: { type: Number, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, required: true },
});

workoutSchema.plugin(uniqueValidator);

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
