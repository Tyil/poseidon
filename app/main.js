// set basic variables
const port = process.env.app_port || 3000;
const controllerDir = "./controllers/";

// require dependencies
const express = require("express");
const serveIndex = require("serve-index");

// instantiate application
const app = express();

// apply middleware
app.use(express.static(__dirname + "/../public"));

// add controllers
app.use("/api", require(controllerDir + "main"));
app.use("/api/album", require(controllerDir + "album"));
app.use("/api/artist", require(controllerDir + "artist"));

// start the application
app.listen(port, () => console.log("Poseidon's rage can be witnessed from :" + port));

