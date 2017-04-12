import React from "react";
import {RaisedButton, TextField} from "material-ui";
import PropTypes from "prop-types";

import BaseCard from "../components/base-card.jsx";

class Search extends React.Component {
  static propTypes = {
    default: PropTypes.string,
    submit: PropTypes.func,
    title: PropTypes.string
  }

  constructor(props) {
    super(props);

    this.state = {
      value: this.props.default || ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleKey = this.handleKey.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

  handleKey(event) {
    if (event.key != "Enter") {
      return;
    }

    this.props.submit(event, this.state);
  }

  handleSubmit(event) {
    this.props.submit(event, this.state);
  }

  render() {
    return (
      <BaseCard
        title={this.props.title}
      >
        <TextField
          id="main-search"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyDown={this.handleKey}
          fullWidth={true}
        />
        <RaisedButton
          fullWidth={true}
          onTouchTap={this.handleSubmit}
        >
          Search
        </RaisedButton>
      </BaseCard>
    );
  }
}

export default Search;

