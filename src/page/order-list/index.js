/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 12:06:09 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-23 17:24:50
 */

require('./index.css');
require('../common/header/index.js');
require('../common/nav/index.js');

const navSide = require('../common/nav-side/index.js');
const _mm = require('util/mm.js');
const Pagination = require('util/pagination/index.js');
const _order = require('service/order-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {
		listParam: {
			pageNum: 1,
			pageSize: 10
		}
	},

	init() {
		this.onLoad();
	},

	onLoad() {
		navSide.init({
			name: 'order-list'
		});

		// 加载订单列表
		this.loadOrderList();
	},

	loadOrderList() {
		var _this = this,
			orderHtml	= '',
			$listCon 	= $('.order-list-con');
		$listCon.html('<div class="loading"></div>');
		_order.getOrderList(_this.data.listParam, (res) => {
			// 渲染订单列表
			orderHtml = _mm.renderHtml(tempIndex, res);
			$listCon.html(orderHtml);
			_this.loadPagination({
				hasPreviousPage		: res.hasPreviousPage,
				hasNextPage				: res.hasNextPage,
				prePage						: res.prePage,
				nextPage					: res.nextPage,
				pageNum						: res.pageNum,
				pages							: res.pages,
				isFirstPage				: res.isFirstPage,
				isLastPage				: res.isLastPage,
			});
		}, (errorMsg) => {
			$listCon.html('<p class="err-tip">加载订单信息失败，请刷新重试</p>');

		});
	},
	// 加载分页信息
	loadPagination(pageInfo) {
		const _this = this;
		_this.pagination ? '' : (_this.pagination = new Pagination());
		_this.pagination.render($.extend({}, pageInfo, {
			container: $('.pagination'),
			onSelectPage: (pageNum) => {
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	},

};


$(() => {
	page.init();
});