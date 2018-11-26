/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 12:06:09 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-26 18:04:21
 */

require('./index.css');
require('../common/header/index.js');
require('../common/nav/index.js');

const _mm 						= require('util/mm.js');
const _order 					= require('service/order-service.js');
const _address				= require('service/address-service.js');
const tempAddress 		= require('./address-list.string');
const tempProduct 		= require('./product-list.string');
const addressModal 		= require('./address-modal.js');

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
			if($(this).hasClass('active')) {
				$(this).removeClass('active');
				_this.data.seletedAddressId = null;
			} else {
				$(this).addClass('active').siblings('.address-item').removeClass('active');
				_this.data.seletedAddressId = $(this).data('id');
			}
		});

		// 地址添加
		$(document).on('click', '.address-add', function () {
			// 弹出添加地址模块
			addressModal.show({
				isUpdate: false,
				onSuccess: function() {
					_this.loadAddressList();
				}
			});
		});

		// 地址编辑
		$(document).on('click', '.address-update', function (e) {
			e.stopPropagation();
			
			const shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, (res) =>{
				// 弹出添加地址模块
				addressModal.show({
					isUpdate: true,
					data		: res,
					onSuccess: () => {
						_this.loadAddressList();
					}
				})
			}, (errorMsg) => {
				_mm.errorTips(errorMsg);
			});
		});

		// 地址删除
		$(document).on('click', '.address-delete', function (e) {
			e.stopPropagation();
			
			const shippingId = $(this).parents('.address-item').data('id');
			if(window.confirm('确定删除这条地址吗？')) {
				_address.deleteAddress(shippingId, () => {
					_mm.successTips('地址删除成功');
					_this.loadAddressList();
				}, (errorMsg) => {
					_mm.errorTips(errorMsg);
				})
			}
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
			$addressCon.html('<div class="loading"></div>');
		_address.getAddressList((res) => {
			_this.addressFilter(res);
			var addressHtml = _mm.renderHtml(tempAddress, res);
			$addressCon.html(addressHtml);
		}, (errorMsg) => {
			$addressCon.html('<p class="err-tip">地址列表加载失败，请刷新重试</p>');
		});
	},

	// 地址列表选中的状态处理
	addressFilter(data) {
		if(this.data.seletedAddressId) {
			var selectedAddressIdFlag = false;
			for (let i = 0, iLength = data.list.length; i < iLength; i++) {
				if(data.list[i].id === this.data.seletedAddressId) {
					data.list[i].isActive = true;
					selectedAddressIdFlag = true;
				}
			};
			// 以前选中的不存在了,将其删除
			if(!selectedAddressIdFlag) {
				this.data.seletedAddressId = null;
			}
		}
	},

	// 加载商品列表
	loadProductList() {
		const _this = this,
			$productCon = $('.product-con');
			$productCon.html('<div class="loading"></div>');
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