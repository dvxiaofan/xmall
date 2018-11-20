/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 16:59:56 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-20 17:26:33
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
	// 获取购物车列表
	getCatrList(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/list.do'),
			success: resolve,
			error: reject
		})
	},

	// 选中
	selectProduct(productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/select.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		})
	},
	// 取消选中
	unselectProduct(productId, resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select.do'),
			data: {
				productId: productId
			},
			success: resolve,
			error: reject
		})
	},
	// 全选
	selectAllProduct(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/select_all.do'),
			success: resolve,
			error: reject
		})
	},
	// 取消全选
	unselectAllProduct(resolve, reject) {
		_mm.request({
			url: _mm.getServerUrl('/cart/un_select_all.do'),
			success: resolve,
			error: reject
		})
	},

}

module.exports = _cart;