const path = require("path");

module.exports = {
  entry: __dirname + "/app/react.jsx",
  output: {
    path: __dirname + "/public",
    filename: "app.js"
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: path.resolve(__dirname, "app"),
        loader: "babel-loader"
      }
    ]
  }
};

