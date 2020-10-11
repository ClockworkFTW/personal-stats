const moment = require("moment");

const wasYesterday = (time) => {
  const day = moment().subtract(1, "days");
  return day.isSame(time, "day");
};

const formatTime = (time) => {
  let fTime = time.split(" ");
  fTime = `${fTime[0]}, ${fTime[2]} ${fTime[1]} ${fTime[5]} ${fTime[3]} ${fTime[4]}`;
  return new Date(fTime);
};

const setDateLimit = ({ from, to }) => {
  let range = {};

  if (from && to) {
    range = { $gte: from, $lte: to };
  }
  if (from && !to) {
    range = { $gte: from };
  }
  if (!from && to) {
    range = { $lte: to };
  }
  if (from === to) {
    range = {
      $gte: moment(from).startOf("day").toDate(),
      $lte: moment(to).endOf("day").toDate(),
    };
  }
  if (!from && !to) {
    return {};
  }

  return { date: range };
};

module.exports = { wasYesterday, formatTime, setDateLimit };
