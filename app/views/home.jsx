import Redirect from "react-router-dom";
import React from "react";

import Search from "../components/search.jsx";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event, state) {
    if (state.value == "") {
      return;
    }

    this.props.history.push(`/search/artist/${state.value}`);
  }

  render() {
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

