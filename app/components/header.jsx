import React from "react";
import {AppBar} from "material-ui";

export default class HeaderComponent extends React.Component {
  render() {
    return (
      <header>
        <AppBar
          title="Poseidon"
        />
      </header>
    );
  }
}

