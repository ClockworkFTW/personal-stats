const moment = require("moment");

const isBetween = (time) => {
  const start = moment().subtract(1, "days").startOf("day");
  const end = moment().subtract(1, "days").endOf("day");
  return moment(time).local().isBetween(start, end);
};

const formatTime = (time) => {
  let fTime = time.split(" ");
  fTime = `${fTime[0]}, ${fTime[2]} ${fTime[1]} ${fTime[5]} ${fTime[3]} ${fTime[4]}`;
  return new Date(fTime);
};

module.exports = { isBetween, formatTime };
