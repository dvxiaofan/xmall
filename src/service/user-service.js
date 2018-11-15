/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 16:33:32 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 23:27:54
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
	// 检查用户名是否存在
	checkUsername(username, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/check_valid.do'),
			method	: 'POST',
			data		: {
				type	: 'username',
				str		: username
			},
			success	: resolve,
			error		: reject
		})
	},
	// 用户注册
	register(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/register.do'),
			method	: 'POST',
			data		: userInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 获取密码提示问题
	getQuestion(username, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/forget_get_question.do'),
			method	: 'POST',
			data		: {
				username: username
			},
			success	: resolve,
			error		: reject
		})
	},
	// 检查问题答案获取token
	checkAnswer(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/forget_check_answer.do'),
			method	: 'POST',
			data		: userInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 忘记密码的重置密码
	resetPassword(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/forget_reset_password.do'),
			method	: 'POST',
			data		: userInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 获取当前登录用户的详细信息
	getUserInfo(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/get_information.do'),
			method	: 'POST',
			success	: resolve,
			error		: reject
		})
	},
	// 更新当前用户信息
	updateUserInfo(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/update_information.do'),
			method	: 'POST',
			data		: userInfo,
			success	: resolve,
			error		: reject
		})
	},

	// 更新当前用户密码
	updatePass(userInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/user/reset_password.do'),
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