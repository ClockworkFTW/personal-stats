const foursquare = require("../services/foursquare");

const { pass, fail } = require("../config");
const { wasYesterday } = require("../util");
const Place = require("../models/place");

module.exports = async () => {
  try {
    const data = await foursquare.getCheckins();

    await Promise.all(
      data.map(async (place) => {
        if (wasYesterday(place.date)) {
          await Place.create(place);
        }
      })
    );

    console.log(pass("PASSED - FOURSQUARE"));
  } catch (error) {
    console.log(fail("FAILED - FOURSQUARE"));
  }
};
