(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/shop/style/index"],{

/***/ "./pages/shop/style/index.ts":
/*!***********************************!*\
  !*** ./pages/shop/style/index.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var __MOR_PAGE__ = (__webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js").createPage);

var __MOR_API__ = (__webpack_require__(/*! @morjs/api */ "../node_modules/_@morjs_api@1.0.69@@morjs/api/lib/index.js").mor);

"use strict";
__MOR_PAGE__({
    data: {
        product: {},
        skuList: [],
        config: {
            fieldsToShow: ['brand', 'size', 'delivery'],
            labels: {
                brand: '品牌',
                size: '尺码',
                delivery: '发货周期'
            }
        },
        loading: true,
        images: [],
        currentImageIndex: 0,
        currentSkuIndex: 0,
        imageHeights: [],
        containerHeight: 300,
        tabVisible: false,
    },
    onLoad: function (query) {
        var _this = this;
        var itemId = query.itemId || '';
        this.setData({
            itemId: itemId
        });
        wx.cloud
            .callFunction({
            // 云函数名称
            name: "item-sku",
            data: {
                itemId: itemId
            }
        })
            .then(function (res) {
            console.log(res, 'res');
            var result = res.result;
            _this.setData({
                styleetails: result.data[0],
                skuList: result.data[0].skuList,
                config: result.config,
                images: result.data[0].images,
                product: result.data[0],
                loading: false
            });
        });
        // 初始化 imageHeights 数组
        var totalImages = this.data.images.length + this.data.skuList.length;
        var initialHeights = new Array(totalImages).fill(0);
        this.setData({
            imageHeights: initialHeights
        });
    },
    // 点击main-icon时，切换预览区图片。
    onMainIconClick: function () {
        this.setData({
            currentSkuIndex: -1,
            currentImageIndex: 0 // 显示第一张图片
        });
        this.scrollToImage();
    },
    // 点击SKU icon时，切换预览区
    onIconClick: function (event) {
        var index = event.currentTarget.dataset.index;
        this.setData({
            currentSkuIndex: index,
            currentImageIndex: this.data.images.length + index
        });
        this.scrollToImage();
    },
    // 处理轮播图滑动（或点击）事件，更新当前索引
    onSwiperChange: function (e) {
        var currentImageIndex = e.detail.current;
        this.setData({
            currentImageIndex: currentImageIndex,
            // currentSkuIndex: currentImageIndex < this.data.images.length ? -1 : currentImageIndex - this.data.images.length
            currentSkuIndex: currentImageIndex >= this.data.images.length
                ? currentImageIndex - this.data.images.length
                : -1
        });
        // 调整容器高度
        this.adjustContainerHeight();
    },
    // 获取图片的高度
    onImageLoad: function (e) {
        var _a = e.detail, width = _a.width, height = _a.height;
        var windowWidth = wx.getSystemInfoSync().windowWidth;
        // 计算图片显示高度
        var aspectRatio = width / height;
        var containerHeight = windowWidth / aspectRatio;
        var index = e.currentTarget.dataset.index; // 从dataset获取索引
        var imageHeights = this.data.imageHeights;
        // 更新 imageHeights 数组中的特定索引值
        if (index !== undefined) {
            imageHeights[index] = containerHeight;
            this.setData({ imageHeights: imageHeights });
            // 如果当前加载图片是正在显示的图片时，调整容器高度
            if (index === this.data.currentImageIndex) {
                this.setData({ containerHeight: containerHeight });
            }
            // 如果是首次加载，设置第一页的高度
            if (index === 0) {
                this.setData({ containerHeight: containerHeight });
            }
        }
        else {
            console.warn('onImageLoad - index is undefined');
        }
    },
    // 滚动到选中的图片
    scrollToImage: function () {
        var windowWidth = wx.getSystemInfoSync().windowWidth;
        var scrollLeft = this.data.currentImageIndex * windowWidth;
        this.setData({
            scrollLeft: scrollLeft
        });
        // 调整容器高度
        this.adjustContainerHeight();
    },
    // 根据图片高度调整容器高度
    adjustContainerHeight: function () {
        var _a = this.data, imageHeights = _a.imageHeights, currentImageIndex = _a.currentImageIndex;
        var containerHeight = imageHeights[currentImageIndex];
        if (containerHeight) {
            this.setData({
                containerHeight: containerHeight
            });
        }
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
    previewImage: function (event) {
        var urls = this.data.images.concat(this.data.skuList.map(function (item) { return item.image; }));
        // 获取当前点击的图片地址
        var current = urls[event.currentTarget.dataset.index];
        __MOR_API__.previewImage({
            current: current,
            urls: urls // 需要预览的图片http链接列表
        });
    },
    //转发到朋友圈
    onShareTimeline: function () {
        return {
            title: '快来看看'
        };
    },
    handleShopClick: function (event) {
        var itemId = event.currentTarget.dataset.shopId;
        __MOR_API__.navigateTo({
            url: "/pages/shop/online-detail/index?itemId=" + itemId,
        });
    },
    previewDetailImage: function (event) {
        var current = event.currentTarget.dataset.index;
        var imageUrls = this.data.skuList.map(function (sku) { return sku.image; });
        wx.previewImage({
            current: imageUrls[current],
            urls: imageUrls // 需要预览的图片http链接列表
        });
    },
    //检测页面滚动高度
    onPageScroll: function (event) {
        var _this = this;
        var query = wx.createSelectorQuery();
        query.select('#detailsSection').boundingClientRect(function (rect) {
            var tabVisible = rect.top <= 0;
            if (tabVisible !== _this.data.tabVisible) {
                _this.setData({ tabVisible: tabVisible });
            }
        }).exec();
    },
    scrollToTop: function () {
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 600
        });
    },
    scrollToDetails: function () {
        var query = wx.createSelectorQuery();
        query.select('#detailsSection').boundingClientRect(function (rect) {
            if (rect) {
                wx.pageScrollTo({
                    scrollTop: rect.top + wx.getSystemInfoSync().scrollTop,
                    duration: 600
                });
            }
            else {
                console.error('无法获取 detailsSection 的位置信息');
            }
        }).exec();
    }
}, "a");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/shop/style/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map