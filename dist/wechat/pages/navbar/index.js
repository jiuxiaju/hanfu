(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/navbar/index"],{

/***/ "./pages/navbar/index.ts":
/*!*******************************!*\
  !*** ./pages/navbar/index.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var __MOR_COMPONENT__ = (__webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js").createComponent);

"use strict";
__MOR_COMPONENT__({
    properties: {
        title: {
            type: String,
            value: ''
        }
    },
    methods: {
        onBack: function () {
            wx.navigateBack();
        },
        onGoHome: function () {
            wx.reLaunch({
                url: '/pages/home/index',
            });
        },
    },
}, "a");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/navbar/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map