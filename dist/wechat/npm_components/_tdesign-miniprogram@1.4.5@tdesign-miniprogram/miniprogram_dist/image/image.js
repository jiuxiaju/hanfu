"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/image"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/image.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/image.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/props.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-image`;
let Image = class Image extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-load`];
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.data = {
            prefix,
            isLoading: true,
            isFailed: false,
            innerStyle: '',
            classPrefix: name,
        };
        this.preSrc = '';
        this.observers = {
            src() {
                if (this.preSrc === this.properties.src)
                    return;
                this.update();
            },
            'width, height'(width, height) {
                this.calcSize(width, height);
            },
        };
        this.methods = {
            onLoaded(e) {
                const sdkVersion = wx.getSystemInfoSync().SDKVersion;
                const versionArray = sdkVersion.split('.').map((v) => parseInt(v, 10));
                const { mode, tId } = this.properties;
                const isInCompatible = versionArray[0] < 2 ||
                    (versionArray[0] === 2 && versionArray[1] < 10) ||
                    (versionArray[0] === 2 && versionArray[1] === 10 && versionArray[2] < 3);
                if (mode === 'heightFix' && isInCompatible) {
                    const { height: picHeight, width: picWidth } = e.detail;
                    (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getRect)(this, `#${tId !== null && tId !== void 0 ? tId : 'image'}`).then((rect) => {
                        const { height } = rect;
                        const resultWidth = ((height / picHeight) * picWidth).toFixed(2);
                        this.setData({ innerStyle: `height: ${(0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.addUnit)(height)}; width: ${resultWidth}px;` });
                    });
                }
                this.setData({
                    isLoading: false,
                    isFailed: false,
                });
                this.triggerEvent('load', e.detail);
            },
            onLoadError(e) {
                this.setData({
                    isLoading: false,
                    isFailed: true,
                });
                this.triggerEvent('error', e.detail);
            },
            calcSize(width, height) {
                let innerStyle = '';
                if (width) {
                    innerStyle += `width: ${(0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.addUnit)(width)};`;
                }
                if (height) {
                    innerStyle += `height: ${(0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.addUnit)(height)};`;
                }
                this.setData({
                    innerStyle,
                });
            },
            update() {
                const { src } = this.properties;
                this.preSrc = src;
                if (!src) {
                    this.onLoadError({ errMsg: '图片链接为空' });
                }
                else {
                    this.setData({
                        isLoading: true,
                        isFailed: false,
                    });
                }
            },
        };
    }
};
Image = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Image);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Image);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/image/image.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=image.js.map