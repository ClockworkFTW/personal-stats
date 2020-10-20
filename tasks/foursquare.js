const { pass, fail } = require("../config");
const foursquare = require("../services/foursquare");
const Place = require("../models/place");

module.exports = async () => {
  try {
    const checkins = await foursquare.getCheckins();
    await Place.insertMany(checkins, { ordered: false });

    console.log(pass("PASSED - FOURSQUARE"));
  } catch (error) {
    console.log(error);
    console.log(fail("FAILED - FOURSQUARE"));
  }
};
