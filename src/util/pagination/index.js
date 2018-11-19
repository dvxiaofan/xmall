/*
 * @Author: xiaofan 
 * @Date: 2018-11-19 15:24:51 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-19 16:28:35
 */

require('./index.css');
const tempPagination	 = require('./index.string');
const _mm							 = require('util/mm.js');

var Pagination = function() {
	const _this = this;

	this.defaultOption = {
		container			: null,
		pageNum				: 1,
		pageRange			:	3,
		onSelectPage	: null,
	};

	// 事件处理
	$(document).on('click', '.pg-item', function () {
		const $this = $(this);
		// active disabled 不做处理
		if($this.hasClass('active') || $this.hasClass('disabled')) return;		
		
		typeof _this.option.onSelectPage === 'function' 
			? _this.option.onSelectPage($this.data('value')) : null;
	});
};

Pagination.prototype.render = function(userOption) {
	this.option = $.extend({}, this.defaultOption, userOption);

	// 判断容器是否为合法jQuery对象
	if (!(this.option.container instanceof jQuery)) return;

	// 判断是否只有一页
	if(this.option.pages <= 1) return;

	// 渲染分页
	this.option.container.html(this.getPaginationHtml());
};

Pagination.prototype.getPaginationHtml = function () {
	//
	const htmt = '',
		option 			= this.option,
		pageArray		= [],
		start 			= option.pageNum - option.pageRange > 0 
		 ? option.pageNum - option.pageRange : 1,
		end 				= option.pageNum + option.pageRange < option.pages
		 ? option.pageNum + option.pageRange : option.pages;

	// 上一页数据
	pageArray.push({
		name			: '上一页',
		value			: option.prePage,
		disabled	: !option.hasPreviousPage,
	});

	for (let i = start; i <= end; i++) {
		pageArray.push({
			name		: i,
			value		: i,
			active	: (i === option.pageNum),
		})
	};

	// 下一页数据
	pageArray.push({
		name			: '下一页',
		value			: option.nextPage,
		disabled	: !option.hasNextPage,
	});

	html = _mm.renderHtml(tempPagination, {
		pageArray	: pageArray,
		pageNum		: option.pageNum,
		pages			: option.pages,
	});

	return html;
}

module.exports = Pagination;