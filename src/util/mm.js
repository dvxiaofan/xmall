/*
 * @Author: xiaofan 
 * @Date: 2018-11-09 16:47:42 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-14 12:40:57
 */

 const Hogan = require('hogan.js');

 const conf = {
	 serverHost: ''
 };

const _mm = {
	//  网络请求
	request(param) {
		const _this = this;
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success(res) {
				//  请求成功
				if (res.status === 0) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				// 没有登录的状态， 跳转登录
				else if (res.status === 10) {
					_this.doLogin();
				}
				// 请求数据错误
				else if (res.status === 1) {
					typeof param.error === 'function' && param.error(res.msg);
				}
			},
			//  错误信息
			error(error) {
				typeof param.error === 'function' && param.error(error.statusText);
			}
		});
	},
	// 获取后端服务地址
	getServerUrl(path) {
		return conf.serverHost + path;
	},
	// 获取url参数
	getUrlParam(name) {
		// 提取符合规则的参数的正则表达式
		const reg = new RegExp('(^|&)' + name + '=([^&]*)($|&)');
		// 从？后面开始匹配规则
		const result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	// 渲染HTML模板
	renderHtml(htmlTemplate, data) {
		const template = Hogan.compile(htmlTemplate);
		return template.render(data);
	},
	// 成功提示
	successTips(msg) {
		alert(msg || '操作成功');
	},
	// 错误提示
	errorTips(msg) {
		alert(msg || '貌似有个小问题呢');
	},
	// 字段验证， 校验是否为空， 手机、邮箱是否正确
	validate(value, type) {
		var value = $.trim(value);
		// 非空验证
		if (type === 'require') {
			return !!value;
		}
		// 手机号验证
		if (type === 'phone') {
			return /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(value);
		}
		// 邮箱验证
		if(type === 'email') {
			return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
		}
	},
	//  跳转登录页面
	doLogin() {
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	// 跳转主页
	goHome() {
		window.location.href = './index.html';
	},
};


module.exports = _mm;