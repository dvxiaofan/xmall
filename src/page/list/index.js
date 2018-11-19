/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 12:16:43 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-19 14:15:59
 */

require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const _mm = require('util/mm.js');
const _product = require('service/product-service.js');
const tempIndex = require('./index.string');

const page = {
	data: {
		listParam: {
			keyword			: _mm.getUrlParam('keyword') 		|| '',
			categoryId	: _mm.getUrlParam('categoryId') || '',
			orderBy			: _mm.getUrlParam('orderBy') 		|| 'default',
			pageNum			: _mm.getUrlParam('pageNum') 		|| 1,
			pageSize		: _mm.getUrlParam('pageSize')		|| 20,
		}
	},

	init() {
		this.onLoad();
		this.bindEvent();
	},

	onLoad() {
		// 加载数据
		this.loadList();
	},

	bindEvent() {},

	// 加载list数据
	loadList() {
		var _this = this,
					listHtml = '',
					listParam = this.data.listParam;
		_product.getProList(listParam, (res) => {
			listHtml = _mm.renderHtml(tempIndex, {
				list: res.list
			});
			$('.p-list-con').html(listHtml);
			_this.loadPagination(res.pageNum, res.pages);
		}, (errorMsg) => {
			_mm.errorTips(errorMsg);			
		});
	},
	// 加载分页信息
	loadPagination(pageNum, pages) {},
};



$(() => {
	page.init();
});