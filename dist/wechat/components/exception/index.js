"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/exception/index"],{

/***/ "./components/exception/index.ts":
/*!***************************************!*\
  !*** ./components/exception/index.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

/* unused harmony export ERROR_TYPE */
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var _a;

var ERROR_TYPE = {
    NO_DATA: 1,
    NETWORK: 2,
};
var ERROR_MSG = (_a = {},
    _a[ERROR_TYPE.NO_DATA] = '出错啦，发个小呆，请重试',
    _a[ERROR_TYPE.NETWORK] = '网络异常，请重试',
    _a);
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    props: {
        errImg: '',
        errType: ERROR_TYPE.NO_DATA,
        message: ERROR_MSG[ERROR_TYPE.NO_DATA],
        onRefresh: function () { },
        btnText: '点击刷新',
    },
    methods: {
        onRefresh: function () {
            this.props.onRefresh();
        },
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/exception/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map