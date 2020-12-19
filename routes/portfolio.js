const express = require("express");
const router = express.Router();

const googlesheets = require("../services/googlesheets");
const SHEETS_ID_PORTFOLIO = process.env.SHEETS_ID_PORTFOLIO;

router.get("/", async (req, res) => {
  try {
    const projects = await googlesheets.getData(SHEETS_ID_PORTFOLIO, 1);
    const about = await googlesheets.getData(SHEETS_ID_PORTFOLIO, 2);
    const technologies = await googlesheets.getData(SHEETS_ID_PORTFOLIO, 3);
    res.status(200).json({ projects, about, technologies });
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
