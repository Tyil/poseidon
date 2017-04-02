import React from "react";
import {Card, CardHeader, CardText, RaisedButton, TextField} from "material-ui";

class Search extends React.Component {
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
  };

  handleSubmit(event) {
    this.props.submit(event, this.state);
  }

  render() {
    return (
      <div style={{margin: "8px"}}>
        <Card>
          <CardHeader
            title={this.props.title}
          />
          <CardText>
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
          </CardText>
        </Card>
      </div>
    );
  }
}

Search.propTypes = {
  default: React.PropTypes.string,
  submit: React.PropTypes.func,
  title: React.PropTypes.string
};

export default Search;

