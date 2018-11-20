/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 16:59:56 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-20 12:30:14
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
	},
	// 添加到购物车
	addToCart(productInfo, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/add.do'),
			data: productInfo,
			success: resolve,
			error: reject
		})
	},
}

module.exports = _cart;