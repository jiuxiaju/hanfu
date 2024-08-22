"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/offline-list/index"],{

/***/ "./pages/shop/offline-list/index.ts":
/*!******************************************!*\
  !*** ./pages/shop/offline-list/index.ts ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:23
 * @LastEditors: 兼爱
 * @Description:
 * @FilePath: /hanfu/src/components/shop/offline/offline.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

// import { searchOfflineShop } from '../../../services/shop';
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
        filteredData: {},
        cur: {},
        position: [
            { value: 'top', text: '顶部弹出' },
            { value: 'left', text: '左侧弹出' },
            { value: 'center', text: '中间弹出' },
            { value: 'bottom', text: '底部弹出' },
            { value: 'right', text: '右侧弹出' },
        ],
        support: [],
        // visible: false ,// 控制弹窗显示状态
        options: [
            { label: '妆造', value: 'makeup' },
            { label: '摄影', value: 'photo_shoot' },
        ],
        dynamicFilters: {},
        mergedData: {},
        menuData: [],
        currentTab: 1,
        region: [],
        showLoading: true,
        list: [],
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        showNoData: false,
        supportLabel: '全部',
        areaLabel: '地区选择',
        config: {}
    },
    didMount: function () {
        this.onSearch();
        this.fetchMenuData();
    },
    methods: {
        handlePopup: function (e) {
            var _this = this;
            var item = e.currentTarget.dataset.item;
            this.setData({
                cur: item,
            }, function () {
                _this.setData({ visible: true });
            });
        },
        onVisibleChange: function (e) {
            this.setData({
                visible: e.detail.visible,
            });
        },
        onClick: function () {
        },
        onScrollViewScroll: function (e) {
            var scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
            var scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
            var scrollViewHeight = 700; // scroll-view 的固定高度
            var triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
            // 检查是否接近底部，并触发数据加载
            if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
                this.onScrollToLower();
            }
        },
        //监控页面滚动
        onScrollToLower: function () {
            // 当滑动到页面底部时触发
            var _a = this.data, list = _a.list, displayList = _a.displayList, currentDisplayCount = _a.currentDisplayCount, batchSize = _a.batchSize;
            var nextDisplayCount = currentDisplayCount + batchSize;
            if (currentDisplayCount < list.length) {
                // 有更多数据可以加载
                var moreData = list.slice(currentDisplayCount, nextDisplayCount);
                this.setData({
                    displayList: displayList.concat(moreData),
                    currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
                });
            }
        },
        handleItemClick: function (event) {
            var item = event.detail;
            // 检查 shouldNavigate 字段
            if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
                __MOR_API__.showToast({ title: '该店铺不可跳转', icon: 'none' });
                return;
            }
            var itemId = item._id;
            __MOR_API__.navigateTo({
                url: "/pages/shop/offline-detail/index?itemId=" + itemId,
            });
        },
        //返回顶部
        handleToTop: function () {
            this.setData({ scrollTop: 0 });
        },
        // handleMenuData(event) {
        //   const filterData = event.detail;
        //   this.setData({
        //     filteredData: filterData
        //   });
        //   const filteredData = this.data.filteredData;
        //   console.log('filteredData12', filteredData)
        //   this.onSearch(filteredData)
        // },
        // handleDynamicChange(event) {
        //   const dynamicData = event.detail;
        //   this.setData({
        //     dynamicFilters: dynamicData
        //   });
        //   const filteredData = {
        //     ...this.data.menuFilters,
        //     ...dynamicData
        //   };
        //   console.log(filteredData, 'filteredData-dynamicFilters')
        //   this.queryInfoss(this.data.query, this.data.currentTab, filteredData, true);
        // },
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
            console.log(filteredData, 'filteredData2');
            wx.cloud.callFunction({
                // 云函数名称
                name: 'onsearchOfflineShop',
                // 传给云函数的参数
                data: {
                    filteredData: filteredData,
                },
            })
                .then(function (res) {
                var result = res.result;
                if (result) {
                    var dataList = result.data;
                    if (dataList && dataList.length > 0) {
                        var newData = {
                            config: result.config,
                            list: dataList,
                            displayList: dataList.slice(0, _this.data.batchSize),
                            showLoading: false,
                            showNoData: false,
                            currentDisplayCount: 10
                        };
                        if (!isDynamicFilter) {
                            newData.mergedData = result.mergedData || {}; // 仅在非动态筛选时更新 mergedData
                        }
                        _this.setData(newData);
                    }
                    else {
                        _this.setData({
                            showNoData: true,
                            showLoading: false, // 数据加载完毕但是无数据，隐藏加载动画
                        });
                    }
                }
                else {
                    _this.setData({
                        showNoData: true,
                        showLoading: false, // 数据加载失败，显示无数据提示
                    });
                }
            })
                .catch(function (err) {
                console.error(err);
                _this.setData({
                    showNoData: true,
                    showLoading: false, // 请求失败，显示无数据提示
                });
            });
        }
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/offline-list/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map