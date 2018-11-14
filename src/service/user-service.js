/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 16:33:32 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-14 12:16:24
 */

const _mm = require('util/mm.js');

const _user = {
	// 登录
	login(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/login.do'),
			method	: 'POST',
			data		: userInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 检查登录状态
	checkLogin(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/get_user_info.do'),
			method	: 'POST',
			success	: resolve,
			error		: reject
		})
	},
	// 退出登录
	logout(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/logout.do'),
			method	: 'POST',
			success	: resolve,
			error		: reject
		})
	},
}

module.exports = _user;