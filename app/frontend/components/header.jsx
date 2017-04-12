import React from "react";
import {AppBar} from "material-ui";
import PropTypes from "prop-types";

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

HeaderComponent.propTypes = {
  leftFunction: PropTypes.func
};

export default HeaderComponent;

