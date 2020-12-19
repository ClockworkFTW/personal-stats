const express = require("express");
const router = express.Router();
const _ = require("lodash");
const hash = require("object-hash");

const Diet = require("../models/diet");
const Heart = require("../models/heart");
const Sleep = require("../models/sleep");
const Step = require("../models/step");
const Weight = require("../models/weight");

const { formatDate, durationAsSeconds } = require("../util");

// prettier-ignore
const stats = {
  heart: {types: ["Resting Heart Rate", "Heart Rate Variability"], model: Heart},
  diet: {types: ["Active Calories", "Resting Calories", "Dietary Calories", "Protein", "Carbohydrates", "Total Fat", "Caffeine"], model: Diet},
  sleep: {types: ["Sleep"], model: Sleep},
  steps: {types: ["Steps", "Walking + Running Distance"], model: Step},
  weight: {types: ["Weight", "Body Fat Percentage"], model: Weight},
};

router.post("/", async (req, res) => {
  try {
    for (const stat in stats) {
      if (stats.hasOwnProperty(stat)) {
        const { types, model } = stats[stat];

        // Get data from request body and group by date
        let { data } = req.body;
        data = data.filter(({ type }) => types.includes(type));
        data = data.map((e) => ({ ...e, date: formatDate(e.time) }));
        data = _.groupBy(data, "date");

        // Format date groupings into stat groupings
        const group = [];
        for (const date in data) {
          if (data.hasOwnProperty(date)) {
            let obj = { date, stat };
            data[date].forEach((e) => {
              const { type, value, duration, time } = e;
              if (type === "Sleep") {
                const seconds = durationAsSeconds(duration);
                obj.duration = obj.duration ? obj.duration + seconds : seconds;
              } else {
                const key = type.toLowerCase().split(" ").join("_");
                obj[key] = Number(value).toFixed(1);
              }
            });
            group.push({ ...obj, uid: hash(obj) });
          }
        }

        // Save groupings to database
        await model.insertMany(group, { ordered: false });
      }
    }

    res.status(200).send("SUCCESS");
  } catch (error) {
    console.log(error);
    res.status(400).send("ERROR");
  }
});

module.exports = router;
