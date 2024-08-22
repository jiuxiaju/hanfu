"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/cell"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/cell.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/cell.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-cell`;
let Cell = class Cell extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-title`,
            `${prefix}-class-description`,
            `${prefix}-class-note`,
            `${prefix}-class-hover`,
            `${prefix}-class-image`,
            `${prefix}-class-left`,
            `${prefix}-class-left-icon`,
            `${prefix}-class-center`,
            `${prefix}-class-right`,
            `${prefix}-class-right-icon`,
        ];
        this.relations = {
            '../cell-group/cell-group': {
                type: 'parent',
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.data = {
            prefix,
            classPrefix: name,
            isLastChild: false,
        };
        this.observers = {
            leftIcon(v) {
                this.setIcon('_leftIcon', v, '');
            },
            rightIcon(v) {
                this.setIcon('_rightIcon', v, '');
            },
            arrow(v) {
                this.setIcon('_arrow', v, 'chevron-right');
            },
        };
    }
    setIcon(name, value, defaultValue) {
        if (!value)
            return;
        this.setData({
            [name]: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.calcIcon)(value, defaultValue),
        });
    }
    onClick(e) {
        this.triggerEvent('click', e.detail);
        this.jumpLink();
    }
    jumpLink(urlKey = 'url', link = 'jumpType') {
        const url = this.data[urlKey];
        const jumpType = this.data[link];
        if (url) {
            wx[jumpType]({ url });
        }
    }
};
Cell = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Cell);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Cell);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/cell/cell.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=cell.js.map