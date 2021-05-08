import React, { Component } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

class CurrentlyReading extends Component {
  static propTypes = {
    Books: PropTypes.array.isRequired,
    changeShelvs: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.Books.map((book) =>
              book.shelf === "currentlyReading" ? (
                <motion.div
                  className="book"
                  key={book.id}
                  whileHover={{ opacity: 1 }}
                  layout
                >
                  <div className="book-top">
                    {book.imageLinks ? (
                      <div
                        onClick={() => {
                          window.location.href = `${book.previewLink}`;
                        }}
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                        }}
                      ></div>
                    ) : (
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundPosition: "center",
                          backgroundSize: "cover",
                          backgroundImage: `url(https://www.atehno.md/theme/images/no_image.png)`,
                        }}
                      ></div>
                    )}
                    <div className="book-shelf-changer">
                      <select
                        onChange={(e) => {
                          this.props.changeShelvs(book, e.target.value);
                        }}
                        value="move"
                      >
                        <option disabled value="move">
                          Move to...
                        </option>
                        {book.shelf === "currentlyReading" ? (
                          <option value="currentlyReading">
                            ✔️ Currently Reading &nbsp;
                          </option>
                        ) : (
                          <option value="currentlyReading">
                            Currently Reading &nbsp;
                          </option>
                        )}
                        {book.shelf === "wantToRead" ? (
                          <option value="wantToRead">✔️ Want to Read</option>
                        ) : (
                          <option value="wantToRead">Want to Read</option>
                        )}
                        {book.shelf === "read" ? (
                          <option value="read">✔️ Read</option>
                        ) : (
                          <option value="read">Read</option>
                        )}
                        {book.shelf !== "currentlyReading" ||
                        book.shekf !== "read" ||
                        book.shelf !== "wantToRead" ? (
                          <option value="none">None</option>
                        ) : (
                          <option value="none">✔️ None</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  {book.authors ? (
                    <div className="book-authors">
                      {book.authors.map((author, index) => (
                        <div key={index}>- {author}</div>
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </motion.div>
              ) : (
                ""
              )
            )}
          </ol>
        </div>
      </div>
    );
  }
}

export default CurrentlyReading;
