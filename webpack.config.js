import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development", // Set Webpack mode to development
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/, // Process all .js files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // Transpile using Babel
          options: {
            presets: ["@babel/preset-env"], // Use the preset to transpile ES6 to ES5
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  devServer: {
    static: path.join("dist"),
    open: true,
    port: 8080,
    hot: true,
  },
};
