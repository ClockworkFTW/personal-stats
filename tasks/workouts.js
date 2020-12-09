const hash = require("object-hash");

const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const googlesheets = require("../services/googlesheets");
const Workout = require("../models/workout");
const id = process.env.WORKOUT_ID;

module.exports = async () => {
  try {
    // Fetch data
    let workouts = await googlesheets.getData(id);

    // Format data
    workouts = workouts.map((workout) => {
      const date = formatDate(workout.Date);
      const time = new Date(`${date}T${workout.Time}:00`);
      const duration = workout["Total Time"];
      const type = workout.Type;
      const obj = { date, time, duration, type };
      const uid = hash(obj);
      return { uid, ...obj, stat: "workout" };
    });

    // Save data
    Workout.insertMany(workouts, { ordered: false });

    console.log(pass("PASSED - RESCUETIME"));
  } catch (error) {
    console.log(fail("FAILED - RESCUETIME"));
  }
};
