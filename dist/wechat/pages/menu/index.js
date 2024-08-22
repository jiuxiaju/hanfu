"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/menu/index"],{

/***/ "./pages/menu/index.ts":
/*!*****************************!*\
  !*** ./pages/menu/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _assets_area__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../assets/area */ "./assets/area.ts");



(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    properties: {
        currentTab: {
            type: Number,
            value: 0,
        },
        menuData: {
            type: Array,
            value: []
        }
    },
    data: {
        actypeList: [],
        sourceOptions: [
            {
                value: '淘宝',
                label: '淘宝',
            },
            {
                value: '拼多多',
                label: '拼多多',
            },
        ],
        statusList: [
            {
                value: '',
                label: '所有状态',
            },
            {
                value: '未开始',
                label: '未开始',
            },
            {
                value: '进行中',
                label: '进行中',
            },
            {
                value: '已结束',
                label: '已结束',
            },
        ],
        provinceList: [],
        filter: {},
        value: ['0', '0-0'],
        infoList: [],
        area: ['', ''],
        source: [],
        styleOptions: [
            {
                value: '衣裳',
                label: '衣裳'
            },
            {
                value: '襦裙',
                label: '襦裙'
            }
        ],
        sizeOptions: [
            {
                value: 'xs',
                label: 'xs'
            },
            {
                value: 's',
                label: 's'
            },
        ],
        deliveryTimeOptions: [
            {
                value: '1天',
                label: '1天'
            },
            {
                value: '3天',
                label: '3天'
            },
        ],
        dynastyOptions: [
            {
                value: '战国',
                label: '战国'
            },
            {
                value: '汉',
                label: '汉'
            },
            {
                value: '明',
                label: '明'
            }
        ],
        tagsOptions: [
            {
                value: '妆造',
                label: '妆造'
            },
            {
                value: '摄影',
                label: '摄影'
            }
        ],
        style: [],
        size: [],
        dynasty: [],
        actype: [],
        deliveryTime: [],
        tags: [],
        sourceLabel: '店铺来源',
        styleLabel: '形制',
        sizeLabel: '尺码',
        deliveryTimeLabel: '发货时间',
        dynastyLabel: '朝代',
        tagsLabel: '标签',
        areaLabel: '地区选择',
        actypeLabel: '活动类型',
        tabPanelstyle: 'display:flex;justify-content:center;align-items:center;',
        previousTab: '',
        previousMenuData: []
    },
    attached: function () {
        this.getArea();
    },
    observers: {
        // 关注 currentTab 的变化
        'currentTab': function (newVal) {
            if (newVal !== this.data.previousTab) {
                this.setData({ previousTab: newVal }); // 更新 previousTab 为当前 newVal
                this.clearFilter(); // 清空筛选条件
            }
        },
        'menuData': function (newData) {
            if (newData !== this.data.previousMenuData) {
                this.setData({ previousMenuData: newData }); // 更新 previousTab 为当前 newVal
                this.processFilterData(newData);
            }
        }
    },
    methods: {
        onClick: function () {
        },
        processFilterData: function (menuData) {
            var deliveryTime = menuData.find(function (item) { return item.label === 'deliveryTime'; });
            var dynasty = menuData.find(function (item) { return item.label === 'dynasty'; });
            var actype = menuData.find(function (item) { return item.label === 'actype'; });
            var tags = menuData.find(function (item) { return item.label === 'tags'; });
            var style = menuData.find(function (item) { return item.label === 'style'; });
            var size = menuData.find(function (item) { return item.label === 'size'; });
            var source = menuData.find(function (item) { return item.label === 'source'; });
            this.setData({
                deliveryTimeOptions: deliveryTime ? deliveryTime.values : [],
                dynastyOptions: dynasty ? dynasty.values : [],
                actypeList: actype ? actype.values : [],
                tagsOptions: tags ? tags.values : [],
                sizeOptions: size ? size.values : [],
                styleOptions: style ? style.values : [],
                sourceOptions: source ? source.values : [],
            });
        },
        clearFilter: function () {
            // 清空 filter
            this.setData({
                filter: {},
                style: [],
                styleLabel: '形制',
                size: [],
                sizeLabel: '尺码',
                dynasty: [],
                dynastyLabel: '朝代',
                deliveryTime: [],
                deliveryTimeLabel: '发货时间',
                tags: [],
                tagsLabel: '标签',
                source: [],
                sourceLabel: '店铺来源',
                area: ['', ''],
            });
        },
        // 生成地区列表
        getArea: function () {
            var provinceList = _assets_area__WEBPACK_IMPORTED_MODULE_1__["default"].provinceList.map(function (province) { return ({
                label: province.fullName,
                value: province.fullName,
                children: province.directCityList.map(function (city) { return ({
                    label: city.fullName,
                    value: city.fullName,
                }); }),
            }); });
            this.setData({ provinceList: provinceList });
        },
        // 确认活动类型菜单
        onChangeTypeFilter: function (event) {
            var value = event.detail.value;
            this.setData({
                actype: value,
            });
        },
        //确认活动类型
        handleTypeFilterConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { actype: this.data.actype });
            this.createQueryParams(filter);
            //动态修改sactypeLabel
            var newactype = this.data.actype;
            this.setData({
                filter: filter,
                actypeLabel: (function () {
                    var actypeCount = newactype.length;
                    if (actypeCount === 0) {
                        return '活动类型';
                    }
                    else if (actypeCount === 1) {
                        return newactype[0];
                    }
                    else {
                        return "\u6D3B\u52A8\u7C7B\u578B" + actypeCount + "\uFF09";
                    }
                })()
            });
        },
        //重置活动类型
        handleTypeFilterReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { actype: this.data.actype });
            this.createQueryParams(filter);
            this.setData({
                filter: filter,
                actypeLabel: '活动类型'
            });
        },
        //活动状态菜单
        onChangeStatusFilter: function (e) {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { status: e.detail.value });
            this.setData({ filter: filter });
            this.createQueryParams(filter);
        },
        //地区选择菜单
        onChangeAreaFilter: function (e) {
            var value = e.detail.value;
            this.setData({ area: value });
        },
        //重置
        defaultTap: function (event) {
            var dropdownId = event.currentTarget.dataset.id;
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { area: ['', ''] });
            var newArea = this.data.area;
            this.setData({
                filter: filter,
                area: ['', ''],
                areaLabel: '地区选择'
            });
            this.createQueryParams(filter);
            this.mockCloseDropDownMenu(dropdownId);
        },
        primaryTap: function (event) {
            var dropdownId = event.currentTarget.dataset.id;
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { area: this.data.area });
            var newArea = this.data.area;
            console.log(newArea, 'newArea', newArea.length);
            this.setData({
                filter: filter,
                areaLabel: (function () {
                    var areaCount = newArea.length;
                    if (areaCount === 0) {
                        return '地区选择';
                    }
                    else if (areaCount === 2) {
                        var province = newArea[0];
                        var city = newArea[1];
                        // 如果城市为空字符串或未定义，只显示省份
                        if (!city) {
                            return province;
                        }
                        return province + "-" + city;
                    }
                    else if (areaCount === 1) {
                        return newArea[0];
                    }
                    else {
                        return "\u5730\u533A\u9009\u62E9" + areaCount + "\uFF09";
                    }
                })()
            });
            this.mockCloseDropDownMenu(dropdownId);
            this.createQueryParams(filter);
        },
        createQueryParams: function (filter) {
            var requestParam = filter || this.data.filter;
            if (requestParam.area) {
                // 从 area 数组中解构出 province 和 city
                var _a = requestParam.area, province = _a[0], city = _a[1];
                // 将 province 和 city 添加到 requestParam 对象中作为字符串
                requestParam.province = province || '';
                requestParam.city = city || '';
                // 删除临时的 area 键
                delete requestParam.area;
            }
            this.triggerEvent('menuData', requestParam); // 确认传递的格式正确
            //改用云函数
        },
        //更改地区列表的树
        mockCloseDropDownMenu: function (dropdownId) {
            var _a;
            var drowItemRef = this.selectComponent("#" + dropdownId);
            (_a = drowItemRef.$parent) === null || _a === void 0 ? void 0 : _a.setData({
                activeIdx: -1,
            });
            drowItemRef.setData({
                show: false,
            });
            drowItemRef.triggerEvent('close');
        },
        //点击店铺来源
        handleSourceChange: function (event) {
            var value = event.detail.value;
            this.setData({
                source: value,
            });
        },
        //确认店铺来源
        handleSourceConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { source: this.data.source });
            this.createQueryParams(filter);
            //动态修改sourceLabel
            var newsource = this.data.source;
            this.setData({
                filter: filter,
                sourceLabel: (function () {
                    var sourceCount = newsource.length;
                    if (sourceCount === 0) {
                        return '店铺来源';
                    }
                    else if (sourceCount === 1) {
                        return newsource[0];
                    }
                    else {
                        return "\u5E97\u94FA\u6765\u6E90" + sourceCount + "\uFF09";
                    }
                })()
            });
        },
        //重置店铺来源
        handleSourceReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { source: this.data.source });
            this.createQueryParams(filter);
            //动态修改sourceLabel
            var newsource = this.data.source;
            this.setData({
                filter: filter,
                sourceLabel: '店铺来源'
            });
        },
        //点击汉服款式属性
        handleStyleChange: function (event) {
            var value = event.detail.value;
            this.setData({
                style: value,
            });
        },
        //确认汉服款式属性
        handleStyleConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { style: this.data.style });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newStyles = this.data.style;
            this.setData({
                filter: filter,
                styleLabel: (function () {
                    var styleCount = newStyles.length;
                    if (styleCount === 0) {
                        return '形制';
                    }
                    else if (styleCount === 1) {
                        return newStyles[0];
                    }
                    else {
                        return "\u5F62\u5236\uFF08" + styleCount + "\uFF09";
                    }
                })()
            });
        },
        //重置汉服款式
        handleStyleReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { style: this.data.style });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newStyles = this.data.style;
            this.setData({
                filter: filter,
                styleLabel: (function () {
                    var styleCount = newStyles.length;
                    if (styleCount === 0) {
                        return '形制';
                    }
                    else if (styleCount === 1) {
                        return newStyles[0];
                    }
                    else {
                        return "\u5F62\u5236\uFF08" + styleCount + "\uFF09";
                    }
                })()
            });
        },
        //点击标签属性
        handleTagsChange: function (event) {
            var value = event.detail.value;
            this.setData({
                tags: value,
            });
        },
        //确认标签属性
        handleTagsConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { tags: this.data.tags });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newTags = this.data.tags;
            this.setData({
                filter: filter,
                tagsLabel: (function () {
                    var tagsCount = newTags.length;
                    if (tagsCount === 0) {
                        return '标签（';
                    }
                    else if (tagsCount === 1) {
                        return newTags[0];
                    }
                    else {
                        return "\u6807\u7B7E\uFF08" + tagsCount + "\uFF09";
                    }
                })()
            });
        },
        //重置标签款式
        handleTagsReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { tags: this.data.tags });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newTags = this.data.tags;
            this.setData({
                filter: filter,
                tagsLabel: '标签'
            });
        },
        //点击朝代属性
        handleDynastyChange: function (event) {
            var value = event.detail.value;
            this.setData({
                dynasty: value,
            });
        },
        //确认朝代属性
        handleDynastyConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { dynasty: this.data.dynasty });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newDynasty = this.data.dynasty;
            this.setData({
                filter: filter,
                dynastyLabel: (function () {
                    var dynastyCount = newDynasty.length;
                    if (dynastyCount === 0) {
                        return '朝代';
                    }
                    else if (dynastyCount === 1) {
                        return newDynasty[0];
                    }
                    else {
                        return "\u671D\u4EE3" + dynastyCount + "\uFF09";
                    }
                })()
            });
        },
        //重置朝代
        handleDynastyReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { dynasty: this.data.dynasty });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newDynasty = this.data.dynasty;
            this.setData({
                filter: filter,
                dynastyLabel: (function () {
                    var dynastyCount = newDynasty.length;
                    if (dynastyCount === 0) {
                        return '朝代';
                    }
                    else if (dynastyCount === 1) {
                        return newDynasty[0];
                    }
                    else {
                        return "\u671D\u4EE3" + dynastyCount + "\uFF09";
                    }
                })()
            });
        },
        //点击尺码属性
        handleSizeChange: function (event) {
            var value = event.detail.value;
            this.setData({
                size: value,
            });
        },
        //确认尺码
        handleSizeConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { size: this.data.size });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newSize = this.data.size;
            this.setData({
                filter: filter,
                sizeLabel: (function () {
                    var sizeCount = newSize.length;
                    if (sizeCount === 0) {
                        return '尺码';
                    }
                    else if (sizeCount === 1) {
                        return newSize[0];
                    }
                    else {
                        return "\u5C3A\u7801" + sizeCount + "\uFF09";
                    }
                })()
            });
        },
        //重置尺码
        handleSizeReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { size: this.data.size });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newSize = this.data.size;
            this.setData({
                filter: filter,
                sizeLabel: (function () {
                    var sizeCount = newSize.length;
                    if (sizeCount === 0) {
                        return '尺码';
                    }
                    else if (sizeCount === 1) {
                        return newSize[0];
                    }
                    else {
                        return "\u5C3A\u7801" + sizeCount + "\uFF09";
                    }
                })()
            });
        },
        //点击发货时间
        handleDeliveryTimeChange: function (event) {
            var value = event.detail.value;
            this.setData({
                deliveryTime: value,
            });
        },
        //确认发货时间
        handleDeliveryTimeConfirm: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { deliveryTime: this.data.deliveryTime });
            this.createQueryParams(filter);
            //动态修改styleLabel
            var newDeliveryTime = this.data.deliveryTime;
            this.setData({
                filter: filter,
                deliveryTimeLabel: (function () {
                    var deliveryTimeCount = newDeliveryTime.length;
                    if (deliveryTimeCount === 0) {
                        return '尺码';
                    }
                    else if (deliveryTimeCount === 1) {
                        return newDeliveryTime[0];
                    }
                    else {
                        return "\u5C3A\u7801" + deliveryTimeCount + "\uFF09";
                    }
                })()
            });
        },
        //重置发货时间
        handleDeliveryTimeReset: function () {
            var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({}, this.data.filter), { deliveryTime: this.data.deliveryTime });
            this.createQueryParams(filter);
            //动态修改deliveryTimeLabel
            var newDeliveryTime = this.data.deliveryTime;
            this.setData({
                filter: filter,
                deliveryTimeLabel: (function () {
                    var deliveryTimeCount = newDeliveryTime.length;
                    if (deliveryTimeCount === 0) {
                        return '发货时间';
                    }
                    else if (deliveryTimeCount === 1) {
                        return newDeliveryTime[0];
                    }
                    else {
                        return "\u53D1\u8D27\u65F6\u95F4" + deliveryTimeCount + "\uFF09";
                    }
                })()
            });
        },
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/menu/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map