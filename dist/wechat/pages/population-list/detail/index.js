"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/population-list/detail/index"],{

/***/ "./pages/population-list/detail/index.ts":
/*!***********************************************!*\
  !*** ./pages/population-list/detail/index.ts ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);


// 获取全局 app 实例
var app = getApp();
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        current: 0,
        duration: 600,
        interval: 5000,
        swiperList: [],
        rowColsImage: [{ height: '400px', width: '80%', type: 'rect' }],
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }],
        isLoadingSwiper: true,
        isLoadingContent: true
    },
    onLoad: function (options) {
        console.log('页面参数 options:', options);
        var PopulationById = options.PopulationById, style = options.style;
        console.log(options, '');
        console.log('PopulationById:', PopulationById); // 打印的内容会是字符串
        console.log('style:', style); // 打印的内容会是字符串
        if (PopulationById) {
            console.log(PopulationById, 'PopulationById-PopulationById');
            this.setData({ PopulationById: PopulationById, style: style }); // 设置 PopulationById 到数据中
            this.PopulationById = PopulationById;
            this.style = style;
            this.getArticleDetail();
        }
        else {
            console.log(style, 'style-style');
            this.setData({ style: style }); // 设置 PopulationById 到数据中
            this.style = style;
            this.getArticleDetail();
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
    getArticleDetail: function () {
        var _this = this;
        var _a = this.data, PopulationById = _a.PopulationById, style = _a.style; // 访问数据中的 PopulationById 和 styleName
        console.log(style, 'style');
        wx.cloud.callFunction({
            // 云函数名称
            name: 'population-detail',
            // 传给云函数的参数
            data: {
                PopulationById: PopulationById,
                style: style
            },
        }).then(function (res) {
            var result = res.result;
            var data = result.data[0];
            _this.setData((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, data), { swiperList: data.images, product: data, config: result.config, detail: data.detail, isLoadingSwiper: false, isLoadingContent: false }));
        });
    },
    previewImage: function (event) {
        var index = event.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.swiperList[index],
            urls: this.data.swiperList // 需要预览的图片http链接列表
        });
    },
    onChange: function (e) {
        var _a = e.detail, current = _a.current, source = _a.source;
        this.setData({
            current: current,
        });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/population-list/detail/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map