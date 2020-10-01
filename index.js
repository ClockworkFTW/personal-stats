const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const dbConnect = require("./models");
dbConnect();

const Step = require("./models/steps");

app.use(express.json());

app.get("/", async (req, res) => {
  console.log("fetching stats...");
  res.status(200).end();
});

app.post("/apple-health", async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
