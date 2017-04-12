import React from "react";
import request from "request";
import {List, ListItem} from "material-ui";
import PropTypes from "prop-types";

import BaseCard from "../components/base-card.jsx";
import Loader from "../components/loader.jsx";
import Search from "../components/search.jsx";

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

    request(url, (error, response, body) => {
      if (error || response.statusCode != 200) {
        let message = response.statusCode;

        if (error) {
          message += ": " + error;
        }

        this.setState({
          error: message,
          loading: false
        });

        return;
      }

      const data = JSON.parse(body);

      if (!data.ok) {
        this.setState({
          error: "API gave non-ok status: " + data.message,
          loading: false
        });

        return;
      }

      this.setState({
        artists: data.data.artists,
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

