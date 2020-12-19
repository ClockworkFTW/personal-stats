const hash = require("object-hash");
const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const github = require("../services/github");
const Commit = require("../models/commit");

module.exports = async () => {
  try {
    // Fetch data
    let events = await github.getEvents();

    // Format data
    events = events.map((event) => {
      const { type } = event;
      const repo = event.repo.name.split("/")[1];
      const time = new Date(event.created_at);
      const date = formatDate(time);
      const obj = { type, repo, time, date, stat: "commit" };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    // Save data
    await Commit.insertMany(events, { ordered: false });

    console.log(pass("PASSED - GITHUB"));
  } catch (error) {
    console.log(error);
    console.log(fail("FAILED - GITHUB"));
  }
};
