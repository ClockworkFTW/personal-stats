const hash = require("object-hash");

const googlesheets = require("../services/googlesheets");
const { pass, fail } = require("../config");
const Time = require("../models/time");
const id = process.env.RESCUETIME_ID;

module.exports = async () => {
  try {
    let times = await googlesheets.getData(id);

    times = times.map((time) => {
      const date = new Date(time.date);
      const obj = { ...time, date };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    Time.insertMany(times, { ordered: false });

    console.log(pass("PASSED - RESCUETIME"));
  } catch (error) {
    console.log(fail("FAILED - RESCUETIME"));
  }
};
