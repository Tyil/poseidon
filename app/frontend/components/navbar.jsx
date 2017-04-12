import React from "react";
import {Link} from "react-router-dom";
import {Menu, MenuItem} from "material-ui";

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.styles = {
      link: {
        display: "block",
        width: "100%",
        textDecoration: "none"
      }
    };
  }

  render() {
    return (
      <nav>
        <Menu>
          <MenuItem>
            <Link to="/" style={this.styles.link}>Home</Link>
          </MenuItem>
        </Menu>
      </nav>
    );
  }
}

export default Navbar;

