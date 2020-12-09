const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const github = require("../services/github");
const Commit = require("../models/commit");

module.exports = async () => {
  try {
    // Fetch data
    const events = await github.getEvents();

    // Format data
    events = events.map((event) => {
      const { type } = event;
      const repo = event.repo.name.split("/")[1];
      const date = formatDate(event.created_at);
      const obj = { type, repo, date, stat: "commit" };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    // Save data
    await Commit.insertMany(events, { ordered: false });

    console.log(pass("PASSED - GITHUB"));
  } catch (error) {
    console.log(fail("FAILED - GITHUB"));
  }
};
