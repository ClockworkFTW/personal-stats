const { pass, fail } = require("../config");
const github = require("../services/github");
const Commit = require("../models/commit");

module.exports = async () => {
  try {
    const events = await github.getEvents();
    await Commit.insertMany(events, { ordered: false });

    console.log(pass("PASSED - GITHUB"));
  } catch (error) {
    console.log(fail("FAILED - GITHUB"));
  }
};
