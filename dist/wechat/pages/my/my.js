"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/my/my"],{

/***/ "./pages/my/my.ts":
/*!************************!*\
  !*** ./pages/my/my.ts ***!
  \************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


// 获取全局 app 实例
var app = getApp();
var jumpId = '962d008f65104fda03efc6ac35f7769b';
var path = "/pages/my/center?id=" + jumpId;
var jumpList = [
    {
        path: path,
        text: '关于我们',
        key: 'about_us',
    },
    {
        path: path,
        text: '常见问题',
        key: 'FAQ',
    },
    {
        path: path,
        text: '更新日志',
        key: 'log',
    },
    {
        path: 'suggesst',
        text: '意见反馈',
        key: 'suggest',
    },
];
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        jumpList: jumpList,
        tIconClass: ['my-icon'],
        userInfo: {},
    },
    onLoad: function () {
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
            path: '',
            promise: promise
        };
    },
    jump2Page: function (e) {
        var _a = e.currentTarget.dataset || {}, path = _a.path, detailkey = _a.detailkey;
        if (detailkey === 'suggest') {
            __MOR_API__.openEmbeddedMiniProgram({
                appId: "wx8abaf00ee8c3202e",
                extraData: {
                    // 产品ID
                    id: "612747",
                    // 自定义参数，具体参考文档
                    customData: {}
                }
            });
        }
        else {
            __MOR_API__.navigateTo({
                url: path + "&detailKey=" + detailkey,
                fail: function () {
                    __MOR_API__.navigateTo({ url: '/pages/pageNotFound/pageNotFound' });
                }
            });
        }
    },
    //点击头像区域，触发登陆流程。
    onTapLogin: function () {
        var _this = this;
        // 调用 wx.login 获取临时登录凭证 (code)
        // wx.login({
        //   success: loginRes => {
        //     if (loginRes.code) {
        //       // 调用云函数进行登录
        //       wx.cloud.callFunction({
        //         name: 'login',
        //         data: { code: loginRes.code },
        //         success: res => {
        //           // 这里得到云函数返回的结果，包括用户的 openId 等
        //           console.log('云函数登录成功：', res);
        //         },
        //         fail: err => {
        //           console.error('云函数调用失败', err);
        //         }
        //       });
        //     } else {
        //       console.error('wx.login 失败', loginRes.errMsg);
        //     }
        //   },
        //   fail: err => {
        //     console.error('wx.login 接口调用失败', err);
        //   }
        // });
        console.log('获取');
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: function (res) {
                console.log(res.userInfo);
                _this.setData({
                    userInfo: res.userInfo,
                });
            }
        });
    },
    onTapLogo: function () {
        var _this = this;
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
        // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        console.log('获取');
        wx.getUserProfile({
            desc: '用于完善会员资料',
            success: function (res) {
                console.log(res.userInfo);
                _this.setData({
                    userInfo: res.userInfo,
                });
            }
        });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/my/my.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=my.js.map