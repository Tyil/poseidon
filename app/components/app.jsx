import React from "react";
import { HashRouter as Router, Route, IndexRoute } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./header.jsx";

import Home from "../views/home.jsx";

export default class AppComponent extends React.Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <main>
            <Router>
              <Route path="/" component={Home} />
            </Router>
          </main>
        </div>
      </MuiThemeProvider>
    );
  }
}

