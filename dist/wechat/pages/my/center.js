"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/my/center"],{

/***/ "./pages/my/center.ts":
/*!****************************!*\
  !*** ./pages/my/center.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../services */ "./services/index.ts");
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);



// 获取全局 app 实例
var app = getApp();
var titleMap = {
    about_us: '关于我们',
    FAQ: '常见问题',
    log: '更新日志',
};
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        title: '',
        detail: '',
    },
    onLoad: function (options) {
        var id = options.id, detailKey = options.detailKey;
        if (id && detailKey) {
            var title = titleMap[detailKey] || '九霞裾';
            __MOR_API__.setNavigationBar({
                title: title,
            });
            this.setData({
                title: title,
            });
            this.getDetail({ detailKey: detailKey, id: id });
        }
    },
    getDetail: function (params) {
        var _this = this;
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/my/center/detail', params).then(function (res) {
            var _a = res.data, data = _a === void 0 ? {} : _a, success = res.success;
            if (data && success) {
                console.log("🚀 ~ file: detail.ts:28 ~ get ~ detail:", data);
                var convertDetail = app.convertRichText(data.detail);
                _this.setData({
                    detail: convertDetail,
                });
            }
        });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/my/center.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=center.js.map