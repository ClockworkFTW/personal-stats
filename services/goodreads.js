const axios = require("axios");
const pify = require("pify");
const { parseString } = require("xml2js");

const { wasYesterday, formatTime } = require("../util");
const cors = process.env.CORS_PROXY;
const base_url = "https://www.goodreads.com";
const key = process.env.GOODREADS_KEY;
const user_id = process.env.GOODREADS_USER_ID;

const config = { headers: { Origin: "x-requested-with" } };

const getCurrentlyReading = async () => {
  try {
    const endpoint = "review/list?v=2";
    const shelf = "currently-reading";

    const url = `${cors}/${base_url}/${endpoint}&key=${key}&id=${user_id}&shelf=${shelf}`;

    const result = await axios.get(url, config);
    const data = await pify(parseString)(result.data);

    const books = data.GoodreadsResponse.reviews[0].review.map((review) => {
      const { id, authors, title, num_pages } = review.book[0];

      const book = {
        id: id[0]._,
        title: title[0],
        author: authors.map(({ author }) => author[0].name[0])[0],
        num_pages: num_pages[0],
      };

      return book;
    });

    return books;
  } catch (error) {
    return null;
  }
};

const getBookProgress = async (book_id) => {
  try {
    const endpoint = "review/show_by_user_and_book.xml?";

    const url = `${cors}/${base_url}/${endpoint}&key=${key}&user_id=${user_id}&book_id=${book_id}`;

    const result = await axios.get(url, config);
    const data = await pify(parseString)(result.data);

    const review = data.GoodreadsResponse.review[0];

    let initial = [];

    if (review.read_statuses) {
      initial = review.read_statuses[0].read_status.map((e) => {
        const curr_page = "0";
        const curr_percent = "0";
        const created_at = formatTime(e.updated_at[0]._);

        return { curr_page, curr_percent, created_at };
      });
    }

    let updates = [];

    if (review.user_statuses) {
      updates = review.user_statuses[0].user_status.map((e) => {
        const curr_page = e.page[0]._;
        const curr_percent = e.percent[0]._;
        const created_at = formatTime(e.created_at[0]._);

        return { curr_page, curr_percent, created_at };
      });
    }

    let progress = [...initial, ...updates];

    progress = progress.filter((p) => {
      const isProgress = p.curr_page || p.curr_percent;
      return isProgress && wasYesterday(p.created_at) ? true : false;
    });

    return progress.length > 0 ? progress[0] : null;
  } catch (error) {
    return null;
  }
};

module.exports = { getCurrentlyReading, getBookProgress };
