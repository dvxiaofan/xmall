/*
 * @Author: xiaofan 
 * @Date: 2018-11-13 15:06:04 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-15 23:07:18
 */


require('./index.css');
const _mm = require('util/mm.js');
const tempIndex = require('./index.string');

const navSide = {
	option: {
		name: '',
		navList: [
			{ name: 'user-center', desc: '个人中心', href: './user-center.html' },
			{ name: 'order-list', desc: '我的订单', href: './order-list.html' },
			{ name: 'user-pass-update', desc: '修改密码', href: './user-pass-update.html' },
			{ name: 'about', desc: '关于MMall', href: './about.html' },
		]
	},
	init(option) {
		// 合并选项
		$.extend(this.option, option);
		this.renderNav();
	},

	// 渲染导航菜单
	renderNav() {
		// 计算active数据
		for (let i = 0, iLength = this.option.navList.length; i < iLength; i++) {
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			};
			// 渲染数据
			const navHtml = _mm.renderHtml(tempIndex, {
				navList: this.option.navList
			});
			// HTML放入容器
			$('.nav-side').html(navHtml);
		}
	},
};


module.exports = navSide;