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

    this.state = {
      showMenu: true
    };

    this.styles = {
      rootLeft: {
        float: "left",
        width: "20%",
        display: "block"
      },
      rootRight: {
        float: "left",
        width: "80%",
        display: "block"
      },
      main: {
        width: "90%",
        margin: "0 auto"
      }
    };
  }

  handleMenuToggle() {
    if (this.state.showMenu) {
      // update left side
      const newLeft = Object.assign({}, this.styles.rootLeft);
      newLeft.display = "none";

      this.styles.rootLeft = newLeft;

      // update right side
      const newRight = Object.assign({}, this.styles.rootRight);
      newRight.width = "100%";

      this.styles.rootRight = newRight;

      // update state
      this.setState({
        showMenu: false
      });

      return;
    }

    // update left side
    const newLeft = Object.assign({}, this.styles.rootLeft);
    newLeft.display = "block";

    this.styles.rootLeft = newLeft;

    // update right side
    const newRight = Object.assign({}, this.styles.rootRight);
    newRight.width = "80%";

    this.styles.rootRight = newRight;

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

