"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/grid"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/grid.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/grid.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-grid`;
let Grid = class Grid extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = ['t-class'];
        this.relations = {
            '../grid-item/grid-item': {
                type: 'descendant',
            },
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.data = {
            prefix,
            classPrefix: name,
            contentStyle: '',
        };
        this.observers = {
            'column,hover,align'() {
                this.updateContentStyle();
            },
            'gutter,border'() {
                this.updateContentStyle();
                this.doForChild((child) => child.updateStyle());
            },
        };
        this.lifetimes = {
            attached() {
                this.updateContentStyle();
            },
        };
        this.methods = {
            doForChild(action) {
                this.$children.forEach(action);
            },
            updateContentStyle() {
                const contentStyles = [];
                const marginStyle = this.getContentMargin();
                marginStyle && contentStyles.push(marginStyle);
                this.setData({
                    contentStyle: contentStyles.join(';'),
                });
            },
            getContentMargin() {
                const { gutter } = this.properties;
                let { border } = this.properties;
                if (!border)
                    return `margin-left:-${gutter}rpx; margin-top:-${gutter}rpx`;
                if (!(0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.isObject)(border))
                    border = {};
                const { width = 2 } = border;
                return `margin-left:-${width}rpx; margin-top:-${width}rpx`;
            },
        };
    }
};
Grid = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Grid);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Grid);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid/grid.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=grid.js.map