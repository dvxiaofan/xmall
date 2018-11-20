/*
 * @Author: xiaofan 
 * @Date: 2018-11-20 17:32:53 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-20 17:40:35
 */


require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const _mm = require('util/mm.js');
const _cart = require('service/cart-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {
	},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		this.loadCart();
	},

	bindEvent() {
		// const _this = this;
				
	},

	// 加载购物车信息
	loadCart() {
		const _this = this;

		$('.page-wrap').html('<div class="loading"></div>')

		_cart.getCatrList((res) => {
			_this.renderCart(res);
		}, (errMsg) => {
			_this.showCartErrMsg();
		})
		
	},

	renderCart(data) {
		this.filter(data);
		this.data.cartInfo = data;

		var carHtml = _mm.renderHtml(tempIndex, data);
		$('.page-wrap').html(carHtml);
	},

	filter(data) {
		data.notEmpty = !!data.cartProductVoList.length;
	},

	showCartErrMsg() {
		$('.page-wrap').html('<p class="err-tip">很抱歉，出现了一个小问题，刷新试试吧</p>');
	}
};


$(() => {
	page.init();
});