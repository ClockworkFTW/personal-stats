const axios = require("axios");

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
    return result.data.response.checkins.items;
  } catch (error) {
    return null;
  }
};

module.exports = { getCheckins };
