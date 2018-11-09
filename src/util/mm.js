/*
 * @Author: xiaofan 
 * @Date: 2018-11-09 16:47:42 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-09 23:39:41
 */

const _mm = {
	//  网络请求
	request: function (param) {
		const _this = this;
		$.ajax({
			type: param.method || 'get',
			url: param.url || '',
			dataType: param.type || 'json',
			data: param.data || '',
			success: function (res) {
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
			error: function (error) {
				typeof param.error === 'function' && param.error(error.statusText);
			}
		});
	},
	//  强制登录页面
	doLogin() {
		window.location.href = './login.html?redirect=' + encodeURIComponent(window.location.href);
	}
};


module.exports = _mm;