const pify = require("pify");
const { parseString } = require("xml2js");
const hash = require("object-hash");
const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const lastfm = require("../services/lastfm");
const Track = require("../models/track");

module.exports = async () => {
  try {
    // Fetch data
    let tracks = await lastfm.getTracks();

    // Format data
    tracks = await Promise.all(
      tracks.map(async (track) => {
        let result = await pify(parseString)(track);

        if (result.lfm.$.status === "ok") {
          result = result.lfm.recenttracks[0].track.map((track) => {
            if (track.date) {
              const time = new Date(track.date[0].$.uts * 1000);
              const date = formatDate(time);
              const artist = track.artist[0]._;
              const album = track.album[0]._;
              const name = track.name[0];
              const url = track.url[0];
              const obj = { date, time, artist, album, name, url };
              const uid = hash(obj);
              return { uid, ...obj, stat: "track" };
            } else {
              return null;
            }
          });

          return result.filter((track) => track);
        } else {
          return null;
        }
      })
    );

    // Save data
    await Track.insertMany(tracks.flat(), { ordered: false });

    console.log(pass("PASSED - LASTFM"));
  } catch (error) {
    console.log(fail("FAILED - LASTFM"));
  }
};
