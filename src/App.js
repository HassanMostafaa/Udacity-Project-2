import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
  };

  changeShelvs = async (book, val) => {
    await BooksAPI.update(book, val).then((res) => {
      window.location.href = "/";
    });
  };

  render() {
    return (
      <div className="app">
        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>

            <Route path="/search">
              <Search changeShelvs={this.changeShelvs} />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
