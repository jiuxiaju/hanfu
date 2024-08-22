"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/grid-item"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/grid-item.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/grid-item.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-grid-item`;
const getUniqueID = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.uniqueFactory)('grid_item');
var LinkTypes;
(function (LinkTypes) {
    LinkTypes["redirect-to"] = "redirectTo";
    LinkTypes["switch-tab"] = "switchTab";
    LinkTypes["relaunch"] = "reLaunch";
    LinkTypes["navigate-to"] = "navigateTo";
})(LinkTypes || (LinkTypes = {}));
let GridItem = class GridItem extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-content`,
            `${prefix}-class-image`,
            `${prefix}-class-text`,
            `${prefix}-class-description`,
        ];
        this.options = {
            multipleSlots: true,
        };
        this.relations = {
            '../grid/grid': {
                type: 'ancestor',
                linked(target) {
                    this.parent = target;
                    this.updateStyle();
                    this.setData({
                        column: target.data.column,
                    });
                },
            },
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.data = {
            prefix,
            classPrefix: name,
            gridItemStyle: '',
            gridItemWrapperStyle: '',
            gridItemContentStyle: '',
            align: 'center',
            column: 0,
            describedbyID: '',
        };
        this.observers = {
            icon(icon) {
                const obj = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.setIcon)('icon', icon, '');
                this.setData(Object.assign({}, obj));
            },
        };
        this.lifetimes = {
            ready() {
                this.setData({
                    describedbyID: getUniqueID(),
                });
            },
        };
    }
    updateStyle() {
        const { hover, align } = this.parent.properties;
        const gridItemStyles = [];
        const gridItemWrapperStyles = [];
        const gridItemContentStyles = [];
        const widthStyle = this.getWidthStyle();
        const paddingStyle = this.getPaddingStyle();
        const borderStyle = this.getBorderStyle();
        widthStyle && gridItemStyles.push(widthStyle);
        paddingStyle && gridItemWrapperStyles.push(paddingStyle);
        borderStyle && gridItemContentStyles.push(borderStyle);
        this.setData({
            gridItemStyle: `${gridItemStyles.join(';')}`,
            gridItemWrapperStyle: gridItemWrapperStyles.join(';'),
            gridItemContentStyle: gridItemContentStyles.join(';'),
            hover,
            layout: this.properties.layout,
            align: align,
        });
    }
    getWidthStyle() {
        const { column } = this.parent.properties;
        return column > 0 ? `width:${(1 / column) * 100}%` : '';
    }
    getPaddingStyle() {
        const { gutter } = this.parent.properties;
        if (gutter)
            return `padding-left:${gutter}rpx;padding-top:${gutter}rpx`;
        return '';
    }
    getBorderStyle() {
        const { gutter } = this.parent.properties;
        let { border } = this.parent.properties;
        if (!border)
            return '';
        if (!(0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.isObject)(border))
            border = {};
        const { color = '#266FE8', width = 2, style = 'solid' } = border;
        if (gutter)
            return `border:${width}rpx ${style} ${color}`;
        return `border-top:${width}rpx ${style} ${color};border-left:${width}rpx ${style} ${color}`;
    }
    onClick(e) {
        const { item } = e.currentTarget.dataset;
        this.triggerEvent('click', item);
        this.jumpLink();
    }
    jumpLink() {
        const { url, jumpType } = this.properties;
        if (url && jumpType) {
            if (LinkTypes[jumpType]) {
                wx[LinkTypes[jumpType]]({ url });
            }
        }
    }
};
GridItem = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], GridItem);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (GridItem);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/grid-item/grid-item.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=grid-item.js.map