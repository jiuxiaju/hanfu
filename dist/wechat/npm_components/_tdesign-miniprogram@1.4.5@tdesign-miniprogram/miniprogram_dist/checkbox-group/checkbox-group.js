"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/checkbox-group"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/checkbox-group.js":
/*!************************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/checkbox-group.js ***!
  \************************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-checkbox-group`;
let CheckBoxGroup = class CheckBoxGroup extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.relations = {
            '../checkbox/checkbox': {
                type: 'descendant',
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            checkboxOptions: [],
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.observers = {
            value() {
                this.updateChildren();
            },
            options() {
                this.initWithOptions();
            },
            disabled(v) {
                var _a;
                if ((_a = this.data.options) === null || _a === void 0 ? void 0 : _a.length) {
                    this.initWithOptions();
                    return;
                }
                this.getChildren().forEach((item) => {
                    item.setDisabled(v);
                });
            },
        };
        this.lifetimes = {
            ready() {
                this.setCheckall();
            },
        };
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.$checkAll = null;
        this.methods = {
            getChildren() {
                let items = this.$children;
                if (!items.length) {
                    items = this.selectAllComponents(`.${prefix}-checkbox-option`);
                }
                return items || [];
            },
            updateChildren() {
                const items = this.getChildren();
                const { value } = this.data;
                if (items.length > 0) {
                    items.forEach((item) => {
                        !item.data.checkAll &&
                            item.setData({
                                checked: value === null || value === void 0 ? void 0 : value.includes(item.data.value),
                            });
                    });
                    if (items.some((item) => item.data.checkAll)) {
                        this.setCheckall();
                    }
                }
            },
            updateValue({ value, checked, checkAll, item, indeterminate }) {
                let { value: newValue } = this.data;
                const { max } = this.data;
                const keySet = new Set(this.getChildren().map((item) => item.data.value));
                newValue = newValue.filter((value) => keySet.has(value));
                if (max && checked && newValue.length === max)
                    return;
                if (checkAll) {
                    const items = this.getChildren();
                    newValue =
                        !checked && indeterminate
                            ? items
                                .filter(({ data }) => !(data.disabled && !newValue.includes(data.value)))
                                .map((item) => item.data.value)
                            : items
                                .filter(({ data }) => {
                                if (data.disabled) {
                                    return newValue.includes(data.value);
                                }
                                return checked && !data.checkAll;
                            })
                                .map(({ data }) => data.value);
                }
                else if (checked) {
                    newValue = newValue.concat(value);
                }
                else {
                    const index = newValue.findIndex((v) => v === value);
                    newValue.splice(index, 1);
                }
                this._trigger('change', { value: newValue, context: item });
            },
            initWithOptions() {
                const { options, value } = this.data;
                if (!(options === null || options === void 0 ? void 0 : options.length) || !Array.isArray(options))
                    return;
                const checkboxOptions = options.map((item) => {
                    const isLabel = ['number', 'string'].includes(typeof item);
                    return isLabel
                        ? {
                            label: `${item}`,
                            value: item,
                            checked: value === null || value === void 0 ? void 0 : value.includes(item),
                        }
                        : Object.assign(Object.assign({}, item), { checked: value === null || value === void 0 ? void 0 : value.includes(item.value) });
                });
                this.setData({
                    checkboxOptions,
                });
            },
            handleInnerChildChange(e) {
                var _a;
                const { item } = e.target.dataset;
                const { checked } = e.detail;
                const rect = {};
                if (item.checkAll) {
                    rect.indeterminate = (_a = this.$checkAll) === null || _a === void 0 ? void 0 : _a.data.indeterminate;
                }
                this.updateValue(Object.assign(Object.assign(Object.assign({}, item), { checked, item }), rect));
            },
            setCheckall() {
                const items = this.getChildren();
                if (!this.$checkAll) {
                    this.$checkAll = items.find((item) => item.data.checkAll);
                }
                if (!this.$checkAll)
                    return;
                const { value } = this.data;
                const valueSet = new Set(value === null || value === void 0 ? void 0 : value.filter((val) => val !== this.$checkAll.data.value));
                const isCheckall = items.every((item) => (item.data.checkAll ? true : valueSet.has(item.data.value)));
                this.$checkAll.setData({
                    checked: valueSet.size > 0,
                    indeterminate: !isCheckall,
                });
            },
        };
    }
};
CheckBoxGroup = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], CheckBoxGroup);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (CheckBoxGroup);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/checkbox-group/checkbox-group.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=checkbox-group.js.map