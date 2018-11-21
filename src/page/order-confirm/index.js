/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 12:06:09 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-21 23:48:29
 */

require('./index.css');
require('../common/header/index.js');
require('../common/nav/index.js');

const _mm 						= require('util/mm.js');
const _order 					= require('service/order-service.js');
const _address					= require('service/address-service.js');
const tempAddress 		= require('./address-list.string');
const tempProduct 		= require('./product-list.string');

const page = {
	data: {
		seletedAddressId: null
	},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		this.loadAddressList();
		this.loadProductList();
	},

	bindEvent() {
		const _this = this;

		// 地址选择
		$(document).on('click', '.address-item', function () {
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.seletedAddressId = $(this).data('id');
		});

		// 地址添加
		$(document).on('click', '.address-add', function () {
			console.log(111);
			
		});

		// 订单提交
		$(document).on('click', '.order-submit', function () {
			var shippingId = _this.data.seletedAddressId;
			
			if(shippingId) {
				_order.createOrder({
					shippingId: shippingId
				}, (res) => {
					window.location.href = `./payment.html?orderNumber=${res.orderNo}`;
				}, (errorMsg) => {
					_mm.errorTips(errorMsg);
				});
			} else {
				_mm.errorTips('请选择地址后再提交')
			}
		});
	},
	// 加载地址列表
	loadAddressList() {
		const _this = this,
			$addressCon = $('.address-con');
		_address.getAddressList((res) => {
			var addressHtml = _mm.renderHtml(tempAddress, res);
			$addressCon.html(addressHtml);
		}, (errorMsg) => {
			$addressCon.html('<p class="err-tip">地址列表加载失败，请刷新重试</p>');
		});
	},

	// 加载商品列表
	loadProductList() {
		const _this = this,
			$productCon = $('.product-con');
		_order.getProductList((res) => {
			var productHtml = _mm.renderHtml(tempProduct, res);
			$productCon.html(productHtml);
		}, (errorMsg) => {
			$productCon.html('<p class="err-tip">商品列表加载失败，请刷新重试</p>');
		});
	},
};


$(() => {
	page.init();
});