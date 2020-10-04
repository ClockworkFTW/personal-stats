const CronJob = require("cron").CronJob;
const moment = require("moment");

// Import cron job tasks
const mfp = require("./tasks/mfp");
const todoist = require("./tasks/todoist");
const foursquare = require("./tasks/foursquare");
const github = require("./tasks/github");
const goodreads = require("./tasks/goodreads");
const lastfm = require("./tasks/lastfm");

// Define cron job settings
const interval = "* * * * *";
const timezone = "America/Los_Angeles";

// Execute cron job tasks
const tasks = async () => {
  console.log("TASKS STARTED:", moment().format("h:mm:ssA YYYY-MM-DD"));

  // await mfp("2020-09-21");
  // await todoist();
  // await foursquare();
  // await github();
  // await goodreads();
  // await lastfm();

  console.log("TASKS COMPLETED:", moment().format("h:mm:ssA YYYY-MM-DD"));
};

goodreads();

module.exports = new CronJob(interval, tasks, null, true, timezone);
