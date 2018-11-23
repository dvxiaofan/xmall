/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 12:06:09 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-23 23:48:40
 */

require('./index.css');
require('../common/header/index.js');
require('../common/nav/index.js');

const navSide = require('../common/nav-side/index.js');
const _mm = require('util/mm.js');
const _order = require('service/order-service.js');
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
		// 初始化侧栏
		navSide.init({
			name: 'order-list'
		});

		// 加载订单列表
		this.loadOrdeDetail();
	},

	loadOrdeDetail() {
		var _this = this,
			orderHtml	= '',
			$content 	= $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(this.data.orderNumber, (res) => {
			_this.dataFilter(res);
			// 渲染订单列表
			orderHtml = _mm.renderHtml(tempIndex, res);
			$content.html(orderHtml);
			
		}, (errorMsg) => {
			$content.html('<p class="err-tip">'+ errorMsg +'</p>');

		});
	},
	// 数据适配
	dataFilter(data) {
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
	},

	bindEvent() {
		const _this = this;
		$(document).on('click', '.order-cancel', function () {
			if(window.confirm('确定要取消该订单吗?')) {
				_order.cancelOrder(_this.data.orderNumber, () => {
					_mm.successTips('该订单取消成功');
					_this.loadOrdeDetail();
				}, (errorMsg) => {
					_mm.errorTips(errorMsg);
				});
			}
		});
	},
};


$(() => {
	page.init();
});