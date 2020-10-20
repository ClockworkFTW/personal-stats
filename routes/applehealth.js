const express = require("express");
const router = express.Router();
const hash = require("object-hash");

const Activity = require("../models/activity");

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;

    const activities = data.map((activity) => {
      const date = new Date(activity.date);
      const obj = { ...activity, date };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    await Activity.insertMany(activities, { ordered: false });

    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
});

module.exports = router;
