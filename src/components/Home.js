import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import "../App.css";
import CurrentlyReading from "./shelvs/CurrentlyReading";
import WantToRead from "./shelvs/WantToRead";
import Read from "./shelvs/Read";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {
    Books: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((Books) => {
      this.setState(() => ({
        Books,
      }));
    });
  }

  changeShelvs = async (book, val) => {
    await BooksAPI.update(book, val).then(() => {
      BooksAPI.getAll().then((Books) => {
        this.setState(() => ({
          Books,
        }));
      });
    });
  };
  render() {
    return (
      <div>
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>

        <CurrentlyReading
          Books={this.state.Books}
          changeShelvs={this.changeShelvs}
        />

        <WantToRead Books={this.state.Books} changeShelvs={this.changeShelvs} />

        <Read Books={this.state.Books} changeShelvs={this.changeShelvs} />

        <div className="open-search">
          <Link to="/search">
            <button></button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Home;
