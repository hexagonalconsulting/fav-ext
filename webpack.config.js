const webpack = require('webpack');
const path = require('path');

const config = {

  entry: {
    reduxRelated: path.resolve('./src/reduxRelated/index.js'),
    content: path.resolve('./src/content/index.js'),
    popup: path.resolve('./src/popup/index.js')
  },

  output: {
    filename: '[name].js',
    path: path.resolve('dist')
  },

  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader'
      }
    ]
  }

};
module.exports = config;