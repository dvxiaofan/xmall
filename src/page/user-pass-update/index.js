/*
 * @Author: xiaofan 
 * @Date: 2018-11-15 23:12:43 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 23:47:40
 */
/*
 * @Author: xiaofan 
 * @Date: 2018-11-15 23:08:47 
 * @Last Modified by:   xiaofan 
 * @Last Modified time: 2018-11-15 23:08:47 
 */


require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const navSide = require('../common/nav-side/index.js');
const _mm = require('util/mm.js');
const _user = require('service/user-service.js');

const page = {
	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		navSide.init({
			name: 'user-pass-update'
		});
	},

	bindEvent() {
		const _this = this;

		$(document).on('click', '.btn-submit', () => {
			const userInfo = {
				passwordOld: $.trim($('#password-old').val()),
				passwordNew: $.trim($('#password-new').val()),
				passwordConfirm: $.trim($('#password-confirm').val()),
			};
			const validateResult = _this.formValidate(userInfo);

			if (validateResult.status) {
				// 更新用户密码
				_user.updatePass({
					passwordOld: userInfo.passwordOld,
					passwordNew: userInfo.passwordNew
				}, (res, msg) => {
					_mm.successTips(msg);
					window.location.href = './user-login.html';
				}, errorMsg => {
					_mm.errorTips(errorMsg);
				})
			} else {
				_mm.errorTips(validateResult.msg);
			}
		});
	},

	// 表单验证
	formValidate(userInfo) {
		const result = {
			status: false,
			msg: '',
		};
		if (!_mm.validate(userInfo.passwordOld, 'require')) {
			result.msg = '原密码不能为空';
			return result;
		}
		if (!userInfo.passwordNew || userInfo.passwordNew.length < 6) {
			result.msg = '新密码不能少于6位';
			return result;
		}
		if (userInfo.passwordConfirm !== userInfo.passwordNew) {
			result.msg = '两次新密码输入不一致';
			return result;
		}

		// 通过
		result.status = true;
		result.msg = '验证通过';
		return result;
	},

};

$(() => {
	page.init();
});