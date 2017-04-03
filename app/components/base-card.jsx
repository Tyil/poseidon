import React from "react";
import {Card, CardTitle, CardText} from "material-ui";

class BaseCard extends React.Component {
  static defaultProps = {
      subtitle: ""
  };

  render() {
    let header = "";

    if (this.props.title) {
      header =
        <CardTitle
          title={this.props.title}
          subtitle={this.props.subtitle}
        />;
    }

    return (
      <div style={{margin: "8px"}}>
        <Card>
          {header}
          <CardText>
            {this.props.children}
          </CardText>
        </Card>
      </div>
    );
  }
}

BaseCard.propTypes = {
  title: React.PropTypes.node,
  subtitle: React.PropTypes.node,
  children: React.PropTypes.node
};

export default BaseCard;

