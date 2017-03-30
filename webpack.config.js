module.exports = {
  entry: __dirname + "/app/react.js",
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"]
        }
      }
    ]
  },
  output: {
    filename: "app.js",
    path: __dirname + "/public"
  }
};

