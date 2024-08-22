"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/online-list/index"],{

/***/ "./pages/shop/online-list/index.ts":
/*!*****************************************!*\
  !*** ./pages/shop/online-list/index.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:18
 * @LastEditors: 兼爱
 * @Description:
 * @FilePath: /hanfu/src/components/shop/online/online.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

var options = [
    {
        value: '1',
        label: '淘宝',
        icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01uRn4VL1Oy57aWZzRo_!!6000000001773-2-tps-24-24.png',
    }, {
        value: '2',
        label: '拼多多',
        icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01awoIdD1fq9jnbj1aV_!!6000000004057-0-tps-24-24.jpg',
    }, {
        value: '3',
        label: '抖音',
        icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01mT75pL1yJ9tvR5weD_!!6000000006557-2-tps-24-24.png',
    }, {
        value: '4',
        label: '京东',
        icon: 'https://gw.alicdn.com/imgextra/i1/O1CN01to53GL1W8LJ2iMnkW_!!6000000002743-2-tps-24-24.png',
    }, {
        value: '5',
        label: '微店',
        icon: 'https://gw.alicdn.com/imgextra/i2/O1CN01ZmFC5H1rKLcQlutEv_!!6000000005612-2-tps-24-24.png',
    }, {
        value: '6',
        label: '小红书',
        icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01NzvJMm1L70NKjP0FP_!!6000000001251-2-tps-24-24.png',
    }
];
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    props: {
        className: '',
        data: {},
        onClick: function () { },
    },
    data: {
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsImage: [{ size: '100px', type: 'rect' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }],
        source: [],
        options: options,
        dynamicFilters: {},
        showLoading: true,
        styleOptions: [
            {
                value: '衣裳',
                label: '衣裳'
            }
        ],
        menuFilters: {},
        menuData: [],
        filteredData: {},
        list: [],
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        showNoData: false,
        style: [],
        sourceLabel: '店铺来源',
        styleLabel: '形制',
        config: {
            "online_shop_set": {
                "fields": ["style", "store"],
                "displayValuesOnly": ["style"],
                "fieldLabels": {},
                "styles": {
                    "style": {
                        "background-color": "#a866001a",
                        "color": "#A86600"
                    }
                }
            },
        },
        mergedData: {},
    },
    didMount: function () {
        this.onSearch();
        this.fetchMenuData();
    },
    methods: {
        onClick: function () {
        },
        handleSourceChange: function (event) {
            var value = event.detail.value;
            this.setData({
                source: event.detail.value,
                sourceLabel: (value === null || value === void 0 ? void 0 : value.length) ? "\u5E97\u94FA\u6765\u6E90(" + value.length + ")" : '店铺来源'
            });
            this.onSearch();
        },
        handleStyleChange: function (event) {
            var value = event.detail.value;
            this.setData({
                style: value,
                styleLabel: (value === null || value === void 0 ? void 0 : value.length) ? "\u5F62\u5236(" + value.length + ")" : '形制'
            });
            this.onSearch();
        },
        onScrollViewScroll: function (e) {
            var scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
            var scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
            var scrollViewHeight = 700; // scroll-view 的固定高度
            var triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
            // 检查是否接近底部，并触发数据加载
            if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
                console.log('接近底部，加载更多数据...');
                this.onScrollToLower();
            }
        },
        onScrollToLower: function () {
            // 当滑动到页面底部时触发
            var _a = this.data, list = _a.list, displayList = _a.displayList, currentDisplayCount = _a.currentDisplayCount, batchSize = _a.batchSize;
            console.log(currentDisplayCount, 'currentDisplayCount');
            var nextDisplayCount = currentDisplayCount + batchSize;
            if (currentDisplayCount < list.length) {
                // 有更多数据可以加载
                var moreData = list.slice(currentDisplayCount, nextDisplayCount);
                this.setData({
                    displayList: displayList.concat(moreData),
                    currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
                });
                console.log(displayList, 'displayList');
            }
        },
        handleItemClick: function (event) {
            var item = event.detail;
            console.log(item, 'item');
            // 检查 shouldNavigate 字段
            if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
                __MOR_API__.showToast({ title: '该店铺不可跳转', icon: 'none' });
                return;
            }
            var itemId = item._id;
            __MOR_API__.navigateTo({
                url: "/pages/shop/online-detail/index?itemId=" + itemId,
            });
        },
        fetchMenuData: function () {
            var _this = this;
            wx.cloud.callFunction({
                name: 'menuOptions', // 请替换成您的云函数名
            }).then(function (res) {
                var result = res.result; // 这里接收到的result应该是一个数组
                _this.setData({
                    menuData: result
                });
            });
        },
        //菜单筛选
        handleMenuData: function (event) {
            var menuData = event.detail;
            this.setData({
                menuFilters: menuData
            });
            var filteredData = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, menuData), this.data.dynamicFilters);
            this.onSearch(filteredData);
        },
        handleDynamicChange: function (event) {
            var dynamicData = event.detail;
            this.setData({
                dynamicFilters: dynamicData
            });
            var filteredData = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, this.data.menuFilters), dynamicData);
            this.onSearch(filteredData, true);
            console.log(filteredData, 'filteredData-dynamicFilters');
        },
        onSearch: function (filteredData, isDynamicFilter) {
            var _this = this;
            if (filteredData === void 0) { filteredData = {}; }
            if (isDynamicFilter === void 0) { isDynamicFilter = false; }
            console.log(filteredData, 'filteredData-filteredData');
            // 调用云函数
            wx.cloud.callFunction({
                // 云函数名称
                name: 'onsearchOnineShop',
                // 传给云函数的参数
                data: {
                    filteredData: filteredData,
                },
            }).
                then(function (res) {
                var result = res.result;
                console.log(result, 'result-result');
                if (result) {
                    var dataList = result.data;
                    if (dataList && dataList.length > 0) {
                        // const newState = {
                        //   config: result.config,
                        //   list: dataList,
                        //   displayList: dataList.slice(0, this.data.batchSize),
                        //   showLoading: false, // 数据加载完毕，隐藏加载动画
                        //   showNoData: false,
                        //   currentDisplayCount: 10
                        // };
                        // if (!isDynamicFilter) {
                        //   newState.mergedData = result.mergedData || {}; // 默认值为空对象
                        // }
                        // this.setData(newState, () => {
                        //   wx.nextTick(() => {
                        //     console.log('Force update');
                        //     // 强制更新视图
                        //   });
                        // });
                        // console.log(newState,'newState')
                        _this.setData({
                            list: dataList,
                            displayList: dataList.slice(0, _this.data.batchSize),
                            showLoading: false,
                            showNoData: false,
                            config: result.config,
                            currentDisplayCount: 10
                        });
                        if (!isDynamicFilter) {
                            _this.setData({
                                mergedData: result.mergedData || {}
                            });
                        }
                    }
                    else {
                        _this.setData({
                            showNoData: true,
                            showLoading: false, // 数据加载完毕但是无数据，隐藏加载动画
                        });
                    }
                }
                else {
                    // 请求失败或云函数执行不成功
                    _this.setData({
                        showNoData: true,
                        showLoading: false, // 数据加载失败，显示无数据提示
                    });
                }
            }).catch(function (err) {
                console.error(err);
                // 处理任何在请求中发生的错误
                console.error('云函数调用失败：', err);
                _this.setData({
                    showNoData: true,
                    showLoading: false, // 请求失败，显示无数据提示
                });
            });
        }
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/online-list/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map