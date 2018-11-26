/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 17:30:21 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-26 22:09:54
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
		productId: _mm.getUrlParam('productId') || '',
		disabled:	true,
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
		const _this = this;

		// 图片预览
		$(document).on('mouseenter', '.p-img-item', function () {
			var imgUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src', imgUrl);
		});

		// 加入购物车数量
		$(document).on('click', '.p-count-btn', function () {
			const type = $(this).hasClass('plus') ? 'plus' : 'minus',
				$pCount = $('.p-count'),
				currCount = parseInt($pCount.val()),
				minCount = _this.data.detailInfo.stock == 0 ? 0 : 1,
				maxCount = _this.data.detailInfo.stock;
			if(type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			} else if(type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});

		// 加入购物车事件
		$(document).on('click', '.cart-add', function () {
			_cart.addToCart({
				productId: _this.data.productId,
				count: $('.p-count').val()
			}, (res) => {
				window.location.href = './result.html?type=cart-add';
			}, (errMsg) => {
				_mm.errorTips(errMsg);
			});
		});
	},

	// 加载详情信息
	loadDetail() {
		var html = '';
		const _this = this;
		const $pageWrap = $('.page-wrap');		

		$pageWrap.html('<div class="loading"></div>')
		_product.getProductDetail(this.data.productId, (res) => {
			// 缓存detail数据
			_this.data.detailInfo = res;
			_this.filter(res);
			
			if(_this.data.detailInfo.stock === 0) {
				_this.data.disabled = false;
			}

			html = _mm.renderHtml(tempIndex, res);
			$pageWrap.html(html);
		}, (errorMsg) => {
			$pageWrap.html('<p class="err-tip">此商品没有找到</p>');
		})
	},

	filter(data) {
		data.subImages 	= data.subImages.split(',');
		data.noStock		= (data.stock == 0);
	}
	
};


$(() => {
	page.init();
});