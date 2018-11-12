/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 15:40:32 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-12 17:05:04
 */

require('./index.css');
const _mm = require('util/mm.js');
const _user = require('service/user-service.js');
const _cart = require('service/cart-service.js');

// 导航
const nav = {
	// 初始化
	init() {
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		//  返回调用者
		return this;
	},
	// 事件绑定
	bindEvent() {
		//  登录点击事件
		$('.js-login').click(() => {
			_mm.doLogin();
		});
		// 注册点击事件
		$('.js-register').click(() => {
			window.location.href = './register.html';
		});
		// 退出点击事件
		$('.js-logout').click(() => {
			_user.logout(res => {
				window.location.reload();
			}, (error) => {
				_mm.errorTips(error);
			})
		})
	},
	// 加载用户信息
	loadUserInfo() {
		_user.checkLogin(res => {
			$('.user.not-login').hide().siblings('.user.login').show()
				.find('.username').text(res.username);
		}, (error) => {
			// do nothing
		})
	},
	// 加载购物车数量
	loadCartCount() {
		_cart.getCartCount(res => {
			$('.nav .cart-count').text(res || 0);
		}, error => {
			$('.nav .cart-count').text(0);
		})
	},
}

module.exports = nav.init();