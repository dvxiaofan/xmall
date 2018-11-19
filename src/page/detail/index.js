/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 17:30:21 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-19 22:31:51
 */


require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const _mm = require('util/mm.js');
const _product = require('service/product-service.js');
const _cart = require('service/cart-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {
		productId: _mm.getUrlParam('productId') || ''
	},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		// 判断
		if(!this.data.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},

	bindEvent() {
		
	},

	// 加载详情信息
	loadDetail() {
		
	},
	
};


$(() => {
	page.init();
});