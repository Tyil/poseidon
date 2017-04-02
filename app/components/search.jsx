import React from "react";
import {Card, CardHeader, CardText, RaisedButton, TextField} from "material-ui";

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      value: event.target.value
    });
  }

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
  submit: React.PropTypes.func,
  title: React.PropTypes.string
};

export default Search;

