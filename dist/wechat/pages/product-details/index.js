(wx["mor_modules"] = wx["mor_modules"] || []).push([["pages/product-details/index"],{

/***/ "./pages/product-details/index.ts":
/*!****************************************!*\
  !*** ./pages/product-details/index.ts ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __unused_webpack_exports, __webpack_require__) {

var __MOR_COMPONENT__ = (__webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js").createComponent);

"use strict";
__MOR_COMPONENT__({
    properties: {
        product: Object,
        config: Object
    },
    data: {
        dynamicFields: []
    },
    observers: {
        'product, config': function (product, config) {
            this.filterFields(product, config);
        }
    },
    methods: {
        filterFields: function (product, config) {
            if (!product || !config)
                return;
            var fieldsToShow = config.fieldsToShow;
            var labels = config.labels;
            var dynamicFields = fieldsToShow.filter(function (field) { return product[field] !== undefined; }).map(function (field) {
                return {
                    label: labels[field] || field,
                    value: product[field]
                };
            });
            this.setData({ dynamicFields: dynamicFields });
        }
    }
}, "a");


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./pages/product-details/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map