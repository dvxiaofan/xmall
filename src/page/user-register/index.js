/*
 * @Author: xiaofan 
 * @Date: 2018-11-14 15:30:18 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 15:09:26
 */

require('./index.css');
require('../common/nav-simple/index.js');

const _mm = require('util/mm.js');
const _user = require('service/user-service.js');

const formError = {
	show(errorMsg) {
		$('.error-item').show().find('.error-msg').text(errorMsg);
	},
	hide() {
		$('.error-item').hide().find('.error-msg').text('');
	},
}

const page = {
	init() {
		this.bindEvent();
	},

	bindEvent() {
		const _this = this;
		// 验证username
		const $username = $('#username');
		$username.blur(() => { 
			const username = $.trim($username.val());
						
			// username 是否为空
			if (!username) return;
			// 异步验证用户名是否已经存在
			_user.checkUsername(username, (res) => {
				formError.hide();
			}, (errorMsg) => {
				formError.show(errorMsg);
			})
		});
		// 点击注册
		$('#submit').click(() => { 
			_this.submit();
		});
		// 点击回车
		$('.user-content').keyup((e) => {
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},

	// 表单提交
	submit() {
		const formData = {
			username	: $.trim($('#username').val()),
			password	: $.trim($('#password').val()),
			passConfirm: $.trim($('#password-confirm').val()),
			phone			: $.trim($('#phone').val()),
			email			: $.trim($('#email').val()),
			question	: $.trim($('#question').val()),
			answer		: $.trim($('#answer').val()),
		};
		// 表单验证结果
		const validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			// 提交
			_user.register(formData, (res) => {
				window.location.href = './result.html?type=register';
			}, (errMsg) => {
				formError.show(errMsg); 
			});

		// 验证失败
		} else {
			// 错误提示
			formError.show(validateResult.msg);
		}
	},

	// 表单验证
	formValidate(formData) {
		const result = {
			status: false,
			msg 	: '',
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = '用户名不能为空';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = '密码不能为空';
			return result;
		}
		if (formData.password.length < 6) {
			result.msg = '密码不能少于6位';
			return result;
		}
		if (formData.password !== formData.passConfirm) {
			result.msg = '两次密码输入不一致';
			return result;
		}

		// 验证手机号
		if(!_mm.validate(formData.phone, 'phone')) {
			result.msg = '手机号格式不正确';
			return result;
		}
		// 验证邮箱
		if(!_mm.validate(formData.email, 'email')) {
			result.msg = '邮箱格式不正确';
			return result;
		}
		// 密码提示问题
		if(!_mm.validate(formData.question, 'require')) {
			result.msg = '密码提示问题不能为空';
			return result;
		}
		// 密码提示答案
		if(!_mm.validate(formData.answer, 'require')) {
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