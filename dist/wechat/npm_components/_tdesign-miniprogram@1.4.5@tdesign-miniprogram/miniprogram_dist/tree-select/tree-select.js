"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/tree-select"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/tree-select.js":
/*!******************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/tree-select.js ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/props.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-tree-select`;
let TreeSelect = class TreeSelect extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.options = {
            multipleSlots: true,
        };
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            'value, options, keys, multiple'() {
                this.buildTreeOptions();
            },
        };
        this.methods = {
            buildTreeOptions() {
                const { options, value, multiple, keys } = this.data;
                const treeOptions = [];
                let level = -1;
                let node = { children: options };
                if (options.length === 0 || (Array.isArray(value) && value.length === 0))
                    return;
                while (node && node.children) {
                    level += 1;
                    const list = node.children.map((item) => ({
                        label: item[(keys === null || keys === void 0 ? void 0 : keys.label) || 'label'],
                        value: item[(keys === null || keys === void 0 ? void 0 : keys.value) || 'value'],
                        children: item.children,
                    }));
                    const thisValue = value === null || value === void 0 ? void 0 : value[level];
                    treeOptions.push([...list]);
                    if (thisValue == null) {
                        const [firstChild] = list;
                        node = firstChild;
                    }
                    else {
                        const child = list.find((child) => child.value === thisValue);
                        node = child !== null && child !== void 0 ? child : list[0];
                    }
                }
                const leafLevel = Math.max(0, level);
                if (multiple) {
                    const finalValue = this.data.value || this.data.defaultValue;
                    if (finalValue[leafLevel] != null && !Array.isArray(finalValue[leafLevel])) {
                        throw TypeError('应传入数组类型的 value');
                    }
                }
                this.setData({
                    leafLevel,
                    treeOptions,
                });
            },
            onRootChange(e) {
                const { value } = this.data;
                const { value: itemValue } = e.detail;
                value[0] = itemValue;
                this._trigger('change', { value, level: 0 });
            },
            handleTreeClick(e) {
                const { level, value: itemValue } = e.currentTarget.dataset;
                const { value } = this.data;
                value[level] = itemValue;
                this._trigger('change', { value, level: 1 });
            },
            handleRadioChange(e) {
                const { value } = this.data;
                const { value: itemValue } = e.detail;
                const { level } = e.target.dataset;
                value[level] = itemValue;
                this._trigger('change', { value, level });
            },
        };
    }
};
TreeSelect = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], TreeSelect);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (TreeSelect);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tree-select/tree-select.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=tree-select.js.map