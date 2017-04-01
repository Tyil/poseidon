import React from "react";
import request from "request";
import memcache from "memory-cache";

import Search from "../components/search.jsx";

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(event, state) {
    const cacheKey = `mb.artist.${state.value}`;
    const cache = memcache.get(cacheKey);

    if (cache) {
      console.log(cache);
      return;
    }

    request(`https://musicbrainz.org/ws/2/artist?query=${state.value}&limit=50&fmt=json`, (error, response, body) => {
      if (error || response.statusCode != 200) {
        console.log(error);
        return;
      }

      const data = JSON.parse(body);

      // add to cache
      memcache.put(cacheKey, data, 600 * 1000);

      console.log(data);
    });
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

