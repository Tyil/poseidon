import React from "react";
import Router from "react-router";
import { DefaultRoute, Link, Route, RouteHandler } from "react-router";

let App = React.createClass({  
  render() {
    return (
      <div className="nav">
        <Link to="app">Home</Link>
        <RouteHandler/>
      </div>
    );
  }
});

let routes = (  
  <Route name="app" path="/" handler={App}>
  </Route>
);

Router.run(routes, Handler => {  
  React.render(<Handler/>, document.body);
});

