"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/home/index"],{

/***/ "./pages/home/index.ts":
/*!*****************************!*\
  !*** ./pages/home/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./services/index.ts");
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);




(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        swiperList: [],
        activityList: [],
        recommendArticles: [],
        isLoadingSwiper: true,
        titleBarHeight: 0,
        isLoadingContent: true,
        statusBarHeight: 0,
        currentTab: '',
        text: '',
        currentPlaceholder: '汉服是什么',
        currentQuery: '',
        currentText: '',
        stickyProps: {
            offsetTop: 38,
        },
        swiperData: [],
        tabs: [],
        placeholder: "",
        placeholderWords: [
            { query: "汉服", text: "汉服活动推荐", currentTab: "5" },
            { query: "北京", text: "北京的汉服实体店推荐", currentTab: "1" },
            { query: "汉服运动", text: "汉服运动是什么", currentTab: "0" },
            { query: "汉服是什么", text: "汉服是什么" }
        ],
        articleList: [],
        isGlobalDataReady: false,
        containerHeight: 0,
        searchInputHeight: 0,
        searchButtonHeight: 0,
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }],
        rowColsImage: [{ height: '192px', width: '100%', type: 'rect' }],
        currentSwiperIndex: 0,
        visible: true, config: {
            "activity_set": {
                "fields": ["address",],
                "displayValuesOnly": ["tags", "seasons"],
                "fieldLabels": { "address": "地址" }
            }
        },
        suggestionMapping: []
    },
    onLoad: function () {
        var _this = this;
        var that = this;
        this.getActivities();
        wx.cloud.callFunction({
            name: 'suggestion',
            success: function (res) {
                // 把获取到的数组赋值给页面数据中的mockData
                var result = res.result;
                console.log(result, 'result');
                that.setData({
                    suggestionMapping: result.simpleArray
                });
            },
            fail: function (error) {
                console.error('Cloud function call failed: ', error);
            }
        });
        var app = getApp();
        this.setDataFromDefault();
        this.waitForGlobalData().then(function () {
            _this.setDataFromGlobalData();
            _this.setPlaceholderWord();
            _this.setData({ isGlobalDataReady: true });
        }).catch(function (error) {
            console.error('全局数据加载失败:', error);
        });
        this.startPlaceholderUpdateTimer(); // 启动定期更新定时器
        //判断场景值
        var launchOptions = wx.getLaunchOptionsSync();
        var scene = launchOptions.scene;
        // 检查是否为场景值1089（从其他小程序返回）
        if (scene !== 1089) {
            // 不是从其他小程序返回，可以显示`t-notice-bar`
            this.setData({ visible: true });
            // 设置定时器3秒后隐藏`t-notice-bar`
            setTimeout(function () {
                _this.setData({ visible: false });
            }, 3000);
        }
        else {
            // 是从其他小程序返回的场景，不显示`t-notice-bar`
            this.setData({ visible: false });
        }
        // 获取手机基础信息(状态栏高度)
        var statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
        var titleBarHeight = this.getTitleBarHeight(statusBarHeight);
        this.setData({
            titleBarHeight: titleBarHeight,
            statusBarHeight: statusBarHeight,
        }, function () {
            console.log("状态栏高度（statusBarHeight）:", _this.data.statusBarHeight);
            console.log("标题栏高度（titleBarHeight）:", _this.data.titleBarHeight);
        });
        // 获取广告位图片
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/home/getBannerImgs').then(function (data) {
            _this.setData({
                swiperList: data.map(function (o) { return o.url; }),
                swiperData: data,
                isLoadingSwiper: false
            });
            console.log(data, 'dat1a');
        });
        wx.cloud.callFunction({
            name: 'onsearchArticle',
            success: function (res) {
                // 把获取到的数组赋值给页面数据中的mockData
                var result = res.result;
                console.log(result, 'result');
                that.setData({
                    articleList: result.data,
                    config: result.config
                });
                that.processData(that.data.articleList);
            },
            fail: function (error) {
                console.error('Cloud function call failed: ', error);
            }
        });
    },
    startPlaceholderUpdateTimer: function () {
        var _this = this;
        setInterval(function () {
            if (_this.data.isGlobalDataReady) {
                _this.setPlaceholderWord();
            }
            else {
                console.log('使用本地默认占位符');
                _this.setDataFromDefault();
            }
        }, 5000);
    },
    setDataFromDefault: function () {
        this.setPlaceholderWord();
    },
    waitForGlobalData: function () {
        var app = getApp();
        return new Promise(function (resolve, reject) {
            var checkInterval = setInterval(function () {
                if (app.globalData.dataReady) {
                    clearInterval(checkInterval);
                    resolve();
                }
            }, 500);
            setTimeout(function () {
                clearInterval(checkInterval);
                if (app.globalData.dataReady) {
                    resolve();
                }
                else {
                    reject(new Error('全局数据加载超时'));
                }
            }, 10000);
        });
    },
    setDataFromGlobalData: function () {
        var app = getApp();
        var placeholderWords = app.globalData.placeholderWords || [];
        if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
            this.setData({
                queryHistoryArr: app.globalData.queryHistoryArr || [],
                placeholderWords: placeholderWords
            });
            console.log('页面更新时获得的 placeholderWords:', this.data.placeholderWords);
            this.setPlaceholderWord();
        }
        else {
            console.error('全局数据 placeholderWords 无效或未初始化');
        }
    },
    setPlaceholderWord: function () {
        var placeholderWords = this.data.placeholderWords;
        if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
            var randomIndex = Math.floor(Math.random() * placeholderWords.length);
            var selectedPlaceholder = placeholderWords[randomIndex];
            if (selectedPlaceholder) {
                this.setData({
                    placeholder: selectedPlaceholder.text,
                    currentQuery: selectedPlaceholder.query,
                    currentText: selectedPlaceholder.text,
                    currentTab: selectedPlaceholder.currentTab,
                    currentPlaceholder: selectedPlaceholder.text,
                });
            }
            else {
                console.error('选中的 placeholder 无效');
            }
        }
        else {
            console.error('placeholderWords 数据无效或为空');
        }
    },
    // 处理数据，将推荐文章和按artype分开的文章分开，不处理数据内容
    processData: function (data) {
        var recommendArticles = [];
        var artypeArticlesMap = {};
        // 定义所有类型和标签
        var labels = ['推荐', '穿搭', '妆造', '文学', '六艺', '其他'];
        var artypeValues = ['recommend', '穿搭', '妆造', '文学', '六艺', '其他'];
        // 初始化每个artype的类别
        artypeValues.slice(1).forEach(function (artype) {
            artypeArticlesMap[artype] = [];
        });
        // 分类数据 - 处理推荐
        data.forEach(function (article) {
            if (article.recommend) {
                recommendArticles.push(article);
            }
        });
        // 分类数据 - 处理具体类型
        data.forEach(function (article) {
            var artype = article.artype;
            if (artypeValues.includes(artype)) {
                artypeArticlesMap[artype].push(article);
            }
            else {
                console.warn("Unrecognized artype: " + artype, article);
            }
        });
        // 生成 Tabs 数据
        var tabs = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__spreadArray)([
            { label: '推荐', value: '0', articles: recommendArticles }
        ], artypeValues.slice(1).map(function (artype, index) {
            var label = labels[index + 1];
            return {
                label: label,
                value: artype,
                articles: artypeArticlesMap[artype] || [] // 确保无数据时为[]
            };
        }), true);
        this.setData({
            tabs: tabs,
            isLoadingContent: false
        });
    },
    getActivities: function () {
        var _this = this;
        wx.cloud.callFunction({
            name: 'getActivities', // 云函数名称
        }).then(function (res) {
            var result = res.result; // 云函数返回的结果
            console.log(result, 'result');
            // 更新组件的 state
            _this.setData({
                activityList: result.data,
                config: res.result.config,
                isLoadingContent: false
            });
            // 打印处理后的数据列表
            console.log('Updated Info List:', _this.data.activityList);
        }).catch(function (error) {
            console.error('Error calling cloud function:', error);
            // this.setData({ showLoading: false }); // 处理错误时, 隐藏加载动画
        });
    },
    // 计算titleBar的高度，微信小程序无法自动提供
    getTitleBarHeight: function (statusBarHeight) {
        try {
            var _a = wx.getMenuButtonBoundingClientRect(), top = _a.top, height = _a.height;
            return (top - statusBarHeight) * 2 + height;
        }
        catch (error) {
            return 48; // 默认标题栏高度
        }
    },
    //分享给好友
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
    //转发到朋友圈
    onShareTimeline: function () {
        return {
            title: '快来看看',
        };
    },
    //悬浮指引点击事件，点击取消
    click: function (e) {
        var trigger = e.detail.trigger;
        console.log("click on the " + trigger + " area");
        this.setData({
            visible: false,
        });
    },
    //组件库轮播图有bug，
    onTapSwiper: function (e) {
        var index = e.currentTarget.dataset.index; // 获取点击的图片索引
        var _a = this.data.swiperData[index], jump = _a.jump, jump_link = _a.jump_link, appId = _a.appId, extraData = _a.extraData;
        // console.log('点击的轮播图数据:', this.data.swiperData[index])
        switch (jump) {
            case '1':
                // 这里假设 jump_link 已经是一个有效的相对路径
                wx.navigateTo({
                    url: "" + jump_link,
                    fail: function () {
                        wx.navigateTo({ url: '/pages/home/index' });
                    },
                });
                break;
            case '2':
                // 这里假设 appId 和 path 已经在 swiperData 中定义
                wx.openEmbeddedMiniProgram({
                    appId: appId,
                    path: jump_link,
                    extraData: extraData,
                    success: function (res) {
                        console.log('跳转成功', res);
                    },
                    fail: function (err) {
                        console.error('跳转失败', err);
                        wx.showToast({
                            title: '跳转失败，请稍后再试',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                });
            default:
                // 如果没有定义跳转逻辑，可以在这里处理
                break;
        }
    },
    handleItemClick: function (e) {
        var item = e.detail;
        // 判断 item.source，根据两种情况分别跳转页面
        if (item.source === 'activity_set') {
            // 跳转到页面1
            __MOR_API__.navigateTo({
                url: "/pages/activity-list/detail/index?activityId=" + item._id,
            });
        }
        else if (item.source === 'article') {
            // 跳转到页面2
            __MOR_API__.navigateTo({
                url: "/pages/article/detail?articleId=" + item._id,
            });
        }
    },
    //对富文本进行处理
    getRitch: function (rich) {
        if (!rich) {
            return '';
        }
        var richClone = rich.replace(/<[^>]*>/g, '');
        return richClone;
    },
    // 跳转页面的统一函数
    jump2Page: function (e) {
        var pathKey = e.currentTarget.dataset.path; // 获取key值
        // const routePath = this.data.routeMap[pathKey]; // 根据key获取路径
        console.log(pathKey, 'pathKey', e.currentTarget);
        if (pathKey === 'sports') {
            // 如果 pathKey 是 'sports'，跳转到 sports 页面
            __MOR_API__.navigateTo({
                url: '/pages/sports/index'
            });
        }
        else if (pathKey === 'population-list') {
            __MOR_API__.navigateTo({
                url: '/pages/population-list/index/index'
            });
        }
        else {
            __MOR_API__.navigateTo({
                url: '/pages/activity-list/index/index'
            });
        }
    },
    // 跳转到活动详情页面
    jump2ActivityDetailPage: function (e) {
        var _id = e.currentTarget.dataset.item._id;
        __MOR_API__.navigateTo({
            url: "/pages/activity/detail?activityId=" + _id,
        });
    },
    // 跳转到文章详情页面
    jump2ArticleDetailPage: function (e) {
        var _id = e.currentTarget.dataset.item._id;
        __MOR_API__.navigateTo({
            url: "/pages/article/detail?articleId=" + _id,
        });
    },
    onJump2Search: function () {
        __MOR_API__.navigateTo({ url: '/pages/search/search' });
    },
    onSearchButtonClick: function () {
        var text = this.data.currentPlaceholder; // 如果 query 为空，使用默认占位符
        var currentTab = this.data.currentTab;
        var query = this.data.currentQuery;
        console.log(query, currentTab, text);
        this.handleSearch(query, currentTab, text);
    },
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
    },
    handleSearch: function (query, currentTab, text) {
        // 检查输入(query)是否为空
        // 在suggestionMapping数组中查找匹配项
        var matchingItem = this.data.suggestionMapping.find(function (item) { return item.fieldA === query; });
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
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/home/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map