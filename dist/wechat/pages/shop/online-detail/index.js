"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/online-detail/index"],{

/***/ "./pages/shop/online-detail/index.ts":
/*!*******************************************!*\
  !*** ./pages/shop/online-detail/index.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        list: [],
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        shopInfo: {},
        dianming: '',
        menuData: [],
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }],
        rowColsImage: [{ size: '100px', type: 'rect' }],
        isLoadingContent: true,
        config: {
            "hanfu_style": {
                // "fields": ['brand', 'sizes', 'delivery_time'],
                // "displayValuesOnly": [],
                // "fieldLabels": { 'brand': "品牌", 'sizes': "尺码", 'delivery_time': '发货周期' },
                // "styles": {
                //   "brand": {
                //     "background-color": "#6dd40033",
                //     "color": "#53A101"
                //   }
                // }
                fields: ['brand', 'size', 'delivery_time', 'gender'],
                displayValuesOnly: [],
                fieldLabels: { 'brand': "品牌", 'size': "尺码", 'delivery_time': '发货周期', 'gender': '适宜性别' },
                styles: {
                    brand: {
                        "background-color": "#6dd40033",
                        "color": "#53A101"
                    }
                },
                search: {},
                imageStyles: {
                    width: "70%" // 默认图像宽度为100%
                }
            },
        },
        filteredData: {},
        mergedData: []
    },
    onLoad: function (query) {
        var _this = this;
        this.stylelist();
        this.fetchMenuData();
        var itemId = query.itemId || '';
        this.setData({
            itemId: itemId
        });
        wx.cloud
            .callFunction({
            // 云函数名称
            name: "online-detail",
            data: {
                itemId: itemId
            }
        })
            .then(function (res) {
            console.log(res, 'res');
            var result = res.result;
            _this.setData({
                shopInfo: result.data[0],
            });
            console.log(_this.data.shopInfo, 'shopInfo');
        });
    },
    methods: {
        onShareAppMessage: function () {
            var promise = new Promise(function (resolve) {
                setTimeout(function () {
                    resolve({
                        title: '九霞裾',
                    });
                }, 20);
            });
            return {
                title: '九霞裾',
                path: '/pages/home',
                promise: promise,
            };
        },
        onShareTimeline: function () {
            return {
                title: '快来看看',
            };
        },
        handleMultipleSelect: function (e) {
            this.setData({
                'multipleSelect.value': e.detail.value,
            });
        }
    },
    //分享给好友
    onShareAppMessage: function () {
        var app = getApp(); // 获取全局应用实例
        var promise = new Promise(function (resolve) {
            app.generateShareInfo().then(function (shareInfo) {
                // 在这里处理生成的分享信息
                resolve(shareInfo);
            });
        });
        return {
            title: '九霞裾',
            path: '/pages/home',
            promise: promise
        };
    },
    //转发到朋友圈
    onShareTimeline: function () {
        return {
            title: '快来看看'
        };
    },
    onScrollViewScroll: function (e) {
        var scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
        var scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
        var scrollViewHeight = 700; // scroll-view 的固定高度
        var triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
        // 检查是否接近底部，并触发数据加载
        if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
            console.log('接近底部，加载更多数据...');
            // this.loadMoreData();
            this.onScrollToLower();
        }
    },
    //监控页面滚动
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
        }
    },
    handleItemClick: function (event) {
        var item = event.detail;
        var itemId = event.detail._id;
        console.log(itemId, 'itemId');
        // 检查 shouldNavigate 字段
        if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
            __MOR_API__.showToast({ title: '该款式不可跳转', icon: 'none' });
            return;
        }
        __MOR_API__.navigateTo({
            url: "/pages/shop/style/index?itemId=" + itemId,
        });
    },
    fetchMenuData: function () {
        var _this = this;
        wx.cloud.callFunction({
            name: 'menuOptions', // 请替换成您的云函数名
        }).then(function (res) {
            var result = res.result; // 这里接收到的result应该是一个数组
            console.log(result, 'rmenuDataesult'); // 查看返回数据
            _this.setData({
                menuData: result
            });
        });
    },
    stylelist: function (filteredData) {
        var _this = this;
        if (filteredData === void 0) { filteredData = {}; }
        var itemId = this.data.itemId;
        console.log(itemId, filteredData, 'itemId');
        wx.cloud
            .callFunction({
            // 云函数名称
            name: "stylelist",
            data: {
                itemId: itemId,
                filteredData: filteredData
            }
        }).then(function (res) {
            console.log(res, 'res1');
            var result = res.result;
            var styleList = result.data;
            var newProducts = styleList.filter(function (item) { return item.isNew; });
            _this.setData({
                config: result.config,
                currentDisplayCount: 10,
                list: styleList,
                newProducts: newProducts,
                displayList: styleList.slice(0, _this.data.batchSize),
                isLoadingContent: false,
            });
            console.log(newProducts, _this.data.config, 'newProducts');
        });
    },
    handleMenuData: function (event) {
        var filterData = event.detail;
        this.setData({
            filteredData: filterData
        });
        var filteredData = this.data.filteredData;
        console.log('filteredData12', filteredData);
        this.stylelist(filteredData);
    },
    navigateToUrl: function (event) {
        var style = event.currentTarget.dataset.style;
        console.log('navigateToUrl:', style); // 调试输出
        __MOR_API__.navigateTo({
            url: "/pages/population-list/detail/index?style=" + style,
        });
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/online-detail/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map