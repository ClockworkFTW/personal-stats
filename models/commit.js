const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const commitSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  repo: { type: String, required: true },
  date: { type: Date, required: true },
});

commitSchema.plugin(uniqueValidator);

const Commit = mongoose.model("Commit", commitSchema);

module.exports = Commit;
