/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 15:46:27 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 23:49:52
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
		// 点击登录
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
			username: $.trim($('#username').val()),
			password: $.trim($('#password').val())
		};
		// 表单验证结果
		const validateResult = this.formValidate(formData);
		// 验证成功
		if (validateResult.status) {
			// 提交
			_user.login(formData, (res) => {
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
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
		// 通过
		result.status = true;
		result.msg		= '验证通过';
		return result;
	},
};

$(() => {
	page.init();
});