"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/search"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/search.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/search.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-search`;
let Search = class Search extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-input-container`,
            `${prefix}-class-input`,
            `${prefix}-class-action`,
            `${prefix}-class-left`,
            `${prefix}-class-clear`,
        ];
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.observers = {
            resultList(val) {
                const { isSelected } = this.data;
                if (val.length) {
                    if (isSelected) {
                        this.setData({
                            isShowResultList: false,
                            isSelected: false,
                        });
                    }
                    else {
                        this.setData({
                            isShowResultList: true,
                        });
                    }
                }
                else {
                    this.setData({
                        isShowResultList: false,
                    });
                }
            },
        };
        this.data = {
            classPrefix: name,
            prefix,
            isShowResultList: false,
            isSelected: false,
        };
    }
    onInput(e) {
        let { value } = e.detail;
        const { maxcharacter } = this.properties;
        if (maxcharacter && typeof maxcharacter === 'number' && maxcharacter > 0) {
            const { characters } = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getCharacterLength)('maxcharacter', value, maxcharacter);
            value = characters;
        }
        this.setData({
            value,
        });
        this.triggerEvent('change', { value });
    }
    onFocus(e) {
        const { value } = e.detail;
        this.triggerEvent('focus', { value });
    }
    onBlur(e) {
        const { value } = e.detail;
        this.triggerEvent('blur', { value });
    }
    handleClear() {
        this.setData({ value: '' });
        this.triggerEvent('clear', { value: '' });
        this.triggerEvent('change', { value: '' });
    }
    onConfirm(e) {
        const { value } = e.detail;
        this.triggerEvent('submit', { value });
    }
    onActionClick() {
        this.triggerEvent('action-click');
    }
    onSelectResultItem(e) {
        const { index } = e.currentTarget.dataset;
        const item = this.properties.resultList[index];
        this.setData({
            value: item,
            isSelected: true,
        });
        this.triggerEvent('change', { value: item });
        this.triggerEvent('selectresult', { index, item });
    }
};
Search = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Search);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Search);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/search/search.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=search.js.map