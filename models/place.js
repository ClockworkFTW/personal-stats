const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  address: String,
  categories: [String],
  date: Date,
});

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
