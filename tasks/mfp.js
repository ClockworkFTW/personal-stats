const mfp = require("mfp");
const pify = require("pify");
const moment = require("moment");

const { pass, fail } = require("../config");
const Diet = require("../models/diet");
const username = process.env.MFP_USERNAME;

module.exports = async (now) => {
  try {
    const fetchDiet = pify(mfp.fetchSingleDate, { errorFirst: false });

    const date = moment(now).format("YYYY-MM-DD");
    const data = await fetchDiet(username, date, "all");
    await Diet.create(data);

    console.log(pass("PASSED - MFP"));
  } catch (error) {
    console.log(fail("FAILED - MFP"));
  }
};
