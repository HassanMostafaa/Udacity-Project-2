import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Search from "./components/Search";
import Home from "./components/Home";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    query: "",
    result: [],
  };

  changeShelvs = async (book, val) => {
    await BooksAPI.update(book, val);
    BooksAPI.getAll().then((Books) => {
      this.setState({ Books });
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
              <Search
                changeShelvs={this.changeShelvs}
                resault={this.state.result}
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default BooksApp;
