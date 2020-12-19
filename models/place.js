const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const placeSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  time: { type: Date, required: true },
  stat: { type: String, required: true },
  name: String,
  lat: Number,
  lng: Number,
  address: String,
  categories: [String],
});

placeSchema.plugin(uniqueValidator);

const Place = mongoose.model("Place", placeSchema);

module.exports = Place;
