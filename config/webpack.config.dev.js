const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: path.resolve(__dirname, '../p2p/registerServer/index.ts'),
  target: "node", // node js environment
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'dev.bundle.js'
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
