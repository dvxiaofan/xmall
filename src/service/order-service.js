/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 14:49:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-21 16:27:12
 */


const _mm = require('util/mm.js');

const _order = {
	// 
	getProductList(resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve,
			error		: reject
		})
	},
};


module.exports = _order;