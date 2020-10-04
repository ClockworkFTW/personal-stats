const googlesheets = require("../services/googlesheets");

const id = process.env.TODOIST_ID;

module.exports = async () => {
  const data = await googlesheets.getData(id);
  console.log(data);
};
