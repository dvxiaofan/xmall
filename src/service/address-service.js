/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 16:09:26 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-22 23:38:23
 */



const _mm = require('util/mm.js');

const _address = {
	// 获取地址列表
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
	// 添加新地址
	saveAddress(receiverInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/shipping/add.do'),
			data		: receiverInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 删除地址
	deleteAddress(shippingId, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/shipping/del.do'),
			data		: {
				shippingId: shippingId
			},
			success	: resolve,
			error		: reject
		})
	},
	// 选中查看具体的地址
	getAddress(shippingId, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/shipping/select.do'),
			data		: {
				shippingId: shippingId
			},
			success	: resolve,
			error		: reject
		})
	},
	// 更新地址
	updateAddress(addressInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/shipping/update.do'),
			data		: addressInfo,
			success	: resolve,
			error		: reject
		})
	},
};


module.exports = _address;