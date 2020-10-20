const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const placeSchema = new mongoose.Schema({
  uid: { type: String, unique: true },
  name: String,
  lat: Number,
  lng: Number,
  address: String,
  categories: [String],
  date: Date,
});

placeSchema.plugin(uniqueValidator);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
