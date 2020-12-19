const express = require("express");
const router = express.Router();

const { setDateLimit, groupByDateAndStat } = require("../util");

const Book = require("../models/book");
const Commit = require("../models/commit");
const Diet = require("../models/diet");
const Heart = require("../models/heart");
const Place = require("../models/place");
const Sleep = require("../models/sleep");
const Step = require("../models/step");
const Time = require("../models/time");
const Todo = require("../models/todo");
const Track = require("../models/track");
const Weight = require("../models/weight");
const Workout = require("../models/workout");

// Return data by time frame and stat
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    const dateLimit = setDateLimit(from, to);

    const books = await Book.find(dateLimit);
    const commits = await Commit.find(dateLimit);
    const diet = await Diet.find(dateLimit);
    const heart = await Heart.find(dateLimit);
    const places = await Place.find(dateLimit);
    const sleep = await Sleep.find(dateLimit);
    const steps = await Step.find(dateLimit);
    const time = await Time.find(dateLimit);
    const todos = await Todo.find(dateLimit);
    const tracks = await Track.find(dateLimit);
    const weight = await Weight.find(dateLimit);
    const workouts = await Workout.find(dateLimit);

    let data = {
      books,
      commits,
      diet,
      heart,
      places,
      sleep,
      steps,
      time,
      todos,
      tracks,
      weight,
      workouts,
    };

    const types = req.query.type ? req.query.type.split(",") : null;

    if (types) {
      data = types.reduce((obj, key) => ({ ...obj, [key]: data[key] }), {});
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// Return data in calendar format
router.get("/calendar", async (req, res) => {
  try {
    const books = await Book.find({});
    const commits = await Commit.find({});
    const diet = await Diet.find({});
    const heart = await Heart.find({});
    const places = await Place.find({});
    const sleep = await Sleep.find({});
    const steps = await Step.find({});
    const time = await Time.find({});
    const todos = await Todo.find({});
    const tracks = await Track.find({});
    const weight = await Weight.find({});
    const workouts = await Workout.find({});

    const collection = [
      books,
      commits,
      diet,
      heart,
      places,
      sleep,
      steps,
      time,
      todos,
      tracks,
      weight,
      workouts,
    ].flat();

    const data = groupByDateAndStat(collection);

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
