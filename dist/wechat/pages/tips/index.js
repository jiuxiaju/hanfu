"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/tips/index"],{

/***/ "./pages/tips/index.ts":
/*!*****************************!*\
  !*** ./pages/tips/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:18
 * @LastEditors: 兼爱
 * @Description:
 * @FilePath: /hanfu/src/components/shop/online/online.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    data: {
        buttons: []
    },
    didMount: function () {
        var _this = this;
        wx.cloud.callFunction({
            // 云函数名称
            name: 'tips',
            // 传给云函数的参数
        }).then(function (res) {
            // 处理云函数成功返回的结果
            console.log("云函数调用成功：", res);
            var result = res.result; // 这是云函数返回的数据
            console.log(result, '云函数调用成功：-data');
            _this.setData({
                buttons: result.data,
                description: result.description
            });
        });
    },
    methods: {
        handlePopup: function (e) {
            var _this = this;
            var item = e.currentTarget.dataset.item;
            this.setData({
                cur: item,
            }, function () {
                _this.setData({ visible: true });
            });
        },
        onVisibleChange: function (e) {
            console.log('visiblevisiblevisiblevisibleddd');
            this.setData({
                visible: e.detail.visible,
            });
        },
        handleButtonTap: function (e) {
            var _a = e.currentTarget.dataset, type = _a.type, appId = _a.appId, path = _a.path, extraData = _a.extraData;
            if (type === 'external') {
                wx.openEmbeddedMiniProgram({
                    appId: appId,
                    path: path,
                    extraData: extraData,
                    success: function (res) {
                        console.log('跳转成功', res);
                    },
                    fail: function (err) {
                        console.error('跳转失败', err);
                    }
                });
            }
            else if (type === 'internal') {
                wx.navigateTo({
                    url: path
                });
            }
        }
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/tips/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map