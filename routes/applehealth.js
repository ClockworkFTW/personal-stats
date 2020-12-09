const express = require("express");
const router = express.Router();
const _ = require("lodash");
const moment = require("moment");
const hash = require("object-hash");

const { durationAsSeconds } = require("../util");

// prettier-ignore
const models = {
  heart: ["Resting Heart Rate", "Heart Rate Variability"],
  diet: ["Active Calories", "Resting Calories", "Dietary Calories", "Protein", "Carbohydrates", "Total Fat", "Caffeine"],
  steps: ["Steps", "Walking + Running Distance"],
  weight: ["Weight", "Body Fat Percentage"],
  sleep: ["Sleep"],
};

router.post("/", async (req, res) => {
  try {
    for (const model in models) {
      if (models.hasOwnProperty(model)) {
        const types = models[model];

        let data = req.body.data.filter(({ type }) => types.includes(type));
        data = data.map((e) => ({
          ...e,
          date: moment(e.date).format("YYYY-MM-DD"),
        }));
        data = _.groupBy(data, "date");

        const group = [];

        for (const date in data) {
          const obj = { date };
          if (data.hasOwnProperty(date)) {
            data[date].forEach((e) => {
              const { type, value, duration } = e;
              if (type === "Sleep") {
                const seconds = durationAsSeconds(duration);
                obj.duration = obj.duration ? obj.duration + seconds : seconds;
              } else {
                const key = type.toLowerCase().split(" ").join("_");
                obj[key] = Number(value).toFixed(1);
              }
            });
          }
          group.push({ ...obj, uid: hash(obj) });
        }

        // Save group to database
        // await Model.insertMany(activities, { ordered: false });
        console.log(group);
      }
    }

    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
});

module.exports = router;
