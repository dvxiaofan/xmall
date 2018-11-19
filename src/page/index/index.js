/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 15:42:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-19 12:10:45
 */

require('./index.css');
require('../common/nav-simple/index.js');
require('../common/nav/index.js');
require('../common/header/index.js');
require('util/slider/index.js');

const navSide = require('../common/nav-side/index.js');
const temBanner = require('./banner.string');
const _mm = require('util/mm.js');


$(function () {
	const bnnerHtml = _mm.renderHtml(temBanner);
	$('.banner-con').html(bnnerHtml);

	// 初始化unslider
	const $unslider = $('.banner').unslider({
		dots: true,
	});

	$('.banner-con .banner-arrow').click(function() {
		var fd = $(this).hasClass('prev') ? 'prev' :'next';
		$unslider.data('unslider')[fd]();
	});
});
