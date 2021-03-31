const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development', //prodiction,
  devtool: 'eval', //hidden-source-map
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },

  entry: {
    app: './client',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
};
