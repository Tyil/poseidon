const path = require("path");

module.exports = {
  entry: __dirname + "/app/react.jsx",
  output: {
    path: __dirname + "/public",
    filename: "app.js"
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

