const hash = require("object-hash");

const { pass, fail } = require("../config");
const { formatDate } = require("../util");
const googlesheets = require("../services/googlesheets");
const Todo = require("../models/todo");
const id_personal = process.env.TODOIST_ID_PERSONAL;
const id_work = process.env.TODOIST_ID_WORK;
const id_dev = process.env.TODOIST_ID_DEV;

module.exports = async () => {
  try {
    // Fetch data
    const personal = await googlesheets.getData(id_personal);
    const work = await googlesheets.getData(id_work);
    const dev = await googlesheets.getData(id_dev);

    // Format data
    let todos = [...personal, ...work, ...dev];
    todos = todos.map((todo) => {
      const date = formatDate(todo.date.split(" ").slice(0, 3).join(" "));
      const obj = { ...todo, date };
      const uid = hash(obj);
      return { uid, ...obj, stat: "todo" };
    });

    // Save data
    Todo.insertMany(todos, { ordered: false });

    console.log(pass("PASSED - TODOIST"));
  } catch (error) {
    console.log(fail("FAILED - TODOIST"));
  }
};
