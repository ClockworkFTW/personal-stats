const mongoose = require("mongoose");
const chalk = require("chalk");

const dbURL =
  "mongodb+srv://clockworkftw:%23Trinity13@cluster0.9vvob.mongodb.net/personal_stats?retryWrites=true&w=majority";

const connected = chalk.bold.cyan;
const error = chalk.bold.yellow;
const disconnected = chalk.bold.red;
const termination = chalk.bold.magenta;

module.exports = () => {
  mongoose.connect(dbURL, { useNewUrlParser: true });

  mongoose.connection.on("connected", () => {
    console.log(connected(`Mongoose default connection is open to: ${dbURL}`));
  });

  mongoose.connection.on("error", (err) => {
    console.log(error(`Mongoose default connection has occurred ${err} error`));
  });

  mongoose.connection.on("disconnected", () => {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", () => {
    mongoose.connection.close(() => {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
