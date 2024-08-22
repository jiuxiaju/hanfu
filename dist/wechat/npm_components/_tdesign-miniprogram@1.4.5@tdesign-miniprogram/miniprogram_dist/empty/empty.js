"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/empty"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/empty.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/empty.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/props.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-empty`;
let default_1 = class extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            multipleSlots: true,
        };
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-description`, `${prefix}-class-image`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.observers = {
            icon(icon) {
                const obj = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.setIcon)('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
    }
};
default_1 = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], default_1);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (default_1);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/empty/empty.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=empty.js.map