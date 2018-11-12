/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 16:59:56 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-12 17:05:28
 */

const _mm = require('util/mm.js');

const _cart = {
	// 获取购物车数量
	getCartCount(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success: resolve,
			error: reject
		})
	}
}

module.exports = _cart;