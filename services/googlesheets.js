const axios = require("axios");

const cors = process.env.CORS_PROXY;

const config = { headers: { Origin: "x-requested-with" } };

const getData = async (id, tab) => {
  try {
    const endpoint = `https://spreadsheets.google.com/feeds/cells/${id}/${tab}/public/full?alt=json`;
    const url = `${cors}/${endpoint}`;

    const result = await axios.get(url, config);
    const cells = result.data.feed.entry;

    // Define sheet headers
    const headers = [];

    cells.forEach((cell) => {
      if (cell.gs$cell.row === "1") {
        headers.push({ name: cell.content.$t, col: cell.gs$cell.col });
      }
    });

    // Format sheet content
    const content = [];
    const colCount = Math.max(
      ...headers.map((header) => header.col)
    ).toString();
    let row = {};

    cells.forEach((cell) => {
      if (cell.gs$cell.row !== "1") {
        const prop = headers.find((header) => header.col === cell.gs$cell.col);
        row = { [prop.name]: cell.content.$t, ...row };

        if (cell.gs$cell.col === colCount) {
          content.push(row);
          row = {};
        }
      }
    });

    return content;
  } catch (error) {
    return null;
  }
};

module.exports = { getData };
