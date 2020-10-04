const github = require("../services/github");

module.exports = async () => {
  const data = await github.getCommits();
  console.log(data);
};
