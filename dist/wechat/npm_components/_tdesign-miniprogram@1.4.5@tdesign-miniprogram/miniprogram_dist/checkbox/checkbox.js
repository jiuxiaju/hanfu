"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/checkbox"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/checkbox.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/checkbox.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-checkbox`;
let CheckBox = class CheckBox extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
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
            '../checkbox-group/checkbox-group': {
                type: 'ancestor',
                linked(parent) {
                    const { value, disabled, borderless } = parent.data;
                    const valueSet = new Set(value);
                    const checkedFromParent = valueSet.has(this.data.value);
                    const data = {
                        _disabled: this.data.disabled == null ? disabled : this.data.disabled,
                    };
                    if (borderless) {
                        data.borderless = true;
                    }
                    data.checked = this.data.checked || checkedFromParent;
                    if (this.data.checked) {
                        parent.updateValue(this.data);
                    }
                    if (this.data.checkAll) {
                        data.checked = valueSet.size > 0;
                    }
                    this.setData(data);
                },
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.properties = Object.assign(Object.assign({}, _props__WEBPACK_IMPORTED_MODULE_2__["default"]), { theme: {
                type: String,
                value: 'default',
            } });
        this.data = {
            prefix,
            classPrefix: name,
            _disabled: false,
        };
        this.observers = {
            disabled(v) {
                this.setData({ _disabled: v });
            },
        };
        this.controlledProps = [
            {
                key: 'checked',
                event: 'change',
            },
        ];
        this.methods = {
            handleTap(e) {
                const { _disabled, readonly, contentDisabled } = this.data;
                const { target } = e.currentTarget.dataset;
                if (_disabled || readonly || (target === 'text' && contentDisabled))
                    return;
                const { value, label } = this.data;
                const checked = !this.data.checked;
                const parent = this.$parent;
                if (parent) {
                    parent.updateValue(Object.assign(Object.assign({}, this.data), { checked }));
                }
                else {
                    this._trigger('change', { context: { value, label }, checked });
                }
            },
            setDisabled(disabled) {
                this.setData({
                    _disabled: this.data.disabled || disabled,
                });
            },
        };
    }
};
CheckBox = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], CheckBox);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (CheckBox);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox/checkbox.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=checkbox.js.map