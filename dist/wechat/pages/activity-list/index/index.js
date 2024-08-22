"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/activity-list/index/index"],{

/***/ "./pages/activity-list/index/index.ts":
/*!********************************************!*\
  !*** ./pages/activity-list/index/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dayjs */ "../node_modules/_dayjs@1.11.11@dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _assets_area__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../assets/area */ "./assets/area.ts");
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);




// import area from './area'

// import { TRGNodeAny } from 'XrFrame/render-graph/RGNode'
// 获取全局 app 实例
var app = getApp();
function calculateStatus(startTime, endTime) {
    var now = dayjs__WEBPACK_IMPORTED_MODULE_1___default()();
    var start = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(startTime);
    var end = dayjs__WEBPACK_IMPORTED_MODULE_1___default()(endTime);
    if (now.isBefore(start)) {
        return '未开始'; // 活动尚未开始
    }
    else if (now.isAfter(end)) {
        return '已结束'; // 活动已经结束
    }
    else {
        return '进行中'; // 活动正在进行中
    }
}
var STATUS_KEY_MAP = {
    '已结束': 3,
    '未开始': 1,
    '进行中': 2,
};
(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        typeList: [
            {
                value: '',
                label: '所有类型',
            },
            {
                value: '1',
                label: '文化体验类',
            },
            {
                value: '2',
                label: '教育研习类',
            },
            {
                value: '3',
                label: '社交联谊类',
            },
        ],
        statusList: [
            {
                value: '',
                label: '所有状态',
            },
            {
                value: '未开始',
                label: '未开始',
            },
            {
                value: '进行中',
                label: '进行中',
            },
            {
                value: '已结束',
                label: '已结束',
            },
        ],
        showLoading: true,
        provinceList: [],
        filter: {
            type: '',
            status: '',
            area: ['', ''],
        },
        value: ['0', '0-0'],
        list: [],
        area: ['', ''],
        config: {
            "activity_set": {
                "fields": ["detail", "address"],
                "displayValuesOnly": ["detail"],
                "fieldLabels": { "address": "地址" }
            },
        },
        displayList: [],
        batchSize: 10,
        currentDisplayCount: 0,
        cardData: [],
        rowColsAvatar: [{ size: '100px', type: 'circle' }],
        rowColsImage: [{ size: '100px', type: 'rect' }],
        rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    },
    onLoad: function () {
        this.getArea();
        this.getActivityList();
        this.getCurrentPagePath();
    },
    //分享给好友
    onShareAppMessage: function () {
        this.getCurrentPagePath();
        var promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve({
                    title: '九霞裾'
                });
            }, 20);
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
    onScrollViewScroll: function (e) {
        var scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
        var scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
        var scrollViewHeight = 700; // scroll-view 的固定高度
        var triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
        // 检查是否接近底部，并触发数据加载
        if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
            console.log('接近底部，加载更多数据...');
            // this.loadMoreData();
            this.onScrollToLower();
        }
    },
    onScrollToLower: function () {
        // 当滑动到页面底部时触发
        console.log('我执行了');
        var _a = this.data, list = _a.list, displayList = _a.displayList, currentDisplayCount = _a.currentDisplayCount, batchSize = _a.batchSize;
        console.log(currentDisplayCount, 'currentDisplayCount');
        var nextDisplayCount = currentDisplayCount + batchSize;
        if (currentDisplayCount < list.length) {
            // 有更多数据可以加载
            var moreData = list.slice(currentDisplayCount, nextDisplayCount);
            this.setData({
                displayList: displayList.concat(moreData),
                currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
            });
        }
    },
    getCurrentPagePath: function () {
        var pages = getCurrentPages(); //获取加载的页面
        var currentPage = pages[pages.length - 1]; //获取当前页面的对象
        var url = "/" + currentPage.route; //当前页面url
        console.log(url, 'url');
        return url;
    },
    onPullDownRefresh: function () {
        this.getActivityList({});
    },
    getArea: function () {
        var provinceList = _assets_area__WEBPACK_IMPORTED_MODULE_2__["default"].provinceList.map(function (province) { return ({
            label: province.fullName,
            value: province.fullName,
            children: province.directCityList.map(function (city) { return ({
                label: city.fullName,
                value: city.fullName,
            }); }),
        }); });
        this.setData({ provinceList: provinceList });
    },
    getActivityList: function (filter) {
        var _this = this;
        var requestParam = filter || this.data.filter;
        if (!requestParam.type) {
            delete requestParam.type;
        }
        if (!requestParam.status) {
            delete requestParam.status;
        }
        // 调整area的入参格式
        if (requestParam.area) {
            requestParam.region = requestParam.area.join(',');
        }
        if (requestParam.region === ',') {
            delete requestParam.region;
        }
        delete requestParam.area;
        console.log(requestParam);
        wx.cloud.callFunction({
            name: 'onsearchActicity',
            data: requestParam, // 携带的参数
        }).then(function (res) {
            var result = res.result.data; // 云函数返回的结果
            console.log(result, 'result');
            // 更新组件的 state
            _this.setData({
                list: result,
                displayList: result.slice(0, _this.data.batchSize),
                showLoading: false,
                currentDisplayCount: 10,
                config: res.result.config
            });
            // 打印处理后的数据列表
            console.log('Updated Info List:', _this.data.displayList);
        }).catch(function (error) {
            console.error('Error calling cloud function:', error);
            _this.setData({ showLoading: false }); // 处理错误时, 隐藏加载动画
        });
    },
    onChangeTypeFilter: function (e) {
        var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, this.data.filter), { type: e.detail.value });
        this.setData({ filter: filter });
        this.getActivityList(filter);
    },
    onChangeStatusFilter: function (e) {
        var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, this.data.filter), { status: e.detail.value });
        this.setData({ filter: filter });
        this.getActivityList(filter);
    },
    onChangeAreaFilter: function (e) {
        var value = e.detail.value;
        this.setData({ area: value });
    },
    defaultTap: function () {
        var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, this.data.filter), { area: ['', ''] });
        this.setData({ filter: filter, area: ['', ''] });
        this.getActivityList(filter);
        this.mockCloseDropDownMenu();
    },
    primaryTap: function () {
        var filter = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_3__.__assign)({}, this.data.filter), { area: this.data.area });
        this.setData({ filter: filter });
        this.getActivityList(filter);
        this.mockCloseDropDownMenu();
    },
    mockCloseDropDownMenu: function () {
        var _a;
        var drowItemRef = this.selectComponent('#test');
        (_a = drowItemRef.$parent) === null || _a === void 0 ? void 0 : _a.setData({
            activeIdx: -1,
        });
        drowItemRef.setData({
            show: false,
        });
        drowItemRef.triggerEvent('close');
    },
    handleItemClick: function (event) {
        var Item = event.detail;
        console.log(Item._id, 'Item._id');
        __MOR_API__.navigateTo({
            url: "/pages/activity-list/detail/index?activityId=" + Item._id,
        });
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v","mor.c"], function() { return __webpack_exec__("./pages/activity-list/index/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map