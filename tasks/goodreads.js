const hash = require("object-hash");

const goodreads = require("../services/goodreads");
const Book = require("../models/book");
const { pass, fail } = require("../config");

module.exports = async () => {
  try {
    // Get books in "currently reading" and "read" shelf
    let books = await goodreads.getBooks();

    // Add progress updates
    books = await Promise.all(
      books.map(async (book) => {
        let progress = await goodreads.getBookProgress(book.book_id);

        progress = progress.map((e) => {
          const cur_page = e.cur_page
            ? e.cur_page
            : Math.floor((e.cur_percent / 100) * book.num_pages).toString();
          const cur_percent = e.cur_percent
            ? e.cur_percent
            : (e.cur_page / book.num_pages).toString();

          const obj = { ...book, ...e, cur_page, cur_percent };
          const uid = hash(obj);

          return { uid, ...obj };
        });

        return progress;
      })
    );

    // Flatten books array and insert into DB
    books = books.flat();
    await Book.insertMany(books, { ordered: false });

    console.log(pass("PASSED - GOODREADS"));
  } catch (error) {
    console.log(fail("FAILED - GOODREADS"));
  }
};
