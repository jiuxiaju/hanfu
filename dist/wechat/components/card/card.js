"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/card/card"],{

/***/ "./components/card/card.ts":
/*!*********************************!*\
  !*** ./components/card/card.ts ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);

(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    props: {
        className: '',
        info: {},
        keyMap: {},
        onClick: function (info) { },
    },
    didMount: function () { },
    methods: {
        onTapCard: function () {
            console.log('=====  onTapCard');
            this.props.onClick(this.props.info);
        },
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/card/card.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=card.js.map