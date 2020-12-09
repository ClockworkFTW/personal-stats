const hash = require("object-hash");
const { formatDate } = require("../util");
const { pass, fail } = require("../config");
const googlesheets = require("../services/googlesheets");
const Time = require("../models/time");
const id = process.env.RESCUETIME_ID;

module.exports = async () => {
  try {
    // Fetch data
    let times = await googlesheets.getData(id);

    // Format data
    times = times.map((time) => {
      const date = formatDate(time.date);
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
