"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/radio"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/radio.js":
/*!******************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/radio.js ***!
  \******************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_0__["default"];
const name = `${prefix}-radio`;
let Radio = class Radio extends _common_src_index__WEBPACK_IMPORTED_MODULE_1__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-label`,
            `${prefix}-class-icon`,
            `${prefix}-class-content`,
            `${prefix}-class-border`,
        ];
        this.behaviors = ['wx://form-field'];
        this.relations = {
            '../radio-group/radio-group': {
                type: 'ancestor',
                linked(parent) {
                    if (parent.data.borderless) {
                        this.setData({ borderless: true });
                    }
                },
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.lifetimes = {
            attached() {
                this.init();
            },
        };
        this.properties = Object.assign(Object.assign({}, _props__WEBPACK_IMPORTED_MODULE_2__["default"]), { borderless: {
                type: Boolean,
                value: false,
            } });
        this.controlledProps = [
            {
                key: 'checked',
                event: 'change',
            },
        ];
        this.data = {
            prefix,
            classPrefix: name,
            customIcon: false,
            slotIcon: false,
            optionLinked: false,
            iconVal: [],
            _placement: '',
            _disabled: false,
        };
        this.observers = {
            disabled(v) {
                this.setData({ _disabled: v });
            },
        };
        this.methods = {
            handleTap(e) {
                const { _disabled, readonly, contentDisabled } = this.data;
                const { target } = e.currentTarget.dataset;
                if (_disabled || readonly || (target === 'text' && contentDisabled))
                    return;
                this.doChange();
            },
            doChange() {
                const { value, checked, allowUncheck } = this.data;
                if (this.$parent) {
                    this.$parent.updateValue(checked && allowUncheck ? null : value);
                }
                else {
                    this._trigger('change', { checked: checked && allowUncheck ? false : !checked });
                }
            },
            init() {
                var _a, _b, _c, _d, _e, _f;
                const { icon } = this.data;
                const isIdArr = Array.isArray(((_a = this.$parent) === null || _a === void 0 ? void 0 : _a.icon) || icon);
                this.setData({
                    customIcon: isIdArr,
                    slotIcon: icon === 'slot',
                    iconVal: isIdArr ? ((_b = this.$parent) === null || _b === void 0 ? void 0 : _b.icon) || icon : [],
                    _placement: (_f = (_c = this.data.placement) !== null && _c !== void 0 ? _c : (_e = (_d = this.$parent) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.placement) !== null && _f !== void 0 ? _f : 'left',
                });
            },
            setDisabled(disabled) {
                this.setData({
                    _disabled: this.data.disabled || disabled,
                });
            },
        };
    }
};
Radio = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_1__.wxComponent)()
], Radio);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Radio);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/radio/radio.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=radio.js.map