/*
 * @Author: xiaofan 
 * @Date: 2018-11-20 14:49:29  
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-20 20:48:47
 */


require('./index.css');
require('../common/header/index.js');

const nav 			= require('../common/nav/index.js');
const _mm 			= require('util/mm.js');
const _cart 		= require('service/cart-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		// 加载购物车数据
		this.loadCart();
	},

	bindEvent() {
		const _this = this;

		// 商品选择与取消选择
		$(document).on('click', '.cart-select', function () {
			const $this = $(this),
				productId = $this.parents('.cart-table').data('product-id');
			// 选中
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, (res) => {
					_this.renderCart(res);
				}, (errMsg) => {
					_this.showCartErrMsg();
				});
			}
			// 取消选中
			else {
				_cart.unselectProduct(productId, (res) => {
					_this.renderCart(res);
				}, (errMsg) => {
					_this.showCartErrMsg();
				});
			}
		});

		// 商品全选与取消全选
		$(document).on('click', '.cart-select-all', function () {
			const $this = $(this);
			// 全选
			if ($this.is(':checked')) {
				_cart.selectAllProduct((res) => {
					_this.renderCart(res);
				}, (errMsg) => {
					_this.showCartErrMsg();
				});
			}
			// 取消全选
			else {
				_cart.unselectAllProduct((res) => {
					_this.renderCart(res);
				}, (errMsg) => {
					_this.showCartErrMsg();
				});
			}
		});

		// 商品数量的变化
		$(document).on('click', '.count-btn', function () {
			var $this 		= $(this),
				$pCount				= $this.siblings('.count-input'),
				currCount 		= parseInt($pCount.val()),
				type 					= $this.hasClass('plus') ? 'plus' : 'minus',
				productId			= $this.parents('.cart-table').data('product-id'),
				minCount			= 1,
				maxCount			= parseInt($pCount.data('max')),
				newCount			= 0;
			
				if(type === 'plus') {
					if(currCount >= maxCount) {
						_mm.errorTips('该商品数量已达到上限');
						return;
					}
					newCount = currCount + 1;
				} else if(type === 'minus') {
					if(currCount <= minCount) return;
					newCount = currCount - 1;
				}
				// 更新购物车商品数量
				_cart.updateCart({
					productId: productId,
					count: newCount
				}, (res) => {
					_this.renderCart(res);
				}, (errorMsg) => {
					_this.showCartErrMsg();
				});
		});

		// 删除单个商品
		$(document).on('click', '.cart-delete', function () {
			if(window.confirm('确认删除此商品吗？')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});

		// 删除选中商品
		$(document).on('click', '.delete-selected', function () {
			if(window.confirm('确认删除选中商品吗？')) {
				var productIds = [],
					$selectedItem = $('.cart-select:checked');
				// 循环查找选中的id
				for(var i = 0, iLength = $selectedItem.length; i < iLength; i ++) {
					productIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}					
				if(productIds.length) {
					_this.deleteCartProduct(productIds.join(','));
				} else {
					_mm.errorTips('您还没有选中要删除的商品');
				}
			}
		});

		// 提交购物车去订单结算
		$(document).on('click', '.btn-submit', function () {
			// 判断总价是否大于0
			if(_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				window.location.href = './order-confirm.html';
			} else {
				_mm.errorTips('请选择商品后再提交');
			}
		});
	},

	// 加载购物车信息
	loadCart() {
		const _this = this;
		$('.page-wrap').html('<div class="loading"></div>');
		
		_cart.getCatrList((res) => {
			_this.renderCart(res);
		}, (errMsg) => {
			_this.showCartErrMsg();
		})

	},
	// 渲染购物车
	renderCart(data) {
		this.filter(data);
		this.data.cartInfo = data;

		var carHtml = _mm.renderHtml(tempIndex, data);
		$('.page-wrap').html(carHtml);

		// 通知导航购物车数量更新
		nav.loadCartCount();
	},
	// 数据过滤
	filter(data) {
		data.notEmpty = !!data.cartProductVoList.length;
	},
	// 删除指定商品
	deleteCartProduct(productIds) {
		const _this = this;
		_cart.deleteProduct(productIds, (res) => {
			_this.renderCart(res);
		}, (errorMsg) => {
			_this.showCartErrMsg();
		});
	},

	
	// 显示错误信息
	showCartErrMsg() {
		$('.page-wrap').html('<p class="err-tip">很抱歉，出现了一个小问题，刷新试试吧</p>');
	},
};


$(() => {
	page.init();
});