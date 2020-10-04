const express = require("express");
const router = express.Router();

const Step = require("../models/steps");

router.post("/", async (req, res) => {
  try {
    const { data } = req.body;

    for (let i = 0; i < data.length; i++) {
      const element = data[i];

      // Add more activity types in the future
      switch (element.type) {
        case "Steps":
          await Step.create(element);
          break;
        default:
          break;
      }
    }

    console.log(data);
    res.status(200).end();
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = router;
