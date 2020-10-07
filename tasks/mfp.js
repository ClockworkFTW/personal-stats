const moment = require("moment");

const mfp = require("../services/mfp");
const Diet = require("../models/diet");
const Workout = require("../models/workout");
const { pass, fail } = require("../config");

module.exports = async () => {
  try {
    const date = moment().subtract(1, "days").format("YYYY-MM-DD");

    const nutrition = await mfp.getNutrition(date);
    await Diet.create(nutrition);

    const workouts = await mfp.getWorkouts(date);
    await Workout.insertMany(workouts);

    console.log(pass("PASSED - MFP"));
  } catch (error) {
    console.log(fail("FAILED - MFP"));
  }
};
