(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/cards/index"],{

/***/ "./pages/cards/index.ts":
/*!******************************!*\
  !*** ./pages/cards/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var __MOR_PAGE__ = (__webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js").createPage);

"use strict";
__MOR_PAGE__({
    data: {
        items: [],
        loadingMore: false,
        hasMore: true,
        page: 1,
        showBackToTop: false,
        mergedData: {
            fieldTranslations: {
                chaodai: "朝代",
                city: "城市",
                aa: "年级",
                bb: "属性",
                cb: "班级",
                dc: "段位",
                ee: "属性2"
            },
            tabsData: {
                chaodai: ["朝代"],
                city: ["北京"],
                aa: ["一年级", "二年级", "三年级"],
                bb: ["属性1", "属性2", "属性3", "属性4", "属性5", "属性6", "属性7", "属性8", "属性9", "属性10", "属性11"],
                // cb: ["一年级", "二年级", "三年级"],
                // dc: ["一年级", "二年级", "三年级"],
                // ee: ["属性1", "属性2", "属性3"]
            }
        },
    },
    onLoad: function () {
        // 初始化加载
        this.loadMoreItems();
    },
    onPageScroll: function (event) {
        var _this = this;
        console.log("页面滚动事件", event);
        var scrollTop = event.scrollTop;
        var query = wx.createSelectorQuery();
        query.select('.content').boundingClientRect(function (rect) {
            if (rect) {
                var totalHeight = rect.height;
                if (scrollTop + wx.getSystemInfoSync().windowHeight >= totalHeight - 50 && !_this.data.loadingMore && _this.data.hasMore) {
                    _this.loadMoreItems();
                }
                // 控制回到顶部按钮的显示
                if (scrollTop > 300) {
                    _this.setData({ showBackToTop: true });
                }
                else {
                    _this.setData({ showBackToTop: false });
                }
            }
        }).exec();
    },
    loadMoreItems: function () {
        var _this = this;
        if (!this.data.hasMore || this.data.loadingMore) {
            return;
        }
        this.setData({ loadingMore: true });
        // 模拟异步网路请求
        setTimeout(function () {
            var newItems = Array.from({ length: 20 }, function (_, i) { return "Item " + ((_this.data.page - 1) * 20 + i + 1); });
            _this.setData({
                items: _this.data.items.concat(newItems),
                loadingMore: false,
                page: _this.data.page + 1,
                hasMore: newItems.length > 0
            });
        }, 1500);
    },
    scrollToTop: function () {
        console.log("点击回到顶部");
        wx.pageScrollTo({
            scrollTop: 0,
            duration: 300
        });
    }
}, "a");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/cards/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map