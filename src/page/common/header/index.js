/*
 * @Author: xiaofan 
 * @Date: 2018-11-12 17:28:52 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-13 11:31:14
 */

require('./index.css');

const _mm = require('util/mm.js');

//  通用页面头部
const header = {
	init() {
		this.bindEvent();
	},
	onLoad() {
		// input 数据回填
		const keyword = _mm.getUrlParam('keyword');
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent() {
		const _this = this;
		// 点击搜索按钮后数据提交
		$('#search-btn').click(() => { 
			_this.searchSubmit();
		});
		// 点击回车后数据提交
		$('#search-input').keyup((e) => { 
			// 13 为 回车键的keycode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	// 搜索提交
	searchSubmit() {
		const keyword = $.trim($('#search-input').val());
		if (keyword) {
			window.location.href = `./list.html?keyword=${keyword}`;
		} else {
			_mm.goHome();
		}
	},
}


header.init();