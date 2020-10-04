const lastfm = require("../services/lastfm");

module.exports = async () => {
  const data = await lastfm.getTracks();
  console.log(data);
};
