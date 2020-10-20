const axios = require("axios");
const pify = require("pify");
const { parseString } = require("xml2js");

const { formatTime } = require("../util");
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
    const data = await pify(parseString)(result.data);

    const books = data.GoodreadsResponse.reviews[0].review.map((review) => {
      const { id, authors, title, num_pages } = review.book[0];

      const book = {
        book_id: id[0]._,
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

    // Fetch book reviews and parse XML to JSON
    const result = await axios.get(url, config);
    const data = await pify(parseString)(result.data);
    const review = data.GoodreadsResponse.review[0];

    // Extract date and apply page/percent progress based on status
    let read_statuses = [];

    if (review.read_statuses) {
      read_statuses = review.read_statuses[0].read_status.map((e) => {
        if (e.status[0] === "to-read") {
          return null;
        } else {
          let cur_page, cur_percent, date;
          if (e.status[0] === "currently-reading") {
            cur_page = "0";
            cur_percent = "0";
            date = formatTime(e.updated_at[0]._);
          } else {
            cur_percent = "100";
            date = formatTime(e.updated_at[0]._);
          }
          return { cur_page, cur_percent, date };
        }
      });
    }

    read_statuses = read_statuses.filter((e) => e);

    // Extract date, current page and percentage from user statuses
    let user_statuses = [];

    if (review.user_statuses) {
      user_statuses = review.user_statuses[0].user_status.map((e) => {
        const cur_page = e.page[0]._;
        const cur_percent = e.percent[0]._;
        const date = formatTime(e.created_at[0]._);

        return { cur_page, cur_percent, date };
      });
    }

    // Combine status arrays and return
    return [...read_statuses, ...user_statuses];
  } catch (error) {
    return null;
  }
};

module.exports = { getBooks, getBookProgress };
