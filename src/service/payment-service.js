/*
 * @Author: xiaofan 
 * @Date: 2018-11-25 20:35:01 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-25 20:48:56
 */



const _mm = require('util/mm.js');

const _payment = {
	
	// 获取支付信息
	getPaymentInfo(orderNumber, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/pay.do'),
			data		: {
				orderNo: orderNumber
			},
			success	: resolve,
			error		: reject
		})
	},
	
	// 获取订单状态
	getPaymentStatus(orderNumber, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/query_order_pay_status.do'),
			data		: {
				orderNo: orderNumber
			},
			success	: resolve,
			error		: reject
		})
	},

};


module.exports = _payment;