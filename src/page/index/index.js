/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 15:42:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-09 23:40:49
 */

const _mm = require('util/mm.js');

_mm.request({
	url: '/product/list.do?keyword=1',
	success(res) {
		console.log(res);
	},
	error(errMsg) {
		console.log('errMsg: ' + errMsg);
	}
});
