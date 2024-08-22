"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/fab"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/fab.js":
/*!**************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/fab.js ***!
  \**************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/props.js");
/* harmony import */ var _mixins_using_custom_navbar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mixins/using-custom-navbar */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/using-custom-navbar.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const systemInfo = wx.getSystemInfoSync();
const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-fab`;
const baseButtonProps = {
    size: 'large',
    shape: 'circle',
    theme: 'primary',
    externalClass: `${prefix}-fab__button`,
};
let Fab = class Fab extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.behaviors = [_mixins_using_custom_navbar__WEBPACK_IMPORTED_MODULE_3__["default"]];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.externalClasses = [`class`, `${prefix}-class`, `${prefix}-class-button`];
        this.data = {
            prefix,
            classPrefix: name,
            buttonData: baseButtonProps,
            moveStyle: null,
        };
        this.observers = {
            'buttonProps.**, icon, text, ariaLabel'() {
                var _a;
                this.setData({
                    buttonData: Object.assign(Object.assign(Object.assign(Object.assign({}, baseButtonProps), { shape: this.properties.text ? 'round' : 'circle', icon: this.properties.icon }), this.properties.buttonProps), { content: this.properties.text, ariaLabel: this.properties.ariaLabel }),
                }, (_a = this.computedSize) === null || _a === void 0 ? void 0 : _a.bind(this));
            },
        };
        this.methods = {
            onTplButtonTap(e) {
                this.triggerEvent('click', e);
            },
            onMove(e) {
                const { distanceTop } = this.data;
                const { x, y, rect } = e.detail;
                const maxX = systemInfo.windowWidth - rect.width;
                const maxY = systemInfo.windowHeight - distanceTop - rect.height;
                const right = Math.max(0, Math.min(x, maxX));
                const bottom = Math.max(0, Math.min(y, maxY));
                this.setData({
                    moveStyle: `right: ${right}px; bottom: ${bottom}px;`,
                });
            },
            computedSize() {
                if (!this.properties.draggable)
                    return;
                const insChild = this.selectComponent('#draggable');
                insChild.computedRect();
            },
        };
    }
};
Fab = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Fab);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Fab);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/fab.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=fab.js.map