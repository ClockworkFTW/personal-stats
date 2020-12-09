const _ = require("lodash");
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

const formatDate = (time) => moment(time).format("YYYY-MM-DD");

const setDateLimit = (from, to) => {
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

const groupByDateAndStat = (collection) => {
  const getDate = (item) => moment(item.date).format("YYYY-MM-DD");
  const group = _.groupBy(collection, getDate);

  for (const key in group) {
    if (group.hasOwnProperty(key)) {
      const dateGroup = group[key];
      group[key] = _.groupBy(dateGroup, "stat");
    }
  }

  return group;
};

const durationAsSeconds = (duration) => {
  const arr = duration.split(":").map((e) => Number(e));
  return arr.reverse().reduce((s, n, i) => {
    let multi = 1;
    switch (i) {
      case 1:
        multi = 60;
        break;
      case 2:
        multi = 3600;
        break;
      case 3:
        multi = 86400;
        break;
      default:
        break;
    }
    return multi * n + s;
  }, 0);
};

module.exports = {
  wasYesterday,
  formatTime,
  formatDate,
  setDateLimit,
  groupByDateAndStat,
  durationAsSeconds,
};
