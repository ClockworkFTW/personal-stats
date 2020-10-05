const googlesheets = require("../services/googlesheets");
const { pass, fail } = require("../config");
const { wasYesterday } = require("../util");
const Time = require("../models/time");
const id = process.env.RESCUETIME_ID;

module.exports = async () => {
  try {
    const data = await googlesheets.getData(id);

    await Promise.all(
      data.map(async (time) => {
        const date = new Date(time.date);

        if (wasYesterday(date)) {
          await Time.create({ ...time, date });
        }
      })
    );

    console.log(pass("PASSED - RESCUETIME"));
  } catch (error) {
    console.log(fail("FAILED - RESCUETIME"));
  }
};
