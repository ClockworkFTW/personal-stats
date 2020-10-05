const chalk = require("chalk");

const pending = chalk.bold.yellow;
const pass = chalk.bold.green;
const fail = chalk.bold.red;

module.exports = { pending, pass, fail };
