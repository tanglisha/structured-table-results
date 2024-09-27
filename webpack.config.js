// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";
const isTest = process.env.NODE_ENV == "test";

const moduleExcludes = () => {
    if (isProduction) {
        return ["/node_modules/", "/__tests__/"];
    }
    return [];
};

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  mode: isProduction ? "production" : "development",
  entry: {
    module: "./src/esmodules/module.ts",
  },
  watch: isProduction ? false : true,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "esmodules/[name].js",
    clean: true,
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "module.json", to: "module.json" },
      ],
    }),
    /*new HtmlWebpackPlugin({
            template: 'index.html',
        }),*/

    new MiniCssExtractPlugin({
      // filename: '[name].css',
}),

    new RemoveEmptyScriptsPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        exclude: moduleExcludes(),
        use: ["ts-loader"],
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader", "postcss-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif|json)$/i,
        type: "asset",
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    modules: ["node_modules"],
  },
  stats: {
    children: true,
  },
  devtool: "inline-source-map",
};

// config.context = path.resolve(__dirname, 'src');

module.exports = () => {
  if (isProduction) {
    config.mode = "production";

    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());

    config.module.rules.push();
  } else if (isTest) {
    config.mode = "test";
  } else {
    config.mode = "development";
  }
  return config;
};
