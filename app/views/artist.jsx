import React from "react";
import request from "request";
import {
  IconButton,
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui";
import SettingsIcon from "material-ui/svg-icons/action/settings";

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

    this.artistActions = [
      {
        label: "Delete",
        action: this.handleDelete.bind(this)
      }
    ];

    this.albumActions = [
      {
        label: "Collect",
        action: this.handleCollect.bind(this)
      }
    ];
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
    const url = `http://localhost:3000/api/album/${mbid}`;

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      }).then(json => {
        if (!json.ok) {
          throw new Error(json.error);
        }

        let updatedAlbums = this.state.albums;
        updatedAlbums.push(json.data);
        updatedAlbums.sort((a, b) => parseFloat(b.date) - parseFloat(a.date));

        this.setState({
          albums: updatedAlbums
        });
      }).catch(console.log.bind(console));
  }

  componentDidMount() {
    this.callApiForArtist(this.props.match.params.mbid);
  }

  handleCollect() {
    console.log("collect");
  }

  handleDelete() {
    console.log("delete");
  }

  handleSettings(mbid) {
    console.log("settings for " + mbid);
  }

  render() {
    const artist = this.state.artist.loading ? <Loader /> : (this.state.artist.error ? this.state.artist.error : this.state.artist.info);

    const artistDisambiguation = this.state.artist.info.disambiguation || "";
    const artistName = this.state.artist.info.name || "Unknown artist";
    const albums = this.state.albums.map(x => {
      return (
        <TableRow
          key={x.mbid}
        >
          <TableRowColumn>{x.title}</TableRowColumn>
          <TableRowColumn>{x.date}</TableRowColumn>
          <TableRowColumn>{x.state}</TableRowColumn>
          <TableRowColumn>
            <IconButton>
              <SettingsIcon
                onClick={this.handleSettings.bind(this, x.mbid)}
              />
            </IconButton>
          </TableRowColumn>
        </TableRow>
      );
    });

    return (
      <div>
        <BaseCard
          title={artistName}
          subtitle={artistDisambiguation}
          actions={this.artistActions}
        >
        </BaseCard>
        <BaseCard
          title="Albums"
          actions={this.albumActions}
        >
          <Table
            selectable={true}
            multiSelectable={true}
            id="albumTable"
          >
            <TableHeader
              displaySelectAll={true}
              enableSelectAll={true}
            >
              <TableRow>
                <TableHeaderColumn>Album title</TableHeaderColumn>
                <TableHeaderColumn>Release year</TableHeaderColumn>
                <TableHeaderColumn>State</TableHeaderColumn>
                <TableHeaderColumn>Details</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody>
              {albums}
            </TableBody>
          </Table>
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

