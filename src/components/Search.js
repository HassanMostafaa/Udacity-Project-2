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
    searchResult: [],
    emptyQuery: "",
  };

  updateQuery = async (query) => {
    this.setState(() => ({
      query: query,
    }));
    await BooksAPI.search(query).then((data) => {
      if (data) {
        if (!data.error) {
          this.setState(() => ({ searchResult: data, emptyQuery: "" }));
        } else {
          this.setState(() => ({
            searchResult: [],
            emptyQuery: data.error,
          }));
        }
      }
    });
  };

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState({ Books });
    });
  }

  addBook() {
    alert("Book Added");
  }
  render() {
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
            {this.state.query !== "" && <h2>{this.state.emptyQuery}</h2>}
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
                {this.state.searchResult.map((book) => (
                  <motion.div
                    className="book"
                    key={book.id}
                    layout
                    whileHover={{ opacity: 1 }}
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
                          onChange={(event) => {
                            this.props.changeShelvs(book, event.target.value);
                            this.addBook();
                          }}
                          value="move"
                        >
                          <option disabled value="move">
                            Move to...
                          </option>

                          <option value="currentlyReading">
                            {this.state.Books.map((shelfedBook) => {
                              if (shelfedBook.id === book.id) {
                                if (shelfedBook.shelf === "currentlyReading") {
                                  return "✔️ ";
                                } else {
                                  return "";
                                }
                              } else {
                                return false;
                              }
                            })}
                            Currently Reading &nbsp;
                          </option>
                          <option value="wantToRead">
                            {this.state.Books.map((shelfedBook) => {
                              if (shelfedBook.id === book.id) {
                                if (shelfedBook.shelf === "wantToRead") {
                                  return "✔️ ";
                                } else {
                                  return "";
                                }
                              } else {
                                return false;
                              }
                            })}
                            Want To Read
                          </option>
                          <option value="read">
                            {this.state.Books.map((shelfedBook) => {
                              if (shelfedBook.id === book.id) {
                                if (shelfedBook.shelf === "read") {
                                  return "✔️ ";
                                } else {
                                  return "";
                                }
                              } else {
                                return false;
                              }
                            })}
                            Read
                          </option>
                          <option value="none">None</option>
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
