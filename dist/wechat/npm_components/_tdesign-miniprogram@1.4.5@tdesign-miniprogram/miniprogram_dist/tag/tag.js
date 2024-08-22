"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/tag"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/tag.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/tag.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-tag`;
let Tag = class Tag extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.data = {
            prefix,
            classPrefix: name,
            className: '',
            tagStyle: '',
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
        };
        this.lifetimes = {
            attached() {
                this.setClass();
                this.setTagStyle();
            },
        };
        this.observers = {
            'size, shape, theme, variant, closable, disabled'() {
                this.setClass();
            },
            maxWidth() {
                this.setTagStyle();
            },
            icon(v) {
                this.setData({
                    _icon: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.calcIcon)(v),
                });
            },
            closable(v) {
                this.setData({
                    _closable: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.calcIcon)(v, 'close'),
                });
            },
        };
        this.methods = {
            setClass() {
                const { prefix, classPrefix } = this.data;
                const { size, shape, theme, variant, closable, disabled } = this.properties;
                const tagClass = [
                    classPrefix,
                    `${classPrefix}--${theme || 'default'}`,
                    `${classPrefix}--${variant}`,
                    closable ? `${classPrefix}--closable ${prefix}-is-closable` : '',
                    disabled ? `${classPrefix}--disabled ${prefix}-is-disabled` : '',
                    `${classPrefix}--${size}`,
                    `${classPrefix}--${shape}`,
                ];
                const className = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.classNames)(tagClass);
                this.setData({
                    className,
                });
            },
            setTagStyle() {
                const { maxWidth } = this.properties;
                if (!maxWidth) {
                    return '';
                }
                const width = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.isNumber)(maxWidth) ? `${maxWidth}px` : maxWidth;
                this.setData({ tagStyle: `max-width:${width};` });
            },
            handleClick(e) {
                if (this.data.disabled)
                    return;
                this.triggerEvent('click', e);
            },
            handleClose(e) {
                if (this.data.disabled)
                    return;
                this.triggerEvent('close', e);
            },
        };
    }
};
Tag = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Tag);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Tag);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tag/tag.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=tag.js.map