const express = require("express");
const router = express.Router();

const { setDateLimit } = require("../util");

const Activity = require("../models/activity");
const Book = require("../models/book");
const Diet = require("../models/diet");
const Place = require("../models/place");
const Time = require("../models/time");
const Todo = require("../models/todo");
const Track = require("../models/track");
const Workout = require("../models/workout");

router.get("/", async (req, res) => {
  try {
    const activities = await Activity.find(setDateLimit(req.query));
    const books = await Book.find(setDateLimit(req.query));
    const diet = await Diet.find(setDateLimit(req.query));
    const places = await Place.find(setDateLimit(req.query));
    const time = await Time.find(setDateLimit(req.query));
    const todos = await Todo.find(setDateLimit(req.query));
    const tracks = await Track.find(setDateLimit(req.query));
    const workouts = await Workout.find(setDateLimit(req.query));

    // prettier-ignore
    let data = { activities, books, diet, places, time, todos, tracks, workouts }
    const types = req.query.type ? req.query.type.split(",") : null;

    if (types) {
      data = types.reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
