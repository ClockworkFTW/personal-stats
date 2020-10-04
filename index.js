const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

require("dotenv").config();

app.use(express.json());

// Start worker once db connection has been established
const worker = require("./worker");
const dbConnect = require("./models");
dbConnect(worker);

// Listen for updates from apple health
const applehealth = require("./routes/applehealth");
app.use("/apple-health", applehealth);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
