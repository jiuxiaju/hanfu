"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/activity-list/detail/index"],{

/***/ "./pages/activity-list/detail/index.ts":
/*!*********************************************!*\
  !*** ./pages/activity-list/detail/index.ts ***!
  \*********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../services */ "./services/index.ts");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! dayjs */ "../node_modules/_dayjs@1.11.11@dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_2__);




// 获取全局 app 实例
var app = getApp();
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        infoList: [],
        showOverlay: false,
        essentialInfo: [],
        sponsor: '',
        time: '',
        address: '',
    },
    onLoad: function (options) {
        this.getCurrentPagePathWithArgs();
        var activityId = options.activityId;
        if (activityId) {
            this.getActivityDetail(activityId);
        }
        ;
    },
    getCurrentPagePathWithArgs: function () {
        var pages = getCurrentPages(); // 获取加载的页面
        var currentPage = pages[pages.length - 1]; // 获取当前页面的对象
        var url = "/" + currentPage.route; // 当前页面url
        // 获取页面参数
        var options = currentPage.options;
        var queryParameters = Object.keys(options)
            .map(function (key) { return key + "=" + options[key]; })
            .join('&');
        var aa = url + "?" + queryParameters;
        console.log('aa', aa);
        return url + "?" + queryParameters;
    },
    showOverlay: function () {
        var _this = this;
        var _a, _b, _c;
        // 假设infoList是已经在data中或作为实例属性定义好的
        var infoList = this.data.infoList; // 或使用 this.infoList 如果infoList是实例属性
        // 从infoList数组中获取需要的数据
        var sponsor = ((_a = infoList.find(function (item) { return item.key === 'sponsor'; })) === null || _a === void 0 ? void 0 : _a.value) || '未知主办方';
        var time = ((_b = infoList.find(function (item) { return item.key === 'time'; })) === null || _b === void 0 ? void 0 : _b.value) || '未知时间';
        var address = ((_c = infoList.find(function (item) { return item.key === 'address'; })) === null || _c === void 0 ? void 0 : _c.value) || '未知地址';
        // 设置获取到的值以及显示覆盖层
        this.setData({
            sponsor: sponsor,
            time: time,
            address: address,
            showOverlay: true, // 显示覆盖层
        });
        console.log(time),
            // 设置3秒后自动隐藏覆盖层
            setTimeout(function () {
                _this.setData({
                    showOverlay: false, // 隐藏覆盖层
                });
            }, 40000); // 3000毫秒后执行
    },
    // 转发至好友
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
    },
    getActivityDetail: function (activityId) {
        var _this = this;
        console.log('我开始了1');
        (0,_services__WEBPACK_IMPORTED_MODULE_1__.get)('/activity/detail', { activityId: activityId }).then(function (res) {
            console.log('我开始了1');
            var _a = res.data, data = _a === void 0 ? {} : _a, success = res.success;
            if (data && success) {
                var acData = _this.handleDetailData(data);
                console.log("🚀 ~ file: detail.ts:28 ~ get ~ detail:", acData);
                _this.setData((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, acData));
            }
        });
    },
    handleTap: function () {
        this.showOverlay(); // 先调用 showOverlay
        //希望在点击的时候，海报先显示出来，然后保存。
    },
    handleDetailData: function (acData) {
        var startTime = acData.startTime, emdTime = acData.emdTime, address = acData.address, sponsor = acData.sponsor, tele = acData.tele;
        var startTimeFormat = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(startTime).format('YYYY-MM-DD HH:mm');
        var endTimeFormat = dayjs__WEBPACK_IMPORTED_MODULE_2___default()(emdTime).format('YYYY-MM-DD HH:mm');
        var infoList = [
            {
                value: sponsor,
                label: '主办方',
                key: 'sponsor',
            },
            {
                value: startTimeFormat + "-" + endTimeFormat,
                label: '活动时间',
                key: 'time',
            },
            {
                value: address,
                label: '活动地址',
                key: 'address',
            },
            {
                value: tele,
                label: '联系方式',
                key: 'tele',
            },
        ];
        return Object.assign(acData, {
            detail: app.convertRichText(acData.detail),
            infoList: infoList,
        });
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/activity-list/detail/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map