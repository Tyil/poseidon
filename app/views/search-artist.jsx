import React from "react";
import request from "request";
import {Card, CardText, List, ListItem} from "material-ui";

import Search from "../components/search.jsx";

class SearchArtist extends React.Component {
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
        message = response.statusCode;

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
          error: "API gave non-ok status",
          loading: false
        });

        console.error(data);

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

  handleClick(event) {
    console.log(event);
  }

  handleSearch(event, state) {
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
        <Card style={{margin: "8px"}}>
          <CardText>
            <List>
              {this.renderArtists(this.state)}
            </List>
          </CardText>
        </Card>
      </div>
    );
  }

  renderArtists(state) {
    if (state.loading) {
      return <h2>Loading</h2>;
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
          onClick={this.handleClick}
        />
      );
    });
  }
}

SearchArtist.propTypes = {
  match: React.PropTypes.object,
  "match.params": React.PropTypes.object,
  "match.params.query": React.PropTypes.object
};

export default SearchArtist;

