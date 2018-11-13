/*
 * @Author: xiaofan 
 * @Date: 2018-11-13 16:38:15 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-13 17:23:05
 */

require('./index.css');
require('../common/nav-simple/index.js');

const _mm = require('util/mm.js');

$(() => {
	const type = _mm.getUrlParam('type') || 'default';
	const $element = $(`.${type}-success`);

	// 现实结果提示
	$element.show();
	
});