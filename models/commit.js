const mongoose = require("mongoose");

const commitSchema = new mongoose.Schema({
  type: String,
  repo: String,
  date: Date,
});

const Commit = mongoose.model("Commit", commitSchema);

module.exports = Commit;
