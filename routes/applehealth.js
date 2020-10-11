const express = require("express");
const router = express.Router();

const { wasYesterday } = require("../util");
const Activity = require("../models/activity");

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;

    await Promise.all(
      data.map(async (activity) => {
        const date = new Date(activity.date);
        await Activity.create({ ...activity, date });

        // if (wasYesterday(date)) {
        //   await Activity.create({ ...activity, date });
        // }
      })
    );

    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
});

module.exports = router;
