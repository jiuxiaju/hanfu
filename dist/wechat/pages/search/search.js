"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/search/search"],{

/***/ "./pages/search/search.ts":
/*!********************************!*\
  !*** ./pages/search/search.ts ***!
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
        queryHistoryArr: [],
        suggestions: [],
        suggestionText: '',
        showSuggestion: false,
        suggestionLink: '',
        suggestionMapping: [],
        placeholders: ['汉服', '汉服运动', '北京'],
        // currentPlaceholder: '汉服运动', // 当前显示的底纹词
        currentPlaceholder: '',
        mockData: null,
        destRecs: {},
        generalRecs: [],
        currentTab: '',
        text: '',
        currentQuery: '',
        currentText: '',
        // currentTab: '' // 当前选中的 currentTab
        SuggestedSearches: [],
        placeholderWords: [
            {
                query: "搜索推荐词...",
                updated: false,
                text: "",
                currentTab: ""
            }
        ]
    },
    onLoad: function () {
        //热搜词
        this.startPlaceholderUpdateTimer(); // 启动定期更新定时器
        this.setDataFromGlobalData();
        this.setPlaceholderWord();
        var queryHistoryArr = __MOR_API__.getStorageSync({ key: 'queryHistory' }).data;
        this.setData({ queryHistoryArr: queryHistoryArr || [] });
        var that = this;
        // 调用云函数 
        wx.cloud.callFunction({
            name: 'suggestion',
            success: function (res) {
                // 把获取到的数组赋值给页面数据中的mockData
                var result = res.result;
                console.log(result, 'result');
                that.setData({
                    recommendations: result.recommendations,
                    combinedArray: result.combinedArray,
                    suggestionMapping: result.simpleArray
                });
            },
            fail: function (error) {
                console.error('Cloud function call failed: ', error);
            }
        });
        wx.cloud.callFunction({
            name: 'SuggestedSearches',
            data: {
                queryHistoryArr: queryHistoryArr
            },
            success: function (res) {
                // 把获取到的数组赋值给页面数据中的mockData
                var result = res.result;
                console.log(result, 'result111');
                that.setData({
                    SuggestedSearches: result
                }, function () {
                    that.refreshDiscoveries();
                });
            },
            fail: function (error) {
                console.error('Cloud function call failed: ', error);
            }
        });
    },
    setDataFromGlobalData: function () {
        var app = getApp();
        this.setData({
            // queryHistoryArr: app.globalData.queryHistoryArr,
            placeholderWords: app.globalData.placeholderWords
        });
        // 打印完整的 placeholderWords
        console.log('页面加载时获得的 placeholderWords:', this.data.placeholderWords);
    },
    startPlaceholderUpdateTimer: function () {
        var _this = this;
        // 设置一个定时器，每隔 5 秒随机选择一个新的 placeholderWord
        setInterval(function () {
            _this.setPlaceholderWord();
        }, 7000); // 每 5 秒更新一次
    },
    setPlaceholderWord: function () {
        var placeholderWords = this.data.placeholderWords;
        if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
            var randomIndex = Math.floor(Math.random() * placeholderWords.length);
            // this.setData({ placeholder: placeholderWords[randomIndex].text });
            // // 打印选中的 placeholder
            var selectedPlaceholder = placeholderWords[randomIndex];
            this.setData({
                placeholder: selectedPlaceholder.text,
                currentQuery: selectedPlaceholder.query,
                currentText: selectedPlaceholder.text,
                currentTab: selectedPlaceholder.currentTab,
                currentPlaceholder: selectedPlaceholder.text
            });
        }
    },
    filterRecommendations: function (query) {
        var cityRecs = this.data.recommendations || [];
        var generalRecs = this.data.combinedArray || [];
        var filteredRecs = [];
        // 精准匹配城市名的推荐项
        var cityMatch = cityRecs.filter(function (rec) { return rec.query === query; });
        // 其他联想推荐项
        var generalMatch = generalRecs.filter(function (rec) { return rec.text.includes(query); });
        // 合并两个结果集
        filteredRecs = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], cityMatch, true), generalMatch, true);
        return filteredRecs;
    },
    // 转发好友
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
    onUnload: function () {
        // 清理定时器
        if (this.placeholderTimer) {
            clearInterval(this.placeholderTimer);
        }
    },
    // 当输入框值发生变化时，更新查询词，并获取联想词
    onInputChange: function (e) {
        var query = e.detail.value;
        this.setData({ query: query });
        if (query.trim()) {
            // this.getSuggestions(query);
            // 处理联想词的部分
            var suggestions = this.filterRecommendations(query);
            console.log(suggestions, 'suggestions');
            suggestions = suggestions.slice(0, 35);
            this.setData({ suggestions: suggestions });
        }
        else {
            // this.setData({ offlineSuggestions: [], onlineSuggestions: [] });
            this.setData({ suggestions: [] });
        }
        // 调用封装好的方法，设置字段B的显示逻辑
        this.checkAndShowSuggestion(query);
    },
    //清除query
    onClearSearch: function () {
        var _this = this;
        this.setData({
            query: '',
            showSuggestion: false,
            suggestions: ''
        }, function () {
            // 由于setData是异步操作，如果立刻获取可能还是旧值，所以在这个回调函数中打印确保是更新后的值
            console.log(_this.data.showSuggestion); // 应该打印出 false
        });
    },
    // 处理点击推荐项
    onClickRecommendation: function (event) {
        var query = event.currentTarget.dataset.item.query;
        var currentTab = event.currentTarget.dataset.item.currentTab;
        var text = event.currentTarget.dataset.item.text;
        this.queryInfos(query, currentTab, text);
        // 这里可以处理点击事件，比如导航到相应的页面
    },
    //处理搜索发现
    refreshDiscoveries: function () {
        this.setData({
            displayDiscoveries: this.getRandomDiscoveries(this.data.SuggestedSearches)
        });
    },
    onClickDiscover: function (event) {
        var query = event.currentTarget.dataset.item.query;
        var currentTab = event.currentTarget.dataset.item.currentTab;
        var text = event.currentTarget.dataset.item.text;
        this.queryInfos(query, currentTab, text);
    },
    // 一个封装好的方法，用以设置建议的可见性和内容
    checkAndShowSuggestion: function (query) {
        var matchingItem = this.data.suggestionMapping.find(function (item) { return item.fieldA === query; });
        if (matchingItem) {
            //在setData之前打印
            this.setData({
                suggestionText: matchingItem.fieldB,
                suggestionLink: matchingItem.link,
                showSuggestion: true
            });
        }
        else {
            //清除suggestion相关状态
            this.setData({
                showSuggestion: false,
                suggestionText: '',
                suggestionLink: ''
            });
        }
    },
    //跳转逻辑
    onSuggestionTap: function () {
        // 使用数据中保存的链接进行跳转
        var suggestionLink = this.data.suggestionLink;
        if (suggestionLink) {
            __MOR_API__.navigateTo({ url: suggestionLink });
        }
    },
    //搜索逻辑，跳转页面并且传参
    queryInfos: function (query, currentTab, text) {
        if (currentTab === void 0) { currentTab = '0'; }
        if (text === void 0) { text = ''; }
        console.log('query:', query, 'currentTab:', currentTab, text);
        if (!text) {
            text = query;
        }
        __MOR_API__.navigateTo({
            url: "/pages/result/result?query=" + encodeURIComponent(query) + "&currentTab=" + currentTab + "&text=" + encodeURIComponent(text)
        });
        // 通常搜索后分清联想词列表
        this.setData({ suggestions: [] });
        // 调用更新搜索历史的方法
        this.updateQueryHistory(query, currentTab, text);
    },
    handleSearch: function (query, currentTab, text) {
        // 检查输入(query)是否为空
        // if (!query) {
        //   // 如果query为空，则显示一个提示信息告知用户输入不能空
        //   my.alert({
        //     title: '提示',
        //     content: '请输入搜索关键词',
        //   });
        //   return;
        // }
        console.log(query, 'query-配置的');
        // 在suggestionMapping数组中查找匹配项
        var matchingItem = this.data.suggestionMapping.find(function (item) { return item.fieldA === query; });
        console.log(matchingItem, 'matchingItem');
        if (matchingItem) {
            // 如果找到匹配项，导航到matchingItem指定的URL
            __MOR_API__.navigateTo({
                url: matchingItem.link
            });
        }
        else {
            // 如果没有找到匹配项，执行查询Infos逻辑显示搜索结果
            this.queryInfos(query, currentTab, text);
        }
        // 更新查询历史记录，可能会将query加入到某个存储搜索历史的数组
    },
    getRandomDiscoveries: function (discoveries) {
        // 假设我们获取5个随机的搜索发现
        var randomDiscoveries = [];
        var copyDiscoveries = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], discoveries, true);
        var count = Math.min(6, copyDiscoveries.length);
        for (var i = 0; i < count; i++) {
            var randomIndex = Math.floor(Math.random() * copyDiscoveries.length);
            randomDiscoveries.push(copyDiscoveries[randomIndex]);
            copyDiscoveries.splice(randomIndex, 1); // 删除已经选中的元素，防止重复
        }
        return randomDiscoveries;
    },
    //提交按钮
    onSubmitSearch: function (e) {
        var query = e.detail.value.trim();
        var searchQuery = query || this.data.currentPlaceholder; // 如果 query 为空，使用默认占位符
        console.log('query', query);
        var currentTab = this.data.currentTab;
        var text = this.data.currentPlaceholder;
        // this.handleSearch(searchQuery,currentTab,text);
        if (query) {
            // 用户输入了 query，使用用户输入的值进行搜索
            this.handleSearch(searchQuery);
        }
        else {
            // 用户没有输入 query，使用 currentPlaceholder 并传递当前的 currentTab 和 currentText
            var query_1 = this.data.currentQuery;
            this.handleSearch(query_1, currentTab, text);
            console.log(query_1, currentTab, text, 'currentTab-onSubmitSearch');
        }
    },
    // 更新历史搜索记录
    updateQueryHistory: function (query, currentTab, text) {
        if (currentTab === void 0) { currentTab = 0; }
        if (text === void 0) { text = ''; }
        console.log('updateQueryHistory:', query, currentTab, text); // 调试打印，确保参数接收
        if (!query) {
            return;
        }
        var queryHistoryArr = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], this.data.queryHistoryArr, true);
        var existingIndex = queryHistoryArr.findIndex(function (item) { return item.query === query; });
        if (existingIndex !== -1) {
            queryHistoryArr.splice(existingIndex, 1);
        }
        // 当 currentTab 为默认值（没有值时），用 query 填充 text
        if (currentTab === '0') {
            text = query;
        }
        var app = getApp();
        var newItem = { query: query, currentTab: currentTab, text: text };
        console.log('New History Item:', newItem); // 调试打印新增项
        var newLen = queryHistoryArr.unshift(newItem);
        if (newLen > 50) {
            queryHistoryArr.pop();
        }
        this.setData({ queryHistoryArr: queryHistoryArr });
        app.globalData.queryHistoryArr = queryHistoryArr;
        __MOR_API__.setStorage({
            key: 'queryHistory',
            data: queryHistoryArr,
        });
    },
    //从历史记录里搜索
    onSearchHistory: function (e) {
        var item = e.currentTarget.dataset.item;
        // const tab = e.currentTarget.dataset.item.tab;
        console.log(item, 'item');
        var query = item.query;
        var currentTab = item.currentTab;
        var text = item.text;
        this.queryInfos(query, currentTab, text);
    },
    clearQueryHistory: function () {
        // 清除本地存储中的搜索历史记录
        __MOR_API__.removeStorageSync({ key: 'queryHistory' });
        // 更新 data 中的搜索历史状态，如果需要在页面上响应显示
        this.setData({
            queryHistoryArr: [] // 假设这是页面 data 中用来存储搜索历史的数组
        });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/search/search.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=search.js.map