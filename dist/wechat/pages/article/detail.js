"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/article/detail"],{

/***/ "./pages/article/detail.ts":
/*!*********************************!*\
  !*** ./pages/article/detail.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./services/index.ts");



// 获取全局 app 实例
var app = getApp();
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        headline: '',
        article: '',
        errConfig: {},
        read_count: 0,
    },
    onLoad: function (options) {
        var articleId = options.articleId;
        if (articleId) {
            this.articleId = articleId;
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
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/article/detail', { articleId: this.articleId }).then(function (res) {
            var _a = res.data, data = _a === void 0 ? {} : _a, success = res.success;
            var headline = data.headline, article = data.article, remainData = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__rest)(data, ["headline", "article"]);
            if (success && article) {
                _this.setData((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_2__.__assign)({ headline: headline, article: app.convertRichText(article) }, remainData), { errConfig: {} }));
                _this.updateArticleCReadNum();
            }
            else {
                var errConfig = {
                    errType: 1,
                };
                _this.setData({
                    errConfig: errConfig,
                });
            }
        });
    },
    onRefresh: function () {
        console.log('##### onrefresh');
        this.getArticleDetail();
    },
    /**
     * 更新阅读量
     * @param articleId
     */
    updateArticleCReadNum: function () {
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/article/updateArticleCReadNum', { articleId: this.articleId });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/article/detail.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=detail.js.map