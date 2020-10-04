const axios = require("axios");

const { isBetween } = require("../util");

const cors = process.env.CORS_PROXY;
const base_url = "https://api.github.com";

const config = { headers: { Origin: "x-requested-with" } };

const getCommits = async () => {
  try {
    const endpoint = "users/clockworkftw/events";
    const url = `${cors}/${base_url}/${endpoint}`;

    let next = true;
    let commits = [];
    let page = 1;

    while (next) {
      const result = await axios.get(`${url}?page=${page}`, config);

      commits = [...commits, ...result.data];

      result.data.forEach((commit) => {
        if (!isBetween(commit.created_at)) {
          next = false;
        }
      });

      page++;
    }

    commits = commits.filter((event) => isBetween(event.created_at));

    return commits;
  } catch (error) {
    return null;
  }
};

module.exports = { getCommits };
