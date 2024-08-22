"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/custom-navigation-bar/custom-navigation-bar"],{

/***/ "./components/custom-navigation-bar/custom-navigation-bar.ts":
/*!*******************************************************************!*\
  !*** ./components/custom-navigation-bar/custom-navigation-bar.ts ***!
  \*******************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    data: {
        titleBarHeight: 0,
        statusBarHeight: 0,
        focus: false,
    },
    props: {
        showBackIcon: false,
        onSearch: function (value) { },
    },
    didMount: function () {
        var systemInfo = __MOR_API__.getSystemInfoSync();
        var titleBarHeight = this.getTitleBarHeight(systemInfo.statusBarHeight);
        var statusBarHeight = systemInfo.statusBarHeight;
        // 设置数据
        this.setData({
            titleBarHeight: titleBarHeight,
            statusBarHeight: statusBarHeight,
        });
        // 如果是在搜索页面，则search组件聚焦
        if (this.$page.route === 'pages/search/search') {
            this.setData({
                focus: true,
            });
        }
    },
    didUpdate: function () { },
    didUnmount: function () { },
    methods: {
        // 计算titleBar的高度，wx无法自动提供
        getTitleBarHeight: function (statusBarHeight) {
            try {
                var _a = wx.getMenuButtonBoundingClientRect(), top = _a.top, height = _a.height;
                return (top - statusBarHeight) * 2 + height;
            }
            catch (error) {
                return 48;
            }
        },
        onJump2Search: function () {
            console.log('onJump2Search triggered');
            if (this.$page.route !== 'pages/search/search') {
                __MOR_API__.navigateTo({ url: '/pages/search/search' });
            }
        },
        onNavigateBack: function (event) {
            console.log('onNavigateBack triggered');
            // 阻止事件冒泡
            if (event && event.stopPropagation) {
                event.stopPropagation();
            }
            __MOR_API__.navigateBack();
        },
        onSearch: function (e) {
            this.props.onSearch(e.detail.value);
        },
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/custom-navigation-bar/custom-navigation-bar.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=custom-navigation-bar.js.map