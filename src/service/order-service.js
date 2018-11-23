/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 14:49:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-23 17:18:03
 */


const _mm = require('util/mm.js');

const _order = {
	// 获取购物车商品列表
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
	// 获取订单列表
	getOrderList(orderInfo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/list.do'),
			data		: orderInfo,
			success	: resolve,
			error		: reject
		})
	},
	// 获取订单详情
	getOrderDetail(orderNo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/detail.do'),
			data		: {
				orderNo: orderNo
			},
			success	: resolve,
			error		: reject
		})
	},
	// 取消订单
	cancelOrder(orderNo, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/cancel.do'),
			data		: {
				orderNo: orderNo
			},
			success	: resolve,
			error		: reject
		})
	},

};


module.exports = _order;