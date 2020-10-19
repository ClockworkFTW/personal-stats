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

const formatSleep = (activities) => {
  const sleep = activities
    .filter((e) => e.type === "Sleep")
    .sort((a, b) => a.date - b.date);

  let arr = [[]];
  let chunk = 0;

  sleep.forEach((e, i) => {
    if (i === 0 || moment.utc(e.date).isSame(sleep[i - 1].date, "day")) {
      arr[chunk] = [...arr[chunk], e];
    } else {
      chunk++;
      arr[chunk] = [e];
    }
  });

  const result = arr.map((day) => {
    let duration = moment.duration();

    day.forEach((e) => {
      const arr = e.duration.split(":").reverse();
      arr.forEach((x, i) => {
        if (i === 0) {
          duration = duration.add(moment.duration(x, "s"));
        }
        if (i === 1) {
          duration = duration.add(moment.duration(x, "m"));
        }
        if (i === 2) {
          duration = duration.add(moment.duration(x, "h"));
        }
      });
    });

    duration = duration.asHours().toFixed(1);

    const date = new Date(moment.utc(day[0].date).startOf("day"));

    return { type: "Sleep", date, duration, value: "", unit: "hours" };
  });

  return result;
};

module.exports = { wasYesterday, formatTime, setDateLimit, formatSleep };
