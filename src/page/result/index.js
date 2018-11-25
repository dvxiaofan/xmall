/*
 * @Author: xiaofan 
 * @Date: 2018-11-13 16:38:15 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-25 20:58:04
 */

require('./index.css');
require('../common/nav-simple/index.js');

const _mm = require('util/mm.js');

$(() => {
	const type = _mm.getUrlParam('type') || 'default',
		$element = $(`.${type}-success`);

	if (type === 'payment') {
		var orderNumver = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumver);
	}

	// 现实结果提示
	$element.show();

});