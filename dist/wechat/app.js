"use strict";
require('./mor.i.js');
(wx["mor_modules"] = wx["mor_modules"] || []).push([["app"],{

/***/ "./app.ts":
/*!****************!*\
  !*** ./app.ts ***!
  \****************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aApp)({
    globalData: {
        placeholderWords: [{
                query: "搜索推荐词...",
                updated: false,
                text: '',
                currentTab: ''
            },],
        queryHistoryArr: [],
        dataReady: false,
        dataReadyCallback: null
    },
    onLaunch: function () {
        var _this = this;
        console.log("🚀 ~ file: app.ts:39 ~ onLaunch ~ onLaunch:");
        this.initCloud();
        this.updatePlaceholderWord();
        this.loadQueryHistory().then(function () {
            console.log('我loadQueryHistory执行完了');
            // 调用 updatePlaceholderWord 更新占位词
            _this.updatePlaceholderWord();
        }),
            // 演示如何获取 queryHistoryArr
            console.log('初始化时的 queryHistoryArr:', this.globalData.queryHistoryArr);
        this.globalData.sysinfo = wx.getSystemInfoSync();
        var updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(function () {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: function (res) {
                    if (res.confirm) {
                        // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    }
                }
            });
        });
        updateManager.onUpdateFailed(function () {
            // 新的版本下载失败
            wx.showModal({
                title: '更新提示',
                content: '新版本下载失败',
                showCancel: false
            });
        });
    },
    globalData: {
        sysinfo: {},
    },
    loadQueryHistory: function () {
        // 获取本地存储的历史记录
        try {
            var queryHistoryArr = wx.getStorageSync('queryHistory') || [];
            this.globalData.queryHistoryArr = queryHistoryArr;
        }
        catch (e) {
            console.error("Failed to load query history:", e);
        }
    },
    saveQueryHistory: function (queryHistoryArr) {
        // 保存搜索历史记录到本地存储
        try {
            wx.setStorageSync('queryHistory', queryHistoryArr);
            this.globalData.queryHistoryArr = queryHistoryArr;
        }
        catch (e) {
            console.error("Failed to save query history:", e);
        }
    },
    updatePlaceholderWord: function () {
        var _this = this;
        var queryHistoryArr = this.globalData.queryHistoryArr;
        console.log(queryHistoryArr, 'queryHistoryArr');
        wx.cloud.callFunction({
            name: 'getPlaceholderWords',
            data: {
                queryHistoryArr: queryHistoryArr
            },
            success: function (res) {
                var result = res.result;
                if (Array.isArray(result) && result.length > 0) {
                    _this.globalData.placeholderWords = result.map(function (word) { return ((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, word), { updated: true })); });
                    // 标记数据已准备好，并调用回调函数
                    _this.globalData.dataReady = true;
                    if (_this.globalData.dataReadyCallback) {
                        _this.globalData.dataReadyCallback();
                    }
                }
                // 打印完整的 placeholderWord
                console.log('更新后的 placeholderWord:', _this.globalData.placeholderWords);
            },
            fail: function (error) {
                console.error('Cloud function call failed: ', error);
            }
        });
    },
    // 定义全局方法获取路径和参数
    getCurrentPagePathWithArgs: function () {
        var pages = getCurrentPages(); // 获取加载的页面
        var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
        var url = "/" + currentPage.route; // 当前页面url
        // 获取页面参数
        var options = currentPage.options;
        var queryParameters = Object.keys(options)
            .map(function (key) { return key + "=" + options[key]; })
            .join('&');
        return url + "?" + queryParameters;
    },
    // 定义全局方法生成分享信息
    generateShareInfo: function () {
        var _this = this;
        return new Promise(function (resolve) {
            var pathWithArgs = _this.getCurrentPagePathWithArgs(); // 获取当前页面的路径和参数
            resolve({
                title: '九霞裾',
                path: pathWithArgs,
                // imageUrl: '/path/to/share-image.jpg' // 分享的图片路径
            });
        });
    },
    initCloud: function () {
        wx.cloud.init({
            env: 'jiuxiaju-7ghefl5n6fc39431',
        });
        console.log("🚀 ~ file: app.ts:47 ~ initCloud ~ wx.cloud:", wx.cloud);
    },
    /**
     * 转换富文本text
     * @param text
     * @returns
     */
    convertRichText: function (text) {
        if (text && typeof text === 'string') {
            // 处理图片宽度
            return text.replace(/<(img).*?(\/>|<\/img>)/g, function (mats) {
                if (mats.indexOf('style') < 0) {
                    return mats.replace(/<\s*img/, '<img style="max-width:100%;height:auto;"');
                }
                else {
                    return mats.replace(/style=("|')/, 'style=$1max-width:100%;height:auto;');
                }
            });
        }
        return text;
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./app.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=app.js.map