const googlesheets = require("../services/googlesheets");
const { pass, fail } = require("../config");
const { wasYesterday } = require("../util");
const Todo = require("../models/todo");
const id_personal = process.env.TODOIST_ID_PERSONAL;
const id_work = process.env.TODOIST_ID_WORK;

module.exports = async () => {
  try {
    const personal = await googlesheets.getData(id_personal);
    const work = await googlesheets.getData(id_work);

    const todos = [...personal, ...work];

    await Promise.all(
      todos.map(async (todo) => {
        const date = new Date(todo.date.split(" ").slice(0, 3).join(" "));

        if (wasYesterday(date)) {
          await Todo.create({ ...todo, date });
        }
      })
    );

    console.log(pass("PASSED - TODOIST"));
  } catch (error) {
    console.log(fail("FAILED - TODOIST"));
  }
};
