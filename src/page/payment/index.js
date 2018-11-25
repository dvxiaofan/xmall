/*
 * @Author: xiaofan 
 * @Date: 2018-11-23 23:55:27 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-25 21:05:50
 */


require('./index.css');
require('../common/header/index.js');
require('../common/nav/index.js');

const navSide = require('../common/nav-side/index.js');
const _mm = require('util/mm.js');
const _payment = require('service/payment-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {
		orderNumber: _mm.getUrlParam('orderNumber')
	},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		// 加载订单列表
		this.loadPaymentInfo();
	},

	loadPaymentInfo() {
		var _this = this,
			paymentHtml = '',
			$pageWrap = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(this.data.orderNumber, (res) => {
			// 渲染订单列表
			paymentHtml = _mm.renderHtml(tempIndex, res);
			$pageWrap.html(paymentHtml);
			_this.listerOrderStatus();
			
		}, (errorMsg) => {
			$pageWrap.html('<p class="err-tip">' + errorMsg + '</p>');

		});
	},
	// 监听订单状态
	listerOrderStatus() {
		const _this = this;
		this.paymentTimer = window.setInterval(() => {
			_payment.getPaymentStatus(_this.data.orderNumber, (res) => {
				if(res === true) {
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			}, (errorMsg) => {});
		}, 5e3);
	},

	bindEvent() {
		const _this = this;
		
	},
};


$(() => {
	page.init();
});