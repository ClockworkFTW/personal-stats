const hash = require("object-hash");
const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const foursquare = require("../services/foursquare");
const Place = require("../models/place");

module.exports = async () => {
  try {
    // Fetch data
    let checkins = await foursquare.getCheckins();

    // Format data
    checkins = checkins.map((checkin) => {
      let { name, location, categories } = checkin.venue;
      categories = categories.map((category) => category.name);
      const address = location.formattedAddress.join(", ");
      const { lat, lng } = location;
      const date = formatDate(checkin.createdAt * 1000);
      const obj = { date, name, lat, lng, address, categories, stat: "place" };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    // Save data
    await Place.insertMany(checkins, { ordered: false });

    console.log(pass("PASSED - FOURSQUARE"));
  } catch (error) {
    console.log(error);
    console.log(fail("FAILED - FOURSQUARE"));
  }
};
