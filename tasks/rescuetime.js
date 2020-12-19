const hash = require("object-hash");
const { formatDate } = require("../util");
const { pass, fail } = require("../config");
const googlesheets = require("../services/googlesheets");
const Time = require("../models/time");
const SHEETS_ID_RESCUETIME = process.env.SHEETS_ID_RESCUETIME;

module.exports = async () => {
  try {
    // Fetch data
    let times = await googlesheets.getData(SHEETS_ID_RESCUETIME, 1);

    // Format data
    times = times.map((time) => {
      const date = formatDate(time.date, "MMMM D, YYYY");
      const obj = { ...time, date };
      const uid = hash(obj);
      return { uid, ...obj, stat: "time" };
    });

    // Save data
    Time.insertMany(times, { ordered: false });

    console.log(pass("PASSED - RESCUETIME"));
  } catch (error) {
    console.log(fail("FAILED - RESCUETIME"));
  }
};
