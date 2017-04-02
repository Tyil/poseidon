import React from "react";
import {CircularProgress} from "material-ui";

class Loader extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      progress: {
        display: "block",
        margin: "0 auto"
      }
    };
  }
  render() {
    return (
      <div>
        <CircularProgress
          style={this.styles.progress}
        />
      </div>
    );
  }
}

export default Loader;

