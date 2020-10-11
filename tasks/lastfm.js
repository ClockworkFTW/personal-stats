const lastfm = require("../services/lastfm");
const Track = require("../models/track");
const { pass, fail } = require("../config");

module.exports = async () => {
  try {
    const tracks = await lastfm.getTracks();
    await Track.insertMany(tracks);

    console.log(pass("PASSED - LASTFM"));
  } catch (error) {
    console.log(fail("FAILED - LASTFM"));
  }
};
