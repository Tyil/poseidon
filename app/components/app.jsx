import React from "react";
import {HashRouter as Router, Route} from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import Header from "./header.jsx";
import Navbar from "./navbar.jsx";

import Home from "../views/home.jsx";
import SearchArtist from "../views/search-artist.jsx";

export default class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    // set initial state
    if (typeof(localStorage.navbarHidden) == "undefined") {
      localStorage.navbarHidden = JSON.stringify(false);
    }

    this.state = {
      showMenu: !JSON.parse(localStorage.navbarHidden)
    };

    this.styles = {
      main: {
        width: "90%",
        margin: "0 auto"
      }
    };

    if (this.state.showMenu) {
      this.styles.rootLeft = this.getStyleLeftVisible();
      this.styles.rootRight = this.getStyleRightVisible();
    } else {
      this.styles.rootLeft = this.getStyleLeftHidden();
      this.styles.rootRight = this.getStyleRightHidden();
    }
  }

  getStyleLeftHidden() {
    return {
      display: "none"
    };
  }

  getStyleLeftVisible() {
    return {
      float: "left",
      width: "20%",
      display: "block"
    };
  }

  getStyleRightHidden() {
    return {
      width: "100%"
    }
  }

  getStyleRightVisible() {
    return {
      float: "left",
      width: "80%"
    };
  };

  handleMenuToggle() {
    if (this.state.showMenu) {
      this.styles.rootLeft = this.getStyleLeftHidden();
      this.styles.rootRight = this.getStyleRightHidden();

      // save preference
      localStorage.navbarHidden = JSON.stringify(true);

      // update state
      this.setState({
        showMenu: false
      });

      return;
    }

    this.styles.rootLeft = this.getStyleLeftVisible();
    this.styles.rootRight = this.getStyleRightVisible();

    // save preference
    localStorage.navbarHidden = JSON.stringify(false);

    // update state
    this.setState({
      showMenu: true
    });
  }

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div id="root">
            <Header
              leftFunction={this.handleMenuToggle.bind(this)}
            />
            <div id="root-left" style={this.styles.rootLeft}>
              <Navbar />
            </div>
            <div id="root-right" style={this.styles.rootRight}>
              <main style={this.styles.main}>
                <div>
                  <Route exact path="/" component={Home} />
                  <Route path="/search/artist/:query" component={SearchArtist} />
                </div>
              </main>
            </div>
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

