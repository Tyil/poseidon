import React from "react";
import { HashRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./header.jsx";

import Home from "../views/home.jsx";
import SearchArtist from "../views/search-artist.jsx";

export default class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <main>
            <Router>
              <div>
                <Route exact path="/" component={Home} />
                <Route path="/search/artist/:query" component={SearchArtist} />
              </div>
            </Router>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

