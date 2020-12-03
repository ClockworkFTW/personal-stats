const express = require("express");
const router = express.Router();

const {
  setDateLimit,
  formatActivities,
  groupByDateAndStat,
} = require("../util");

const Activity = require("../models/activity");
const Book = require("../models/book");
const Commit = require("../models/commit");
const Diet = require("../models/diet");
const Place = require("../models/place");
const Time = require("../models/time");
const Todo = require("../models/todo");
const Track = require("../models/track");
const Workout = require("../models/workout");

router.get("/", async (req, res) => {
  try {
    let activities = await Activity.find(setDateLimit(req.query));
    activities = formatActivities(activities);
    const commits = await Commit.find(setDateLimit(req.query));
    const books = await Book.find(setDateLimit(req.query));
    const diet = await Diet.find(setDateLimit(req.query));
    const places = await Place.find(setDateLimit(req.query));
    const time = await Time.find(setDateLimit(req.query));
    const todos = await Todo.find(setDateLimit(req.query));
    const tracks = await Track.find(setDateLimit(req.query));
    const workouts = await Workout.find(setDateLimit(req.query));

    // prettier-ignore
    let data = { activities, books, commits, diet, places, time, todos, tracks, workouts }
    const types = req.query.type ? req.query.type.split(",") : null;

    if (types) {
      data = types.reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/calendar", async (req, res) => {
  try {
    const commits = await Commit.find({});
    const books = await Book.find({});
    const diet = await Diet.find({});
    const places = await Place.find({});
    const time = await Time.find({});
    const todos = await Todo.find({});
    const tracks = await Track.find({});
    const workouts = await Workout.find({});

    const collection = [
      commits,
      books,
      diet,
      places,
      time,
      todos,
      tracks,
      workouts,
    ].flat();

    const data = groupByDateAndStat(collection);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
