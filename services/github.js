const axios = require("axios");
const hash = require("object-hash");

const cors = process.env.CORS_PROXY;
const base_url = "https://api.github.com";
const client_id = process.env.GITHUB_CLIENT_ID;
const client_secret = process.env.GITHUB_CLIENT_SECRET;

const config = { headers: { Origin: "x-requested-with" } };

const getEvents = async () => {
  try {
    const endpoint = "users/clockworkftw/events";
    const per_page = 100;
    const url = `${cors}/${base_url}/${endpoint}?per_page=${per_page}`;

    let events = [];

    // Fetch last 500 events
    for (let i = 1; i <= 3; i++) {
      const result = await axios.get(`${url}&page=${i}`, config);
      events = [...events, ...result.data];
    }

    // Format events
    events = events.map((event) => {
      const { type } = event;
      const repo = event.repo.name.split("/")[1];
      const date = new Date(event.created_at);
      const obj = { type, repo, date };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    return events;
  } catch (error) {
    return null;
  }
};

module.exports = { getEvents };
