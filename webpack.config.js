/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

const mode = process.env.NODE_ENV || "production";

const notionApiToken = process.env.NOTION_API_TOKEN;


module.exports = {
  output: {
    filename: `worker.${mode}.js`,
    path: path.join(__dirname, "dist"),
  },
  target: "webworker",
  devtool: "source-map",
  mode,
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
    ],
  },
  optimization: {
    usedExports: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'NOTION_TOK': JSON.stringify(notionApiToken),
    })
  ]  
};
