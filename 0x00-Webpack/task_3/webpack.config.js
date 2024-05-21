const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  entry: {
    header: path.resolve(__dirname, "./js/header.js"),
    body: path.resolve(__dirname, "./js/body.js"),
    footer: path.resolve(__dirname, "./js/footer.js"),
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "[name].bundle.js",
  },
  devtool: "inline-source-map",
  devServer: {
    static: path.resolve(__dirname, "public"),
    port: 8564,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(gif|png|jp?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true,
              disable: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"), // Create an index.html in root with basic structure
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
};