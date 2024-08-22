"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/index/index"],{

/***/ "./pages/shop/index/index.ts":
/*!***********************************!*\
  !*** ./pages/shop/index/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/*
 * @Author: 兼爱
 * @Date: 2023-09-18 20:49:48
 * @LastEditTime: 2023-11-15 03:05:57
 * @LastEditors: 兼爱
 * @Description:
 * @FilePath: /hanfu/src/pages/shop/shop.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

var ShopType;
(function (ShopType) {
    ShopType["offline"] = "offline";
    ShopType["online"] = "online";
})(ShopType || (ShopType = {}));
;
var tabList = [{
        key: ShopType.offline,
        label: '实体店',
    }, {
        key: ShopType.online,
        label: '网店'
    }];
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        tabList: tabList,
        filter: {},
        list: [],
        stickyProps: {},
        currentTab: ShopType.offline,
        showLoading: true,
        scrollTop: 0 // 保存滚动位置
    },
    onLoad: function () {
        var _this = this;
        setTimeout(function () {
            _this.setData({
                showLoading: false // 1.5秒后隐藏加载动画
            });
        }, 1000);
    },
    onTabsChange: function (e) {
        this.setData({
            currentTab: e.detail.value
        });
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
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/index/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map