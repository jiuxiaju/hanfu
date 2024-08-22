"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/side-bar-item"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/side-bar-item.js":
/*!**********************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/side-bar-item.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-side-bar-item`;
let SideBarItem = class SideBarItem extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.relations = {
            '../side-bar/side-bar': {
                type: 'parent',
                linked(parent) {
                    this.parent = parent;
                    this.updateActive(parent.data.value);
                },
            },
        };
        this.observers = {
            icon(v) {
                this.setData({ _icon: typeof v === 'string' ? { name: v } : v });
            },
        };
        this.data = {
            classPrefix: name,
            prefix,
            active: false,
            isPre: false,
            isNext: false,
        };
        this.methods = {
            updateActive(value) {
                const active = value === this.data.value;
                this.setData({
                    active,
                });
            },
            handleClick() {
                var _a;
                if (this.data.disabled)
                    return;
                const { value, label } = this.data;
                (_a = this.parent) === null || _a === void 0 ? void 0 : _a.doChange({ value, label });
            },
        };
    }
};
SideBarItem = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], SideBarItem);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (SideBarItem);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/side-bar-item/side-bar-item.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=side-bar-item.js.map