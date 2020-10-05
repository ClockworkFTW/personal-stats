const googlesheets = require("../services/googlesheets");
const { pass, fail } = require("../config");
const { wasYesterday } = require("../util");
const Todo = require("../models/todo");
const id = process.env.TODOIST_ID;

module.exports = async () => {
  try {
    const data = await googlesheets.getData(id);

    await Promise.all(
      data.map(async (todo) => {
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
