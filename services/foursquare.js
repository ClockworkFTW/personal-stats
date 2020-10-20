const axios = require("axios");
const hash = require("object-hash");

const cors = process.env.CORS_PROXY;
const base_url = "https://api.foursquare.com/v2";
const oauth_token = process.env.FOURSQUARE_ACCESS_TOKEN;

const config = { headers: { Origin: "x-requested-with" } };

const getCheckins = async () => {
  try {
    const endpoint = "/users/self/checkins";
    const v = "20200927";
    const limit = 250;
    const url = `${cors}/${base_url}/${endpoint}?v=${v}&limit=${limit}&oauth_token=${oauth_token}`;

    const result = await axios.get(url, config);

    const checkins = result.data.response.checkins.items.map((checkin) => {
      const date = new Date(checkin.createdAt * 1000);
      let { name, location, categories } = checkin.venue;
      categories = categories.map((category) => category.name);
      const address = location.formattedAddress.join(", ");
      const { lat, lng } = location;

      const obj = { date, name, lat, lng, address, categories };
      const uid = hash(obj);

      return { uid, ...obj };
    });

    return checkins;
  } catch (error) {
    return null;
  }
};

module.exports = { getCheckins };
