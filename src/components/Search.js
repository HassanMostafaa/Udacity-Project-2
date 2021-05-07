import React, { Component } from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

class Search extends Component {
  static propTypes = {
    changeShelvs: PropTypes.func.isRequired,
  };

  state = {
    query: "",
    Books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState(() => ({
        Books,
      }));
    });
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query,
    }));
  };
  render() {
    const searchResult = this.state.Books.filter(
      (res) =>
        res.authors[0].toLowerCase().includes(this.state.query.toLowerCase()) ||
        res.title.toLowerCase().includes(this.state.query.toLowerCase())
    );

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link to="/">
              <button className="close-search">Close</button>
            </Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                value={this.state.query}
                onChange={(e) => {
                  this.updateQuery(e.target.value);
                }}
                placeholder="Search by Title or Author..."
              />
            </div>
          </div>
          <div className="search-books-results">
            {this.state.query === "" ? (
              <div>
                <h3>We have a huge library of books for the following :</h3>
                <p>
                  Android, Art, Artificial Intelligence, Astronomy, Austen ,
                  Baseball, Basketball, Bhagat, Biography, Brief, Business ,
                  Camus, Cervantes, Christie, Classics, Comics, Cook, Cricket ,
                  Cycling, Desai, Design, Development, Digital Marketing ,
                  Drama, Drawing, Dumas, Education, Everything, Fantasy, Film ,
                  Finance, First, Fitness, Football, Future, Games, Gandhi ,
                  Homer, Horror, Hugo, Ibsen, Journey, Kafka, King, Lahiri ,
                  Larsson, Learn, Literary Fiction, Make, Manage, Marquez ,
                  Money, Mystery, Negotiate, Painting, Philosophy, Photography,
                  Poetry, Production, Programming, React, Redux , River,
                  Robotics, Rowling, Satire, Science Fiction , Shakespeare,
                  Singh, Swimming, Tale, Thrun, Time, Tolstoy , Travel,
                  Ultimate, Virtual Reality, Web Development, iOS
                </p>
                provided by Udacity's API{" "}
                <a
                  href="https://reactnd-books-api.udacity.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Here
                </a>
              </div>
            ) : (
              <ol className="books-grid">
                {searchResult.length < 1 && <div>No Results</div>}
                {searchResult.map((book) => (
                  <motion.div
                    className="book"
                    key={book.id}
                    layout
                    whileHover={{ opacity: 1 }}
                  >
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select
                          onChange={(event) => {
                            console.log(event.target.value);
                            this.props.changeShelvs(book, event.target.value);
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
                          {book.shelf === "none" ? (
                            <option value="none"> &#10003; None</option>
                          ) : (
                            <option value="none" disabled>
                              None
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {" "}
                      {book.authors.map((author, index) => (
                        <div key={index}>- {author}</div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
