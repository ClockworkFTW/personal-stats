const hash = require("object-hash");

const { pass, fail } = require("../config");
const googlesheets = require("../services/googlesheets");
const Todo = require("../models/todo");
const id_personal = process.env.TODOIST_ID_PERSONAL;
const id_work = process.env.TODOIST_ID_WORK;

module.exports = async () => {
  try {
    const personal = await googlesheets.getData(id_personal);
    const work = await googlesheets.getData(id_work);

    let todos = [...personal, ...work];

    todos = todos.map((todo) => {
      const date = new Date(todo.date.split(" ").slice(0, 3).join(" "));
      const obj = { ...todo, date };
      const uid = hash(obj);
      return { uid, ...obj };
    });

    Todo.insertMany(todos, { ordered: false });

    console.log(pass("PASSED - TODOIST"));
  } catch (error) {
    console.log(fail("FAILED - TODOIST"));
  }
};
