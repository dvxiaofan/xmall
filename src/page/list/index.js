/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 12:16:43 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-19 16:19:42
 */

require('./index.css');
require('../common/nav/index.js');
require('../common/header/index.js');

const _mm				 	= require('util/mm.js');
const Pagination 	= require('util/pagination/index.js');
const _product	 	= require('service/product-service.js');
const tempIndex	 	= require('./index.string');

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

	bindEvent() {
		const _this = this;
		// 排序点击事件
		$('.sort-item').click( function() { 
			const $this = $(this);
			_this.data.listParam.pageNum = 1;
			
			// 点击默认排序
			if ($this.data('type') === 'default') {
				// 已经是active
				if($this.hasClass('active')) {
					return;
				} else {
					$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			// 点击价格排序 
			else if ($this.data('type') === 'price') {
				$this.addClass('active').siblings('.sort-item').removeClass('active asc desc');
				if(!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				} else {
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			// 重新加载list
			_this.loadList();

		});
	},

	// 加载list数据
	loadList() {
		var _this = this,
					listHtml = '',
					listParam = this.data.listParam,
					$pListCon = $('.p-list-con');
		
		$pListCon.html('<div class="loading"></div>');
		// 删除参数中不必要的字段
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

		_product.getProList(listParam, (res) => {
			listHtml = _mm.renderHtml(tempIndex, {
				list: res.list
			});
			$pListCon.html(listHtml);
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
			_mm.errorTips(errorMsg);			
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
				_this.loadList();
			}
		}));
	},
};


$(() => {
	page.init();
});