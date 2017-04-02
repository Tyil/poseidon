import React from "react";
import request from "request";

class SearchArtist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };
  }

  componentDidMount() {
    request(`http://localhost:3000/api/artist/search/${this.props.match.params.query}`, (error, response, body) => {
      if (error || response.statusCode != 200) {
        return;
      }

      const data = JSON.parse(body);

      if (!data.ok) {
        return;
      }

      this.setState({
        artists: data.data
      });
    });
  }

  render() {
    if (this.state.artists.lenght == 0) {
      return (
        <h2>Loading</h2>
      );
    }

    return (
      <div>
        <p>Not yet implemented</p>
      </div>
    );
  }
}

SearchArtist.propTypes = {
  match: React.PropTypes.object,
  "match.params": React.PropTypes.object,
  "match.params.query": React.PropTypes.object
};

export default SearchArtist;

