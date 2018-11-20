/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 12:22:16 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-20 11:53:19
 */


const _mm = require('util/mm.js');

const _product = {
	// 
	getProList(listParam, resolve, reject) {
		_mm.request({
			url			: _mm.getServerUrl('/product/list.do'),
			data		: listParam,
			success	: resolve,
			error		: reject
		})
	},
	getProductDetail(productId, resolve, reject) {
		_mm.request({
			url						: _mm.getServerUrl('/product/detail.do'),
			data					: {
				productId		: productId
			},
			success				: resolve,
			error					: reject
		})
	},
};


module.exports = _product;