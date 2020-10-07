const axios = require("axios");
const pify = require("pify");
const { parseString } = require("xml2js");

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
    const url = `${cors}/${base_url}?method=${method}&api_key=${api_key}&user=${user}&limit=${limit}`;

    let tracks = [];

    // Fetch the last 1000 played tracks
    for (let page = 1; page <= 5; page++) {
      let result = await axios.get(`${url}&page=${page}`, config);

      // Convert XML to JSON
      result = await pify(parseString)(result.data);

      if (result.lfm.$.status === "ok") {
        // Format JSON
        result = result.lfm.recenttracks[0].track.map((track) => {
          const artist = track.artist[0]._;
          const album = track.album[0]._;
          const name = track.name[0];
          const url = track.url[0];
          const date = track.date ? new Date(track.date[0].$.uts * 1000) : null;
          return date ? { artist, album, date, name, url } : null;
        });

        // Filter out "now plaging" track if it exists
        result = result.filter((track) => track);

        // Append formatted result array to tracks array
        tracks = [...tracks, ...result];
      } else {
        return null;
      }
    }

    // Filter out tracks that were not played yesterday
    tracks = tracks.filter((track) => wasYesterday(track.date));

    return tracks;
  } catch (error) {
    return null;
  }
};

module.exports = { getTracks };
