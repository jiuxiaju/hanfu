"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/sports/index"],{

/***/ "./pages/sports/index.ts":
/*!*******************************!*\
  !*** ./pages/sports/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./services/index.ts");


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        articles: {},
    },
    onLoad: function () {
        var _this = this;
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/sports/getSports').then(function (articles) {
            console.log('=====  articles', articles);
            _this.setData({ articles: articles[0] });
        });
    },
    //分享给好友
    onShareAppMessage: function () {
        var promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve({
                    title: '九霞裾'
                });
            }, 20);
        });
        return {
            title: '九霞裾',
            path: 'pages/shop/shop',
            promise: promise
        };
    },
    //转发到朋友圈
    onShareTimeline: function () {
        return {
            title: '快来看看'
        };
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/sports/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map