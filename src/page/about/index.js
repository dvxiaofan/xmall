/*
 * @Author: xiaofan 
 * @Date: 2018-11-25 22:44:52 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-26 21:17:41
 */

require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const navSide = require('../common/nav-side/index.js');

const page = {
	init() {
		this.onLoad();
	},

	onLoad() {
		// 初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
	},
};

$(() => {
	page.init();
});

