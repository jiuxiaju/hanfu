"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/dropdown-item"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/dropdown-item.js":
/*!**********************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/dropdown-item.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/props.js");
/* harmony import */ var _dropdown_menu_props__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dropdown-menu/props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-dropdown-item`;
let DropdownMenuItem = class DropdownMenuItem extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-content`,
            `${prefix}-class-column`,
            `${prefix}-class-column-item`,
            `${prefix}-class-column-item-label`,
            `${prefix}-class-footer`,
        ];
        this.properties = Object.assign({}, _props__WEBPACK_IMPORTED_MODULE_2__["default"]);
        this.data = {
            prefix,
            classPrefix: name,
            show: false,
            top: 0,
            maskHeight: 0,
            initValue: null,
            hasChanged: false,
            duration: _dropdown_menu_props__WEBPACK_IMPORTED_MODULE_3__["default"].duration.value,
            zIndex: _dropdown_menu_props__WEBPACK_IMPORTED_MODULE_3__["default"].zIndex.value,
            overlay: _dropdown_menu_props__WEBPACK_IMPORTED_MODULE_3__["default"].showOverlay.value,
            labelAlias: 'label',
            valueAlias: 'value',
            computedLabel: '',
            firstCheckedValue: '',
        };
        this.relations = {
            '../dropdown-menu/dropdown-menu': {
                type: 'parent',
                linked(target) {
                    const { zIndex, duration, showOverlay } = target.properties;
                    this.setData({
                        zIndex,
                        duration,
                        showOverlay,
                    });
                },
            },
        };
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            keys(obj) {
                this.setData({
                    labelAlias: obj.label || 'label',
                    valueAlias: obj.value || 'value',
                });
            },
            value(v) {
                const { options, labelAlias, valueAlias } = this.data;
                if (this.data.multiple) {
                    if (!Array.isArray(v))
                        throw TypeError('应传入数组类型的 value');
                }
                const target = options.find((item) => item[valueAlias] === v);
                if (target) {
                    this.setData({
                        computedLabel: target[labelAlias],
                    });
                }
            },
            'label, computedLabel'() {
                var _a;
                (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.getAllItems();
            },
            show(visible) {
                if (visible) {
                    this.getParentBottom(() => {
                        this.setData({ wrapperVisible: true });
                    });
                }
            },
        };
        this.methods = {
            closeDropdown() {
                var _a;
                (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.setData({
                    activeIdx: -1,
                });
                this.setData({
                    show: false,
                });
                this.triggerEvent('close');
            },
            getParentBottom(cb) {
                (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this.$parent, `#${prefix}-bar`).then((rect) => {
                    this.setData({
                        top: rect.bottom,
                        maskHeight: rect.top,
                    }, cb);
                });
            },
            handleTreeClick(e) {
                const { level, value: itemValue } = e.currentTarget.dataset;
                const { value } = this.data;
                value[level] = itemValue;
                this._trigger('change', { value });
            },
            handleRadioChange(e) {
                const { value } = e.detail;
                this._trigger('change', { value });
                if (!this.data.multiple) {
                    this.closeDropdown();
                }
                else {
                    const firstChecked = this.data.options.find((item) => value.includes(item.value));
                    if (firstChecked) {
                        this.data.firstCheckedValue = firstChecked.value;
                    }
                }
            },
            handleMaskClick() {
                var _a;
                if ((_a = this.$parent) === null || _a === void 0 ? void 0 : _a.properties.closeOnClickOverlay) {
                    this.closeDropdown();
                }
            },
            handleReset() {
                this._trigger('change', { value: [] });
                this._trigger('reset');
            },
            handleConfirm() {
                this._trigger('confirm', { value: this.data.value });
                this.closeDropdown();
                this.setData({ firstCheckedValue: this.data.firstCheckedValue });
            },
            onLeaved() {
                this.setData({ wrapperVisible: false });
            },
        };
    }
};
DropdownMenuItem = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], DropdownMenuItem);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenuItem);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-item/dropdown-item.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=dropdown-item.js.map