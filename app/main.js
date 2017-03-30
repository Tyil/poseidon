// set basic variables
const port = process.env.app_port || 3000;
const controllerDir = "./controllers/";

// require dependencies
const express = require("express");
const serveIndex = require("serve-index");

// instantiate application
const app = express();

// apply middleware
app.use("/", serveIndex("../public"));

// add controllers
app.use("/api", require(controllerDir + "main"));

// start the application
app.listen(port, () => console.log("Poseidon's rage can be witnessed from :" + port));

