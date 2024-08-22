"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/population-list/index/index"],{

/***/ "./pages/population-list/index/index.ts":
/*!**********************************************!*\
  !*** ./pages/population-list/index/index.ts ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


// 获取全局 app 实例
var app = getApp();
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        infoList: [],
        stickyProps: {},
        isFirstLoad: true,
        filteredData: {},
        config: {
            "knowledge_set": {
                "fields": ["chaodai", "tags", "seasons", "detail"],
                "displayValuesOnly": ["tags", "seasons", "detail"],
                "fieldLabels": { "chaodai": "朝代" },
                "styles": {
                    "chaodai": {
                        "background-color": "#a866001a",
                        "color": "#A86600"
                    },
                    "seasons": {
                        "background-color": "#e0ffe0",
                        "color": "#53A101"
                    }
                }
            },
        },
        mergedData: {},
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsImage: [{ size: '100px', type: 'rect' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }],
        showLoading: true,
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        list: [],
    },
    onLoad: function () {
        this.getpopulationList();
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
    onPullDownRefresh: function () {
        this.getpopulationList();
    },
    onStickyScroll: function (event) {
        console.log(event.detail);
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
    // 获取科普列表
    getpopulationList: function (filteredData) {
        var _this = this;
        if (filteredData === void 0) { filteredData = {}; }
        console.log(filteredData, 'filteredData');
        wx.cloud.callFunction({
            name: 'onsearchpopulation',
            data: {
                filteredData: filteredData // 将 filteredData 传递给云函数作为过滤条件
            }
        }).then(function (data) {
            console.log(data, 'data');
            var result = data.result;
            var cardList = result.data;
            // 判断是否为初次加载，更新 mergedData
            var newMergedData = _this.data.isFirstLoad ? result.mergedData : _this.data.mergedData;
            _this.setData({
                list: cardList,
                displayList: cardList.slice(0, _this.data.batchSize),
                showLoading: false,
                currentDisplayCount: 10,
                mergedData: newMergedData,
                config: result.configTemplates
            });
            console.log(_this.data.config, 'config');
        });
    },
    handleDynamicChange: function (event) {
        var _this = this;
        var filteredData = event.detail;
        // 打印调试信息
        console.log(filteredData, 'filteredData-dynamicFilters');
        this.setData({
            isFirstLoad: false,
            filterObject: filteredData
        }, function () {
            _this.getpopulationList(filteredData);
        });
    },
    //返回顶部
    handleToTop: function () {
        this.setData({ scrollTop: 0 });
    },
    getRitch: function (rich) {
        if (!rich) {
            return '';
        }
        var richClone = rich.replace(/<[^>]*>/g, "");
        return richClone;
    },
    handleItemClick: function (event) {
        var Item = event.detail;
        __MOR_API__.navigateTo({ url: "/pages/population-list/detail/index?PopulationById=" + Item._id });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/population-list/index/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map