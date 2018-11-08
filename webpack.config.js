/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 11:32:11 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-11-08 15:27:45
 */


var config = {
  entry: {
    'index': ['./src/page/index/index.js'],
    'login': ['./src/page/login/index.js'],
  },
  output: {
    path: './dist',
    filename: 'js/[name].js',
  }
};

module.exports = config;