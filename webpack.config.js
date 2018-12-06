/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-12-06 17:02:00
 */

var webpack = require('webpack');
var Ex = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 配置环境变量 dev / online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取HTML的webpack参数
var getHtmlWebpackPlugin = (name, title) => {
  return {
    template: './src/view/' + name + '.html',
    filename: 'view/' + name + '.html',
    favicon: './favicon.ico',
    inject: true,
    title: title,
    hash: true,
    chunks: ['common', name]
  };
};

var config = {
  mode: 'dev' === WEBPACK_ENV ? 'development' : 'production',
  entry: {
    'index': './src/page/index/index.js',
    'list': './src/page/list/index.js',
    'detail': './src/page/detail/index.js',
    'cart': './src/page/cart/index.js',
    'order-confirm': './src/page/order-confirm/index.js',
    'order-list': './src/page/order-list/index.js',
    'order-detail': './src/page/order-detail/index.js',
    'payment': './src/page/payment/index.js',
    'user-login': './src/page/user-login/index.js',
    'user-register': './src/page/user-register/index.js',
    'user-pass-reset': './src/page/user-pass-reset/index.js',
    'user-pass-update': './src/page/user-pass-update/index.js',
    'user-center': './src/page/user-center/index.js',
    'user-center-update': './src/page/user-center-update/index.js',
    'common': './src/page/common/index.js',
    'result': './src/page/result/index.js',
    'about': './src/page/about/index.js',
  },
  output: {
    publicPath: 'dev' === WEBPACK_ENV ? '/dist/' : '//s.webxiaofan.com/xmall-fe/dist/', // 访问路径
    filename: 'js/[name].js',
  },
  externals: {
    'jquery': 'window.jQuery'
  },
  module: {
    rules: [{
        test: /\.css$/,
        use: Ex.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.string$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttrivuteQuotes: false
          }
        }
      },
      // 图片配置
      {
        test: /\.(png|gif|jpg)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048,
            name: 'resource/[name].[ext]'
          }
        }]
      },
      // 字体图标配置
      {
        test: /\.(svg|woff|woff2|eot|ttf)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            name: 'resource/[name].[ext]'
          }
        }]
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
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      cacheGroups: {
        common: {
          name: 'common',
          chunks: 'all',
          minChunks: 2
        }
      }
    }
  },

  plugins: [
    // 单独打包处理css
    new Ex('css/[name].css'),
    // html处理
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('index', '首页')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-login', '用户登录')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-register', '用户注册')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-pass-reset', '找回密码')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-pass-update', '修改密码')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('result', '操作结果')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('list', '商品列表')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('detail', '商品详情')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('order-list', '订单中心')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('order-confirm', '订单确认')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('order-detail', '订单详情')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('payment', '订单支付')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-center', '个人中心')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('user-center-update', '修改资料')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('about', '关于XMall')),
    new HtmlWebpackPlugin(getHtmlWebpackPlugin('cart', '购物车')),
  ],

  devServer: {
    port: 8088,
    inline: true,
    proxy: {
      '**/*.do': {
        target: 'http://test.happymmall.com',
        changeOrigin: true
      }
    }
  }
};


module.exports = config;