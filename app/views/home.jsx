import {Link, Redirect} from "react-router-dom";
import React from "react";
import request from "request";

import Search from "../components/search.jsx";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectTo: null
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event, state) {
    this.setState({
      redirectTo: `/search/artist/${state.value}`
    });
  }

  render() {
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />;
    }

    return (
      <div>
        <Search
          title="Search for an artist"
          submit={this.handleSearch}
        />
      </div>
    );
  }
}

