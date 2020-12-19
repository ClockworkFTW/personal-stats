const hash = require("object-hash");
const moment = require("moment");

const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const googlesheets = require("../services/googlesheets");
const Todo = require("../models/todo");
const SHEETS_ID_TODOIST_PERSONAL = process.env.SHEETS_ID_TODOIST_PERSONAL;
const SHEETS_ID_TODOIST_WORK = process.env.SHEETS_ID_TODOIST_WORK;
const SHEETS_ID_TODOIST_DEV = process.env.SHEETS_ID_TODOIST_DEV;

module.exports = async () => {
  try {
    // Fetch data
    const personal = await googlesheets.getData(SHEETS_ID_TODOIST_PERSONAL, 1);
    const work = await googlesheets.getData(SHEETS_ID_TODOIST_WORK, 1);
    const dev = await googlesheets.getData(SHEETS_ID_TODOIST_DEV, 1);

    // Format data
    let todos = [...personal, ...work, ...dev];
    todos = todos.map((todo) => {
      const arr = todo.date.split(" ");
      let date = arr.slice(0, 3).join(" ");
      date = formatDate(date, "MMMM D, YYYY");
      let time = arr.slice(4)[0];
      time = moment(time, ["h:mmA"]).format("HH:mm");
      time = new Date(`${date} ${time}`);
      const obj = { ...todo, time, date };
      const uid = hash(obj);
      return { uid, ...obj, stat: "todo" };
    });

    console.log(todos);

    // Save data
    Todo.insertMany(todos, { ordered: false });

    console.log(pass("PASSED - TODOIST"));
  } catch (error) {
    console.log(fail("FAILED - TODOIST"));
  }
};
