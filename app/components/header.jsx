import React from "react";
import {AppBar} from "material-ui";

class HeaderComponent extends React.Component {
  leftButtonHandler() {
    this.props.leftFunction();
  }

  render() {
    return (
      <header>
        <AppBar
          title="Poseidon"
          onLeftIconButtonTouchTap={this.leftButtonHandler.bind(this)}
        />
      </header>
    );
  }
}

export default HeaderComponent;

