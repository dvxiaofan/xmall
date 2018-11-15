/*
 * @Author: xiaofan 
 * @Date: 2018-11-14 16:47:59 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-17 22:59:29
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
	data: {
		username: '',
		question: '',
		answer: '',
		token: '',
	},

	init() {
		this.bindEvent();
	},

	bindEvent() {
		const _this = this;
		// 输入用户名后点击下一步
		$('#submit-username').click(()=> {
			const username = $.trim($('#username').val());
			// 输入username后去获取对应密码提示问题
			if (username) {
				_user.getQuestion(username,
					(res)=> {
						_this.data.username = username;
						_this.data.question = res;
						_this.loadStepQuedtion();
					},
					(errMsg)=> {
						formError.show(errMsg);
					})
			} else {
				formError.show('请输入正确的用户名！');
			}
		});

		// 输入密码提示答案后点击下一步
		$('#submit-question').click(()=> {
			const answer = $.trim($('#answer').val());
			if (answer) {
				_user.checkAnswer({
						username: _this.data.username,
						question: _this.data.question,
						answer: answer
					},
					(res)=> {
						_this.data.answer = answer;
						_this.data.token = res;
						_this.loadStepPassword();
					},
					(errorMsg)=> {
						formError.show(errorMsg);
					});
			} else {
				formError.show('请输入密码提示问题答案！');
			}
		});

		// 输入新密码后点击下一步
		$('#submit-password').click(()=> {
			const password = $.trim($('#password').val());
			if (password && password.length >= 6) {
				_user.resetPassword({
						username: _this.data.username,
						passwordNew: password,
						forgetToken: _this.data.token
					},
					()=> {
						window.location.href = './result.html?type=pass-reset';
					},
					(errorMsg)=> {
						formError.show(errorMsg);
					});
			} else {
				formError.show('请输入不少于6位数的新密码！');
			}
		});
	},

	// 切换显示密码提示问题
	loadStepQuedtion() {
		formError.hide();
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},

	// 切换显示输入新密码
	loadStepPassword() {
		formError.hide();
		$('.step-question').hide()
			.siblings('.step-password').show();
	},
};

$(()=> {
	page.init();
});