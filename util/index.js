const moment = require("moment");

const wasYesterday = (time) => {
  const day = moment().subtract(2, "days").startOf("day");
  return day.isSame(time, "day");
};

const formatTime = (time) => {
  let fTime = time.split(" ");
  fTime = `${fTime[0]}, ${fTime[2]} ${fTime[1]} ${fTime[5]} ${fTime[3]} ${fTime[4]}`;
  return new Date(fTime);
};

module.exports = { wasYesterday, formatTime };
