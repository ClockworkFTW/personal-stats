const axios = require("axios");
const hash = require("object-hash");

const cors = process.env.CORS_PROXY;
const base_url = "https://api.github.com";

const config = { headers: { Origin: "x-requested-with" } };

const getEvents = async () => {
  try {
    const endpoint = "users/clockworkftw/events";
    const per_page = 100;
    const url = `${cors}/${base_url}/${endpoint}?per_page=${per_page}`;

    let events = [];

    // Fetch last 300 events
    for (let i = 1; i <= 3; i++) {
      const result = await axios.get(`${url}&page=${i}`, config);
      events = [...events, ...result.data];
    }

    return events;
  } catch (error) {
    return null;
  }
};

module.exports = { getEvents };
