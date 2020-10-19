const mongoose = require("mongoose");
const chalk = require("chalk");

const dbURL = process.env.MONGODB_URL;

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = (worker) => {
  mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on("connected", () => {
    console.log(connected(`Mongoose default connection is open to: ${dbURL}`));
    worker.start();
  });

  mongoose.connection.on("error", (err) => {
    console.log(error(`Mongoose default connection has occurred ${err} error`));
  });

  mongoose.connection.on("disconnected", () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
    worker.stop();
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      worker.stop();
      process.exit(0);
    });
  });
};
