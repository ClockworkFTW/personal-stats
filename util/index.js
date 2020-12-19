const _ = require("lodash");
const moment = require("moment");

const wasYesterday = (time) => {
  const day = moment().subtract(1, "days");
  return day.isSame(time, "day");
};

const formatDate = (time, input) => moment(time, [input]).format("YYYY-MM-DD");

const formatGoodreadsTime = (time) => {
  let fTime = time.split(" ");
  fTime = `${fTime[0]}, ${fTime[2]} ${fTime[1]} ${fTime[5]} ${fTime[3]} ${fTime[4]}`;
  return new Date(fTime);
};

const setDateLimit = (from, to) => {
  if (from && to) return { date: { $gte: from, $lte: to } };
  if (from && !to) return { date: { $gte: from } };
  if (!from && to) return { date: { $lte: to } };
  if (from === to) return { date: from };
  if (!from && !to) return {};
};

const groupByDateAndStat = (collection) => {
  const group = _.groupBy(collection, "date");
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
  formatDate,
  formatGoodreadsTime,
  setDateLimit,
  groupByDateAndStat,
  durationAsSeconds,
};
