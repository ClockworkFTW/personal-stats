const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const trackSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  stat: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String, required: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, required: true },
});

trackSchema.plugin(uniqueValidator);

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
