import React from "react";
import PropTypes from "prop-types";

import Search from "../components/search.jsx";

class Home extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    "history.push": PropTypes.func
  }

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

export default Home;

