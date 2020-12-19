const hash = require("object-hash");

const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const googlesheets = require("../services/googlesheets");
const Workout = require("../models/workout");
const SHEETS_ID_WORKOUTS = process.env.SHEETS_ID_WORKOUTS;

module.exports = async () => {
  try {
    // Fetch data
    let workouts = await googlesheets.getData(SHEETS_ID_WORKOUTS, 1);

    // Format data
    workouts = workouts.map((workout) => {
      const date = formatDate(workout.Date, "MM/DD/YYYY");
      const time = new Date(`${date}T${workout.Time}:00`);
      const duration = workout["Total Time"];
      const type = workout.Type;
      const obj = { date, time, duration, type };
      const uid = hash(obj);
      return { uid, ...obj, stat: "workout" };
    });

    // Save data
    Workout.insertMany(workouts, { ordered: false });

    console.log(pass("PASSED - WORKOUTS"));
  } catch (error) {
    console.log(fail("FAILED - WORKOUTS"));
  }
};
