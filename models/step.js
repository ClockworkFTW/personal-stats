const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const stepSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  stat: { type: String, required: true },
  steps: { type: String, required: true },
  "walking_+_running_distance": { type: String, required: true },
});

stepSchema.plugin(uniqueValidator);

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
