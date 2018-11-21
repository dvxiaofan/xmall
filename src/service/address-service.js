/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 16:09:26 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-21 16:12:57
 */



const _mm = require('util/mm.js');

const _address = {
	// 
	getAddressList(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/shipping/list.do'),
			data		: {
				pageSize: 50
			},
			success	: resolve,
			error		: reject
		})
	},
};


module.exports = _address;