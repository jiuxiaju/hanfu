"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/offline-detail/index"],{

/***/ "./pages/shop/offline-detail/index.ts":
/*!********************************************!*\
  !*** ./pages/shop/offline-detail/index.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);
var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aPage)({
    data: {
        currentImageIndex: 0,
        containerHeight: 200,
        shopInfo: {
            styles: [],
            images: [],
            tags: [],
        },
        showLoading: true,
        styles: [],
        itemId: '',
        images: [],
        tags: [],
        rowCol: [{ width: '100%', height: '100px' }],
    },
    onLoad: function (query) {
        var _this = this;
        var itemId = query.itemId || '';
        this.setData({
            itemId: itemId
        });
        console.log(itemId, 'itemId');
        wx.cloud
            .callFunction({
            // 云函数名称
            name: "offline-detail",
            data: {
                itemId: itemId
            }
        })
            .then(function (res) {
            console.log(res, 'data');
            var data = res.result[0];
            if (data) {
                _this.setData({
                    shopInfo: data,
                    images: data.images,
                    style: data.style,
                    isOpen: _this.isShopOpen(data.businessHours),
                    showLoading: false // 数据加载完毕，隐藏加载动画
                });
            }
            else {
                // 如果data为空，你可以根据需求处理，如隐藏动画等
                _this.setData({
                    showLoading: false, // 数据加载完毕，隐藏加载动画
                });
            }
            console.log(data, 'data');
        }).catch(function (err) {
            console.error(err);
            _this.setData({
                showLoading: false, // 如果请求失败，隐藏加载动画
            });
        });
        this.adjustContainerHeight();
    },
    onShareAppMessage: function () {
        var promise = new Promise(function (resolve) {
            setTimeout(function () {
                resolve({
                    title: '九霞裾',
                });
            }, 20);
        });
        return {
            title: '九霞裾',
            path: '/pages/home',
            promise: promise,
        };
    },
    //转发到朋友圈
    onShareTimeline: function () {
        return {
            title: '快来看看',
        };
    },
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
        this.setData({
            visible: e.detail.visible,
        });
    },
    previewImage: function (event) {
        var index = event.currentTarget.dataset.index;
        wx.previewImage({
            current: this.data.images[index],
            urls: this.data.images // 需要预览的图片http链接列表
        });
    },
    onSwiperChange: function (e) {
        var currentImageIndex = e.detail.current;
        this.setData({
            currentImageIndex: currentImageIndex
        });
        // 调整容器高度
        this.adjustContainerHeight();
    },
    onImageLoad: function (e) {
        // 计算每张图片的实际高度
        var _a = e.detail, width = _a.width, height = _a.height;
        // 以当前图片的宽高比计算其在Swiper中的高度
        var containerWidth = wx.getSystemInfoSync().windowWidth;
        var calculatedHeight = (height / width) * containerWidth;
        // 设置容器高度
        this.setData({
            containerHeight: calculatedHeight
        });
    },
    adjustContainerHeight: function () {
        var _this = this;
        var currentImageSrc = this.data.shopInfo.images[this.data.currentImageIndex];
        // 获取当前图片的宽高信息，重新调整容器高度
        wx.getImageInfo({
            src: currentImageSrc,
            success: function (res) {
                var width = res.width, height = res.height;
                // 以当前图片的宽高比计算其在Swiper中的高度
                var containerWidth = wx.getSystemInfoSync().windowWidth;
                var calculatedHeight = (height / width) * containerWidth;
                _this.setData({
                    containerHeight: calculatedHeight
                });
            }
        });
    },
    isShopOpen: function (businessHours) {
        var now = new Date();
        var currentDay = (now.getDay() + 6) % 7 + 1; // 星期几 (周一到周日分别为 1 到 7)
        var currentTime = now.toTimeString().split(' ')[0]; // 当前时间 (HH:MM:SS)
        var daysMap = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
        var today = daysMap[currentDay - 1];
        var todayHours = businessHours.find(function (day) { return day.day === today; });
        if (!todayHours || todayHours.hours === '休息') {
            return false;
        }
        var _a = todayHours.hours.split(' - '), openTime = _a[0], closeTime = _a[1];
        return currentTime >= openTime && currentTime <= closeTime;
    },
    navigateToUrl: function (event) {
        var style = event.currentTarget.dataset.style;
        console.log('navigateToUrl:', style); // 调试输出
        __MOR_API__.navigateTo({
            url: "/pages/population-list/detail/index?style=" + style,
        });
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/offline-detail/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map