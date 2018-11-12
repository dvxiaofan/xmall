/*
 * @Author: xiaofan 
 * @Date: 2018-11-08 15:42:22 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-12 13:55:35
 */

const _mm = require('util/mm.js');

const html = '<div>{{data}}</div>';
const data = {
	data: 'xiaofan'
};

console.log(_mm.renderHtml(html, data));
