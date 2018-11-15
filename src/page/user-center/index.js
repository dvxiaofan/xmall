/*
 * @Author: xiaofan 
 * @Date: 2018-11-15 15:26:35 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 17:39:36
 */

 
require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const navSide = require('../common/nav-side/index.js');

const _mm = require('util/mm.js');
const _user = require('service/user-service.js');
const tempIndex = require('./index.string');

const page = {
	init() {
		this.onLoad();
	},

	onLoad() {
		// 初始化左侧菜单
		navSide.init({
			name: 'user-center'
		});
		// 加载用户信息
		this.loadUserInfo();
	},
	// 加载用户信息
	loadUserInfo() {
		_user.getUserInfo(res => {
			// 渲染用户信息
			$('.panel-body').html(_mm.renderHtml(tempIndex, res));
			
		}, errMsg => {
			_mm.errorTips(errMsg);
			window.location.href = './user-login.html';
		})
	},
};

$(() => {
	page.init();
});

