const axios = require("axios");

const cors = process.env.CORS_PROXY;
const base_url = "http://ws.audioscrobbler.com/2.0/";
const api_key = process.env.LASTFM_API_KEY;

const config = { headers: { Origin: "x-requested-with" } };

const getTracks = async () => {
  try {
    const method = "user.getRecentTracks";
    const user = process.env.LASTFM_USERNAME;
    const limit = 200;
    const url = `${cors}/${base_url}?method=${method}&api_key=${api_key}&user=${user}&limit=${limit}`;

    let tracks = [];

    // Fetch the last 1000 played tracks
    for (let page = 1; page <= 5; page++) {
      let result = await axios.get(`${url}&page=${page}`, config);
      tracks = [...tracks, result.data];
    }

    return tracks;
  } catch (error) {
    return null;
  }
};

module.exports = { getTracks };
