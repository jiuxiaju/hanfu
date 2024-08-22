"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/navbar"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/navbar.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/navbar.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-navbar`;
let Navbar = class Navbar extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-placeholder`,
            `${prefix}-class-content`,
            `${prefix}-class-title`,
            `${prefix}-class-left`,
            `${prefix}-class-center`,
            `${prefix}-class-left-icon`,
            `${prefix}-class-home-icon`,
            `${prefix}-class-capsule`,
            `${prefix}-class-nav-btn`,
        ];
        this.timer = null;
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_3__["default"];
        this.observers = {
            visible(visible) {
                const { animation } = this.properties;
                const visibleClass = `${name}${visible ? '--visible' : '--hide'}`;
                this.setData({
                    visibleClass: `${visibleClass}${animation ? '-animation' : ''}`,
                });
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                if (animation) {
                    this.timer = setTimeout(() => {
                        this.setData({
                            visibleClass,
                        });
                    }, 300);
                }
            },
            'title,titleMaxLength'() {
                const { title } = this.properties;
                const titleMaxLength = this.properties.titleMaxLength || Number.MAX_SAFE_INTEGER;
                let temp = title.slice(0, titleMaxLength);
                if (titleMaxLength < title.length)
                    temp += '...';
                this.setData({
                    showTitle: temp,
                });
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            boxStyle: '',
            showTitle: '',
            hideLeft: false,
            hideCenter: false,
        };
        this.methods = {
            queryElements(capsuleRect) {
                Promise.all([
                    (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getRect)(this, `.${this.data.classPrefix}__left`),
                    (0,_common_utils__WEBPACK_IMPORTED_MODULE_1__.getRect)(this, `.${this.data.classPrefix}__center`),
                ]).then(([leftRect, centerRect]) => {
                    if (leftRect.right > capsuleRect.left) {
                        this.setData({
                            hideLeft: true,
                            hideCenter: true,
                        });
                    }
                    else if (centerRect.right > capsuleRect.left) {
                        this.setData({
                            hideLeft: false,
                            hideCenter: true,
                        });
                    }
                    else {
                        this.setData({
                            hideLeft: false,
                            hideCenter: false,
                        });
                    }
                });
            },
            goBack() {
                const { delta } = this.data;
                const that = this;
                this.triggerEvent('go-back');
                if (delta > 0) {
                    wx.navigateBack({
                        delta,
                        fail(e) {
                            that.triggerEvent('fail', e);
                        },
                        complete(e) {
                            that.triggerEvent('complete', e);
                        },
                        success(e) {
                            that.triggerEvent('success', e);
                        },
                    });
                }
            },
        };
    }
    attached() {
        let rect = null;
        if (wx.getMenuButtonBoundingClientRect) {
            rect = wx.getMenuButtonBoundingClientRect();
        }
        if (!rect)
            return;
        wx.getSystemInfo({
            success: (res) => {
                const boxStyleList = [];
                boxStyleList.push(`--td-navbar-padding-top: ${res.statusBarHeight}px`);
                if (rect && (res === null || res === void 0 ? void 0 : res.windowWidth)) {
                    boxStyleList.push(`--td-navbar-right: ${res.windowWidth - rect.left}px`);
                }
                boxStyleList.push(`--td-navbar-capsule-height: ${rect.height}px`);
                boxStyleList.push(`--td-navbar-capsule-width: ${rect.width}px`);
                boxStyleList.push(`--td-navbar-height: ${(rect.top - res.statusBarHeight) * 2 + rect.height}px`);
                this.setData({
                    boxStyle: `${boxStyleList.join('; ')}`,
                });
                if (wx.onMenuButtonBoundingClientRectWeightChange) {
                    wx.onMenuButtonBoundingClientRectWeightChange((res) => this.queryElements(res));
                }
            },
            fail: (err) => {
                console.error('navbar 获取系统信息失败', err);
            },
        });
    }
    detached() {
        if (wx.offMenuButtonBoundingClientRectWeightChange) {
            wx.offMenuButtonBoundingClientRectWeightChange((res) => this.queryElements(res));
        }
    }
};
Navbar = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Navbar);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Navbar);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/navbar/navbar.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=navbar.js.map