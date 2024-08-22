"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/back-top"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/back-top.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/back-top.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-back-top`;
let BackTop = class BackTop extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-text`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.relations = {
            '../pull-down-refresh/pull-down-refresh': {
                type: 'ancestor',
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            _icon: null,
            hidden: true,
        };
        this.observers = {
            icon() {
                this.setIcon();
            },
            scrollTop(value) {
                const { visibilityHeight } = this.properties;
                this.setData({ hidden: value < visibilityHeight });
            },
        };
        this.lifetimes = {
            ready() {
                const { icon } = this.properties;
                this.setIcon(icon);
            },
        };
        this.methods = {
            setIcon(v) {
                this.setData({
                    _icon: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.calcIcon)(v, 'backtop'),
                });
            },
            toTop() {
                var _a;
                this.triggerEvent('to-top');
                if (this.$parent) {
                    (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.setScrollTop(0);
                    this.setData({ hidden: true });
                }
                else {
                    wx.pageScrollTo({
                        scrollTop: 0,
                        duration: 300,
                    });
                }
            },
        };
    }
};
BackTop = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], BackTop);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (BackTop);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/back-top/back-top.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=back-top.js.map