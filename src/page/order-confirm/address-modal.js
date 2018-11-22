/*
 * @Author: xiaofan 
 * @Date: 2018-11-21 12:16:39 
 * @Last Modified by: xiaofan
 * @Last Modified time: 2018-11-22 23:49:43
 */


const _mm = require('util/mm.js');
const _cities = require('util/cities/index.js');
const _address = require('service/address-service.js');
const tempAddressModal = require('./address-modal.string');

const addressModal = {
	show(option) {
		// option 绑定
		this.option = option;
		this.option.data = option.data || {};
		this.$modalWrap = $('.modal-wrap');
		// 渲染页面
		this.loadModal();

		this.bindEvent();
	},

	loadModal() {
		const modalHtml = _mm.renderHtml(tempAddressModal, {
			isUpdate: this.option.isUpdate,
			data: this.option.data
		});
		this.$modalWrap.html(modalHtml);

		// 加载城市信息
		this.loadProvince();
	},

	// 加载省份信息
	loadProvince() {
		const provinces = _cities.getProvinces() || [],
			$provSelect = this.$modalWrap.find('#receiver-province');
		$provSelect.html(this.getSelectOption(provinces));
		// 更新地址的时候有省份需要回填数据
		if (this.option.isUpdate && this.option.data.receiverProvince) {
			$provSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	// 获取select框内的选项
	getSelectOption(optionArray) {
		var html = '<option value="">请选择</option>';
		for (let i = 0, iLength = optionArray.length; i < iLength; i++) {
			html += '<option value="' + optionArray[i] + '">' + optionArray[i] + '</option>';
		}
		return html;
	},
	// 加载城市信息
	loadCities(provinceName) {
		var cities = _cities.getCities(provinceName) || [],
			$citySelect = this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities));

		// 更新地址的时候有城市需要回填数据
		if (this.option.isUpdate && this.option.data.receiverCity) {
			$citySelect.val(this.option.data.receiverCity);
		}
	},

	bindEvent() {
		var _this = this;

		// 省份和城市的二级联动
		this.$modalWrap.find('#receiver-province').change(function () {
			var selectProvince = $(this).val();
			_this.loadCities(selectProvince);
		});

		// 点击X或者点击蒙版区域关闭添加窗口
		this.$modalWrap.find('.close').click(() => {
			_this.hide();
		})
		// 阻止事件冒泡
		// this.$modalWrap.find('.modal-container').click((e) => {
		// 	e.stopPropagation();
		// })

		// 保存地址事件
		$(document).on('click', '.address-btn', function () {
			var receiverInfo = _this.getReceiverInfo(),
				isUpdate = _this.option.isUpdate;

			// 新地址验证通过
			if (!isUpdate && receiverInfo.status) {
				_address.saveAddress(receiverInfo.data, (res) => {
					_mm.successTips('地址添加成功');
					_this.hide();

					typeof _this.option.onSuccess === 'function' &&
						_this.option.onSuccess(res);
				}, (errMsg) => {
					_mm.errorTips(errMsg);
				});
			}
			// 更新地址
			else if (isUpdate && receiverInfo.status) {
				_address.updateAddress(receiverInfo.data, (res) => {
					_mm.successTips('地址修改成功');
					_this.hide();

					typeof _this.option.onSuccess === 'function' &&
						_this.option.onSuccess(res);
				}, (errMsg) => {
					_mm.errorTips(errMsg);
				});
			} else {
				_mm.errorTips(receiverInfo.errMsg || '好像出了点问题~~');
			}

		});
	},
	// 获取表单信息并且验证
	getReceiverInfo() {
		var receiverInfo = {},
			result = {
				status: false
			};
		receiverInfo.receiverName = $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince = this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity = this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverAddress = $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverPhone = $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverZip = $.trim(this.$modalWrap.find('#receiver-zip').val());

		if (this.option.isUpdate) {
			receiverInfo.id = this.$modalWrap.find('#receiver-id').val();
		};

		// 表单验证
		if (!receiverInfo.receiverName) {
			result.errMsg = '请输入收件人姓名'
		} else if (!receiverInfo.receiverProvince) {
			result.errMsg = '请选择收件人省份'
		} else if (!receiverInfo.receiverCity) {
			result.errMsg = '请选择收件人城市'
		} else if (!receiverInfo.receiverAddress) {
			result.errMsg = '请输入详细收件地址'
		} else if (!receiverInfo.receiverPhone || !_mm.validate(receiverInfo.receiverPhone, 'phone')) {
			result.errMsg = '请输入正确的手机号'
		} else {
			result.status = true;
			result.data = receiverInfo;
		}
		return result;
	},

	hide() {
		this.$modalWrap.empty();
	},

};


module.exports = addressModal;