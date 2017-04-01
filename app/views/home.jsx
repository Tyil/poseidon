import React from "react";

import Search from "../components/search.jsx";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event, state) {
    console.log(state.value);
  }

  render() {
    return (
      <div>
        <Search
          title="Search music"
          submit={this.handleSearch}
        />
      </div>
    );
  }
}

