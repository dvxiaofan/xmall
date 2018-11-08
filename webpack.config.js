/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-08 17:03:24
 */

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');

var config = {
  entry: {
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
    'common': ['./src/page/common/index.js'],
  },
  output: {
    path: './dist',
    filename: 'js/[name].js',
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: Ex.extract('style-loader', 'css-loader'),
    }]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),
    new Ex('css/[name].css'),
  ],
};

module.exports = config;