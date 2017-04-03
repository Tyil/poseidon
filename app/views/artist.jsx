import React from "react";
import request from "request";

import BaseCard from "../components/base-card.jsx";
import Loader from "../components/loader.jsx";

class Artist extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      artist: {
        info: {},
        loading: true,
        error: null
      },
      albums: []
    };
  }

  callApiForArtist(mbid) {
    const url = `http://localhost:3000/api/artist/${mbid}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      }).then(json => {
        if (!json.ok) {
          throw new Error(data.error);
        }

        this.setState({
          artist: {
            info: json.data,
            loading: false
          }
        });

        json.data.albums.forEach(x => this.callApiForAlbum(x));
      }).catch(console.log.bind(console));
  }

  callApiForAlbum(mbid) {
  }

  componentDidMount() {
    this.callApiForArtist(this.props.match.params.mbid);
  }

  render() {
    const artist = this.state.artist.loading ? <Loader /> : (this.state.artist.error ? this.state.artist.error : this.state.artist.info);

    const artistDisambiguation = this.state.artist.info.disambiguation || "";
    const artistName = this.state.artist.info.name || "Unknown artist";
    const albums = this.state.albums.map(x => {
      return (
        <tr
          key={x.mbid}
        >
        </tr>
      );
    });

    return (
      <div>
        <BaseCard
          title={artistName}
          subtitle={artistDisambiguation}
        >
        </BaseCard>
        <BaseCard
          title="Albums"
        >
          <table>
            <tbody>
              {albums}
            </tbody>
          </table>
        </BaseCard>
      </div>
    );
  }
}

Artist.propTypes = {
  match: React.PropTypes.object,
  "match.params": React.PropTypes.object,
  "match.params.query": React.PropTypes.object
};

export default Artist;

