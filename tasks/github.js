const { pass, fail } = require("../config");
const github = require("../services/github");
const Commit = require("../models/commit");

module.exports = async () => {
  try {
    const commits = await github.getCommits();
    await Commit.insertMany(commits);

    console.log(pass("PASSED - GITHUB"));
  } catch (error) {
    console.log(fail("FAILED - GITHUB"));
  }
};
