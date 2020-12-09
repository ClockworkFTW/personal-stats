const CronJob = require("cron").CronJob;
const moment = require("moment");

// Import chalk
const { pending } = require("./config");

// Import cron job tasks
const workouts = require("./tasks/workouts");
const todoist = require("./tasks/todoist");
const rescuetime = require("./tasks/rescuetime");
const foursquare = require("./tasks/foursquare");
const github = require("./tasks/github");
const goodreads = require("./tasks/goodreads");
const lastfm = require("./tasks/lastfm");

// Define cron job settings
const interval = "0 0 * * *";
const timezone = "America/Los_Angeles";

// Execute cron job tasks
const tasks = async () => {
  console.log(
    pending("TASKS STARTED:", moment().format("h:mm:ssA YYYY-MM-DD"))
  );

  await workouts();
  await todoist();
  await rescuetime();
  await foursquare();
  await github();
  await goodreads();
  await lastfm();

  console.log(
    pending("TASKS COMPLETED:", moment().format("h:mm:ssA YYYY-MM-DD"))
  );
};

module.exports = new CronJob(interval, tasks, null, true, timezone);
