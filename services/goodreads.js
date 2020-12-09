const axios = require("axios");

const cors = process.env.CORS_PROXY;
const base_url = "https://www.goodreads.com";
const key = process.env.GOODREADS_KEY;
const user_id = process.env.GOODREADS_USER_ID;

const config = { headers: { Origin: "x-requested-with" } };

const getBooks = async () => {
  try {
    const endpoint = "review/list?v=2";
    const url = `${cors}/${base_url}/${endpoint}&key=${key}&id=${user_id}`;

    const result = await axios.get(url, config);
    return result.data;
  } catch (error) {
    return null;
  }
};

const getBookProgress = async (book_id) => {
  try {
    const endpoint = "review/show_by_user_and_book.xml?";

    const url = `${cors}/${base_url}/${endpoint}&key=${key}&user_id=${user_id}&book_id=${book_id}`;

    // Fetch book reviews and parse XML to JSON
    const result = await axios.get(url, config);
    return result.data;
  } catch (error) {
    return null;
  }
};

module.exports = { getBooks, getBookProgress };
