import React from "react";
import {List, ListItem} from "material-ui";
import promise from "es6-promise";
import "isomorphic-fetch";
import PropTypes from "prop-types";

import BaseCard from "../components/base-card.jsx";
import Loader from "../components/loader.jsx";
import Search from "../components/search.jsx";

promise.polyfill();

class SearchArtist extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    "history.push": PropTypes.func,
    match: PropTypes.object,
    "match.params": PropTypes.object,
    "match.params.query": PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      artists: [],
      error: null,
      loading: true
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  callApi(query) {
    this.setState({
      artists: [],
      loading: true
    });

    const url = `http://localhost:3000/api/artist/search/${query}`;

    fetch(url)
      .then(response => {
        if(!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      }).then(json => {
        if (!json.ok) {
          throw new Error(json.message);
        }

        this.setState({
          artists: json.data.artists,
          loading: false
        });
      }).catch(error => {
        this.setState({
          error: "error:" + error.message,
          loading: false
        });
      });
  }

  componentDidMount() {
    this.callApi(this.props.match.params.query);
  }

  handleClick(mbid) {
    this.props.history.push(`/artist/${mbid}`);
  }

  handleSearch(event, state) {
    if (state.value == "") {
      this.setState({
        artists: []
      });

      return;
    }

    this.props.history.push(`/search/artist/${state.value}`);
    this.callApi(state.value);
  }

  render() {
    return (
      <div>
        <Search
          title="Search for an artist"
          submit={this.handleSearch}
          default={this.props.match.params.query}
        />
        <BaseCard>
          <List>
            {this.renderArtists(this.state)}
          </List>
        </BaseCard>
      </div>
    );
  }

  renderArtists(state) {
    if (state.loading) {
      return <Loader />;
    }

    if (state.error) {
      return <p>{state.error}</p>;
    }

    return state.artists.map(artist => {
      return (
        <ListItem
          key={artist.id}
          primaryText={artist.name}
          secondaryText={artist.disambiguation}
          onClick={this.handleClick.bind(this, artist.id)}
        />
      );
    });
  }
}

export default SearchArtist;

