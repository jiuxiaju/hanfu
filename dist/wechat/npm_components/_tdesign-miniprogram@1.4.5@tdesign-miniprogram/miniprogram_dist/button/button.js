"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/button"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/button.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/button.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/props.js");
/* harmony import */ var _common_version__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/version */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/version.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-button`;
let Button = class Button extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-icon`, `${prefix}-class-loading`];
        this.behaviors = (0,_common_version__WEBPACK_IMPORTED_MODULE_4__.canIUseFormFieldButton)() ? ['wx://form-field-button'] : [];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            prefix,
            className: '',
            classPrefix: name,
        };
        this.observers = {
            'theme, size, plain, block, shape, disabled, loading, variant'() {
                this.setClass();
            },
            icon(icon) {
                const obj = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.setIcon)('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
        this.lifetimes = {
            attached() {
                this.setClass();
            },
        };
        this.methods = {
            setClass() {
                const classList = [
                    name,
                    `${prefix}-class`,
                    `${name}--${this.data.variant || 'base'}`,
                    `${name}--${this.data.theme || 'default'}`,
                    `${name}--${this.data.shape || 'rectangle'}`,
                    `${name}--size-${this.data.size || 'medium'}`,
                ];
                if (this.data.block) {
                    classList.push(`${name}--block`);
                }
                if (this.data.disabled) {
                    classList.push(`${name}--disabled`);
                }
                if (this.data.ghost) {
                    classList.push(`${name}--ghost`);
                }
                this.setData({
                    className: classList.join(' '),
                });
            },
            getuserinfo(e) {
                this.triggerEvent('getuserinfo', e.detail);
            },
            contact(e) {
                this.triggerEvent('contact', e.detail);
            },
            getphonenumber(e) {
                this.triggerEvent('getphonenumber', e.detail);
            },
            error(e) {
                this.triggerEvent('error', e.detail);
            },
            opensetting(e) {
                this.triggerEvent('opensetting', e.detail);
            },
            launchapp(e) {
                this.triggerEvent('launchapp', e.detail);
            },
            chooseavatar(e) {
                this.triggerEvent('chooseavatar', e.detail);
            },
            agreeprivacyauthorization(e) {
                this.triggerEvent('agreeprivacyauthorization', e.detail);
            },
            handleTap(e) {
                if (this.data.disabled || this.data.loading)
                    return;
                this.triggerEvent('tap', e);
            },
        };
    }
};
Button = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Button);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Button);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/button/button.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=button.js.map