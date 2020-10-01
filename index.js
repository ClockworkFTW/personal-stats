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
  console.log(req.body);
  res.status(200).end();
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
