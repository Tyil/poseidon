import React from "react";
import {Card, CardActions, CardTitle, CardText, FlatButton} from "material-ui";

class BaseCard extends React.Component {
  static defaultProps = {
    actions: [],
    subtitle: ""
  };

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

BaseCard.propTypes = {
  actions: React.PropTypes.array,
  children: React.PropTypes.node,
  subtitle: React.PropTypes.node,
  title: React.PropTypes.node
};

export default BaseCard;

