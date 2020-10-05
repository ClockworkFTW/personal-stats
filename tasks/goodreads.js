const goodreads = require("../services/goodreads");
const Book = require("../models/books");

module.exports = async () => {
  // Get books in "currently reading" shelf
  let books = await goodreads.getCurrentlyReading();

  // Add progress updates
  books = await Promise.all(
    books.map(async (book) => {
      const progress = await goodreads.getBookProgress(book.id);

      if (progress) {
        let { curr_page, curr_percent } = progress;

        // prettier-ignore
        curr_page = curr_page ? curr_page : Math.floor((curr_percent / 100) * book.num_pages).toString();
        // prettier-ignore
        curr_percent = curr_percent ? curr_percent : (curr_page / book.num_pages).toString();

        return { ...book, ...progress, curr_page, curr_percent };
      } else {
        return null;
      }
    })
  );

  // Remove books without progress updates
  books = books.filter((book) => book);

  try {
    await Book.insertMany(books);
  } catch (error) {
    console.log({ error });
  }
};
