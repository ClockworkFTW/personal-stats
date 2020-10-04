const mfp = require("mfp");
const pify = require("pify");

const username = process.env.MFP_USERNAME;

module.exports = async (date) => {
  try {
    const data = await pify(mfp.fetchSingleDate)(username, date, "all");
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
