/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-08 18:01:20
 */

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 或许HTML的webpack参数
var getHtmlWebpackPlugin = function (name) {
  return {
    template: './src/view/'+ name +'.html',
    filename: 'view/'+ name +'.html',
    inject: true,
    hash: true,
    chunks: ['common', name]
  };
};

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
      // CSSloader
      test: /\.css$/,
      loader: Ex.extract('style-loader', 'css-loader') 
    },
    {
      // image loader
      test: /\.(png|gif|jpg)\??.*$/,
      loader: 'url-loader'
    }
  ]
  },
  plugins: [
    // 独立通用模块到js/base.js
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js',
    }),
    // 单独打包处理css
    new Ex('css/[name].css'),
    // html处理
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('index')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('login')),
  ],
};

module.exports = config;