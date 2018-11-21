/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 14:49:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-21 22:37:28
 */


const _mm = require('util/mm.js');

const _order = {
	// 获取商品列表
	getProductList(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve,
			error		: reject
		})
	},
	// 提交订单
	createOrder(orderInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/create.do'),
			data		: orderInfo,
			success	: resolve,
			error		: reject
		})
	},
};


module.exports = _order;