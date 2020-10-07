const mongoose = require("mongoose");

const trackSchema = new mongoose.Schema({
  artist: String,
  album: String,
  name: String,
  url: String,
  date: Date,
});

const Track = mongoose.model("Track", trackSchema);

module.exports = Track;
