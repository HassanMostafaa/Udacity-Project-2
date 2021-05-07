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
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 2 }}
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`,
                      }}
                      onClick={() => {
                        window.location.href = `${book.previewLink}`;
                      }}
                    ></motion.div>
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
                            &#10003; Currently Reading
                          </option>
                        ) : (
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                        )}
                        {book.shelf === "wantToRead" ? (
                          <option value="wantToRead">
                            &#10003; Want to Read
                          </option>
                        ) : (
                          <option value="wantToRead">Want to Read</option>
                        )}
                        {book.shelf === "read" ? (
                          <option value="read">&#10003; Read</option>
                        ) : (
                          <option value="read">Read</option>
                        )}
                        {book.shelf !== "currentlyReading" ||
                        book.shekf !== "read" ||
                        book.shelf !== "wantToRead" ? (
                          <option value="none" disabled>
                            None
                          </option>
                        ) : (
                          <option value="none">&#10003; None</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">
                    {book.authors.map((author, index) => (
                      <div key={index}>- {author}</div>
                    ))}
                  </div>
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
