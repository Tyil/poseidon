import React from "react";
import {Card, CardHeader, CardText} from "material-ui";

class BaseCard extends React.Component {
  render() {
    let header = "";

    if (this.props.title) {
      header = <CardHeader>
        <h2>{this.props.title}</h2>
      </CardHeader>;
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
  children: React.PropTypes.node
};

export default BaseCard;

