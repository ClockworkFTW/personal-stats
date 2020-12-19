const hash = require("object-hash");
const pify = require("pify");
const { parseString } = require("xml2js");

const { pass, fail } = require("../config");
const { formatGoodreadsTime, formatDate } = require("../util");
const goodreads = require("../services/goodreads");
const Book = require("../models/book");

module.exports = async () => {
  try {
    // Fetch data
    let books = await goodreads.getBooks();

    // Format data
    books = await pify(parseString)(books);
    books = await Promise.all(
      books.GoodreadsResponse.reviews[0].review.map(async (review) => {
        const { id, authors, title, num_pages } = review.book[0];

        // Extract book details
        const book = {
          book_id: id[0]._,
          title: title[0],
          author: authors.map(({ author }) => author[0].name[0])[0],
          num_pages: num_pages[0],
        };

        // Fetch book progress
        let progress = await goodreads.getBookProgress(book.book_id);
        progress = await pify(parseString)(progress);
        progress = progress.GoodreadsResponse.review[0];

        // Extract date and apply page/percent progress based on status
        let read_statuses = [];

        if (progress.read_statuses) {
          read_statuses = progress.read_statuses[0].read_status.map((e) => {
            if (e.status[0] === "to-read") {
              return null;
            } else {
              let cur_page, cur_percent, time;
              if (e.status[0] === "currently-reading") {
                cur_page = "0";
                cur_percent = "0";
                time = formatGoodreadsTime(e.updated_at[0]._);
              } else {
                cur_percent = "100";
                time = formatGoodreadsTime(e.updated_at[0]._);
              }
              return { cur_page, cur_percent, time };
            }
          });
        }

        read_statuses = read_statuses.filter((e) => e);

        // Extract date, current page and percentage from user statuses
        let user_statuses = [];

        if (progress.user_statuses) {
          user_statuses = progress.user_statuses[0].user_status.map((e) => {
            const cur_page = e.page[0]._;
            const cur_percent = e.percent[0]._;
            const time = formatGoodreadsTime(e.created_at[0]._);

            return { cur_page, cur_percent, time };
          });
        }

        return [...read_statuses, ...user_statuses].map((e) => {
          const cur_page = e.cur_page
            ? e.cur_page
            : Math.floor((e.cur_percent / 100) * book.num_pages).toString();
          const cur_percent = e.cur_percent
            ? e.cur_percent
            : (e.cur_page / book.num_pages).toString();

          const obj = {
            ...book,
            ...e,
            cur_page,
            cur_percent,
            date: formatDate(e.time),
            stat: "book",
          };
          const uid = hash(obj);

          return { uid, ...obj };
        });
      })
    );

    // Save data
    await Book.insertMany(books.flat(), { ordered: false });

    console.log(pass("PASSED - GOODREADS"));
  } catch (error) {
    console.log(fail("FAILED - GOODREADS"));
  }
};
