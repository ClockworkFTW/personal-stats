const axios = require("axios");

const { wasYesterday } = require("../util");
const cors = process.env.CORS_PROXY;
const base_url = "http://ws.audioscrobbler.com/2.0/";
const api_key = process.env.LASTFM_API_KEY;

const config = { headers: { Origin: "x-requested-with" } };

const getTracks = async () => {
  try {
    const method = "user.getRecentTracks";
    const user = process.env.LASTFM_USERNAME;
    const limit = 200;
    const url = `${cors}/${base_url}?method=${method}&api_key=${api_key}&user=${user}&limit=${limit}&format=json`;

    let next = true;
    let tracks = [];
    let page = 1;

    while (next) {
      let result = await axios.get(`${url}&page=${page}`, config);
      result = result.data.recenttracks.track;

      if (Array.isArray(result)) {
        tracks = [...tracks, ...result];

        result.forEach((track) => {
          if (track.date && !wasYesterday(track.date.uts * 1000)) {
            next = false;
          }
        });

        page++;
      } else {
        next = false;
      }
    }

    tracks = tracks.filter(
      (track) => track.date && wasYesterday(track.date.uts * 1000)
    );

    return tracks;
  } catch (error) {
    return null;
  }
};

module.exports = { getTracks };
