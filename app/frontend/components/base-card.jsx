import React from "react";
import {Card, CardActions, CardTitle, CardText, FlatButton} from "material-ui";
import PropTypes from "prop-types";

class BaseCard extends React.Component {
  static defaultProps = {
    actions: [],
    subtitle: ""
  };

  static propTypes = {
    actions: PropTypes.array,
    children: PropTypes.node,
    subtitle: PropTypes.node,
    title: PropTypes.node
  }

  render() {
    let actions = "";
    let header = "";

    if (this.props.title) {
      header =
        <CardTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
        />;
    }

    if (this.props.actions.length > 0) {
      const buttons = this.props.actions.map(x => {
        return (
          <FlatButton
            key={x.label}
            label={x.label}
            onClick={x.action}
          />
        );
      });

      actions =
        <CardActions>
          {buttons}
        </CardActions>;
    }

    return (
      <div style={{margin: "8px"}}>
        <Card>
          {header}
          <CardText>
            {this.props.children}
          </CardText>
          {actions}
        </Card>
      </div>
    );
  }
}

export default BaseCard;

