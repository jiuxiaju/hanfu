"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/result/result"],{

/***/ "./pages/result/result.ts":
/*!********************************!*\
  !*** ./pages/result/result.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);



(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
        query: '',
        text: '',
        currentTab: 0,
        navbarHeight: 0,
        showSearchResult: false,
        stickyProps: {
            offsetTop: 80,
        },
        renderMarker: [],
        showLoading: true,
        list: [],
        backTopTheme: 'round',
        backTopText: '顶部',
        scrollTop: 0,
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        showNoData: false,
        scrollTimeoutId: null,
        config: {
            "offline_shop_set": {
                "fields": ["tags", "adress"],
                "displayValuesOnly": ["adress", "tags"],
                "fieldLabels": {},
                "styles": {
                    "tags": {
                        "background-color": "#6dd40033",
                        "color": "#53A101"
                    }
                }
            },
            "activity_set": {
                "fields": ["address",],
                "displayValuesOnly": ["tags", "seasons"],
                "fieldLabels": { "address": "地址" }
            },
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
            "hanfu_style": {
                "fields": ['brand', 'sizes', 'delivery_time'],
                "displayValuesOnly": [],
                "fieldLabels": { 'brand': "品牌", 'sizes': "尺码", 'delivery_time': '发货周期' },
                "styles": {
                    "brand": {
                        "background-color": "#6dd40033",
                        "color": "#53A101"
                    }
                }
            },
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
        menuData: [],
        // 存储每步的时间情况
        stepTimes: [],
        menuFilters: {},
        dynamicFilters: {},
        scrollTopUpdates: [],
        showCard: false,
        targetWord: '汉服',
        filteredData: {},
    },
    onLoad: function (options) {
        var _this = this;
        // 获取系统信息
        // 使用选择器查询组件
        var query = wx.createSelectorQuery();
        query.select('#navbar').boundingClientRect();
        query.exec(function (res) {
            if (res[0]) {
                var navbarHeight = res[0].height + 42; // 导航栏高度加100
                _this.setData({
                    navbarHeight: navbarHeight,
                });
            }
        });
        console.log(this.data.navbarHeight, 'navbarHeight');
        var currentTab = options.currentTab, text = options.text;
        console.log(currentTab, 'currentTab', text);
        this.setData({
            currentTab: currentTab,
            text: text
        });
        if (options.query) {
            var query_1 = decodeURIComponent(options.query);
            this.setData({
                query: query_1,
            });
            //接受参数，进行结果搜索。
            this.queryInfoss(query_1);
            this.fetchMenuData();
        }
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
    // 分享好友
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
    onInputFocus: function (e) {
        // 返回上一页
        wx.navigateBack({
            delta: 1 // 返回上一级页面
        });
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
        console.log(currentDisplayCount, 'currentDisplayCount');
        if (currentDisplayCount < list.length) {
            // 有更多数据可以加载
            var moreData = list.slice(currentDisplayCount, nextDisplayCount);
            // 将新的数据追加到现有的 displayList 中
            var updatedDisplayList = this.data.displayList.concat(moreData);
            this.setData({
                displayList: updatedDisplayList,
                currentDisplayCount: nextDisplayCount,
                showNoData: nextDisplayCount >= list.length // 当没有更多数据时显示提示，否则不显示
            });
        }
        else {
            // 如果没有更多的数据来加载
            this.setData({
                showNoData: true
            });
        }
    },
    //菜单筛选
    handleMenuData: function (event) {
        var menuData = event.detail;
        this.setData({
            menuFilters: menuData
        });
        var filteredData = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, menuData), this.data.dynamicFilters);
        this.queryInfoss(this.data.query, this.data.currentTab, filteredData);
        this.handleToTop();
    },
    handleDynamicChange: function (event) {
        var dynamicData = event.detail;
        this.setData({
            dynamicFilters: dynamicData
        });
        var filteredData = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, this.data.menuFilters), dynamicData);
        console.log(filteredData, 'filteredData-dynamicFilters');
        this.queryInfoss(this.data.query, this.data.currentTab, filteredData, true);
        this.handleToTop();
    },
    // 搜索和筛选函数
    queryInfoss: function (query, tab, filteredData, isDynamicFilter) {
        var _this = this;
        if (query === void 0) { query = this.data.query; }
        if (tab === void 0) { tab = this.data.currentTab; }
        if (filteredData === void 0) { filteredData = {}; }
        if (isDynamicFilter === void 0) { isDynamicFilter = false; }
        // 立即显示加载提示
        wx.showLoading({ title: '搜索中' });
        wx.cloud.callFunction({
            name: 'search',
            data: {
                query: query,
                tab: tab === 'all' ? undefined : tab,
                filteredData: filteredData
            }
        })
            .then(function (res) {
            wx.hideLoading(); // 搜索成功后隐藏加载提示
            var result = res.result;
            _this.setData({
                list: result.data,
                currentTab: tab,
                config: result.config,
                query: query,
                currentDisplayCount: 10,
                showSearchResult: true,
                displayList: result.data.slice(0, _this.data.batchSize), // 初始显示第一批数据
            });
            // 仅在非动态筛选时更新 tabsData
            if (!isDynamicFilter) {
                _this.setData({
                    mergedData: result.mergedData || {}, // 默认值为空对象
                });
            }
        })
            .catch(function (err) {
            console.error(err);
        });
    },
    //返回顶部
    handleToTop: function () {
        console.log(this.data.displayList, '测试分步加载一场');
        this.setData({ scrollTop: 0 });
    },
    // handleToTop() {
    //   wx.pageScrollTo({
    //     scrollTop: 0,
    //     duration: 500  // 滚动动画的持续时间，默认是 300ms
    //   });
    // },
    // onRenderComplete(e) {
    //   const { id } = e.detail;
    //   const { renderMarker, displayList } = this.data;
    //   console.log('已完成',id)
    //      // 如果 renderMarker 中没有此 id，则标记其为已渲染
    //      if (!renderMarker.includes(id)) {
    //       renderMarker.push(id);
    //       // 更新 displayList 中对应 id 的项，增加已处理字段
    //       const updatedDisplayList = displayList.map(item => 
    //         item._id === id ? { ...item, isRendered: true } : item
    //       );
    //       this.setData({ 
    //         renderMarker,
    //         displayList: updatedDisplayList 
    //       });
    //       // 在调用 setData 后立即检查是否更新
    //       console.log('updatedDisplayList:', updatedDisplayList);
    //       console.log('displayList after update:', this.data.displayList);
    //     }
    // },
    //tab切换之后，再次搜索。
    onTabsChange: function (e) {
        this.setData({
            filteredData: {}
        });
        this.queryInfoss(this.data.query, e.detail.value);
        this.handleToTop();
    },
    // 检查是否可跳转的方法
    checkShouldNavigate: function (item, successCallback) {
        if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
            __MOR_API__.showToast({ title: '该卡片不可跳转', icon: 'none' });
            return;
        }
        successCallback();
    },
    handleItemClick: function (event) {
        var Item = event.detail;
        // // 根据不同的source进行不同的跳转或逻辑处理
        switch (Item.source) {
            case 'activity_set':
                __MOR_API__.navigateTo({
                    url: "/pages/activity-list/detail/index?activityId=" + Item._id,
                });
                break;
            case 'offline_shop_set':
                this.checkShouldNavigate(Item, function () {
                    __MOR_API__.navigateTo({
                        url: "/pages/shop/offline-detail/index?itemId=" + Item._id,
                    });
                });
                break;
            case 'article':
                __MOR_API__.navigateTo({
                    url: "/pages/article/detail?articleId=" + Item._id,
                });
                break;
            case 'knowledge_set':
                __MOR_API__.navigateTo({
                    url: "/pages/population-list/detail/index?PopulationById=" + Item._id,
                });
                break;
            case 'online_shop_set':
                this.checkShouldNavigate(Item, function () {
                    __MOR_API__.navigateTo({
                        url: "/pages/shop/online-detail/index?itemId=" + Item._id,
                    });
                });
                break;
            case 'hanfu_style':
                this.checkShouldNavigate(Item, function () {
                    __MOR_API__.navigateTo({
                        url: "/pages/shop/style/index?itemId=" + Item._id,
                    });
                });
                break;
            // 添加更多 case 根据不同的 source 处理不同的跳转或逻辑
            default:
                console.log('暂时没有');
                break;
        }
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/result/result.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=result.js.map