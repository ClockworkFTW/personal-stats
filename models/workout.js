const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema({
  calories: Number,
  minutes: Number,
  sets: Number,
  reps: Number,
  weight: Number,
  date: Date,
  type: String,
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
