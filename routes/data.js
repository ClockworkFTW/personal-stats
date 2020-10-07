const express = require("express");
const router = express.Router();

const Activity = require("../models/activity");

router.get("/", async (req, res) => {
  try {
    let { type, range } = req.query;

    console.log(type, range);

    const activities = await Activity.find({});

    res.status(200).json({ activities });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
