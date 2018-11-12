/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-12 15:06:00
 */

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置环境变量 dev / online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || '';

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
    path: './dist',       // 打包路径
    publicPath: '/dist',  // 访问路径
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
        test: /\.(png|gif|jpg|svg|woff|eot|ttf)\??.*$/,
        loader: 'url-loader',
        query: {
          limit: 100,
          publicPath: '../', // 解决打包后路径不对的问题
          name: 'resource/[name].[ext]'
        }
      },
    ]
  },
  resolve: {
    alias: {
      node_modules: __dirname + '/node_modules',
      util: __dirname + '/src/util',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      images: __dirname + '/src/images',
    }
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

if ('dev' === WEBPACK_ENV) {
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;