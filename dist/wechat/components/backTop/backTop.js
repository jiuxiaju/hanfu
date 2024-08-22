(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/backTop/backTop"],{

/***/ "./components/backTop/backTop.js":
/*!***************************************!*\
  !*** ./components/backTop/backTop.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var __MOR_COMPONENT__ = (__webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js").createComponent);

"use strict";
__MOR_COMPONENT__({
    properties: {
        scrollTop: {
            type: Number,
            value: 0,
            observer: function (newVal) {
                console.log('back-top 组件收到新的 scrollTop 值：', newVal);
            }
        },
        // 新增属性示例
        customProperty: {
            type: String,
            value: '默认值'
        },
        visibilityHeight: {
            type: Number,
            value: 0, // 默认值，也可以通过父组件传递
        },
    },
    data: {
        backTopTheme: 'round/',
        backTopText: '返回顶部',
        someScrollTopValue: 0,
        visibilityHeight: 0,
    },
    methods: {
        onToTop: function () {
            // 触发父组件的 handleToTop 方法，可以选择传递数据
            this.triggerEvent('to-top', { scrollTop: this.properties.scrollTop });
            console.log(this.properties.scrollTop, 'sss');
            console.log('wozai');
        },
    },
    lifetimes: {
        attached: function () {
            console.log('组件加载成功');
            // 打印自定义属性值
            console.log('back-top 组件 attach 阶段 scrollTop 值：', this.properties.scrollTop);
        }
    },
}, "a");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/backTop/backTop.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=backTop.js.map