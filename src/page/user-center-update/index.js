/*
 * @Author: xiaofan 
 * @Date: 2018-11-15 15:31:16 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 17:30:54
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
		this.bindEvent();
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
		})
	},

	bindEvent() {
		const _this = this;
		// 点击提交按钮
		$(document).on('click', '.btn-submit', () => {
			const userInfo = {
				phone: $.trim($('#phone').val()),
				email: $.trim($('#email').val()),
				question: $.trim($('#question').val()),
				answer: $.trim($('#answer').val()),
			};

			const validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				_user.updateUserInfo(userInfo, (res, msg) => {
					_mm.successTips(msg)
					window.location.href = './user-center.html';
				}, errorMsg => {
					_mm.errorTips(errorMsg);
				});
			} else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},

	// 表单验证
	validateForm(userInfo) {
		const result = {
			status: false,
			msg 	: '',
		};

		// 验证手机号
		if(!_mm.validate(userInfo.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if(!_mm.validate(userInfo.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 密码提示问题
		if(!_mm.validate(userInfo.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 密码提示答案
		if(!_mm.validate(userInfo.answer, 'require')) {
			result.msg = '密码提示答案不能为空';
			return result;
		}
		
		// 通过
		result.status = true;
		result.msg		= '验证通过';
		return result;
	},
};


$(() => {
	page.init();
});

