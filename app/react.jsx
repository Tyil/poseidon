import React from "react";
import { render } from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";

import AppComponent from "./components/app.jsx";

injectTapEventPlugin();

render(
  <AppComponent />,
  document.getElementById("react-wrapper")
);

