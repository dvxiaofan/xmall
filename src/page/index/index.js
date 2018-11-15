/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 15:42:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 23:51:10
 */

require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/header/index.js');

const navSide = require('../common/nav-side/index.js');

const _mm = require('util/mm.js');

navSide.init({
	name: 'about'
});