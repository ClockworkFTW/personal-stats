const foursquare = require("../services/foursquare");

module.exports = async () => {
  const data = await foursquare.getCheckins();
  console.log(data);
};
