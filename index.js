const express = require("express");
const app = express();
const port = process.env.PORT || 3005;

require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// Start worker once db connection has been established
const worker = require("./worker");
const dbConnect = require("./models");
dbConnect(worker);

// Listen for updates from apple health
const applehealth = require("./routes/applehealth");
app.use("/api/apple-health", applehealth);

// Return statistics data
const statistics = require("./routes/statistics");
app.use("/api/statistics", statistics);

// Return portfolio data
const portfolio = require("./routes/portfolio");
app.use("/api/portfolio", portfolio);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
