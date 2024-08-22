"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/dropdown-menu"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/dropdown-menu.js":
/*!**********************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/dropdown-menu.js ***!
  \**********************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-dropdown-menu`;
let DropdownMenu = class DropdownMenu extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-item`, `${prefix}-class-label`, `${prefix}-class-icon`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.nodes = null;
        this.data = {
            prefix,
            classPrefix: name,
            menus: null,
            activeIdx: -1,
            bottom: 0,
            _arrowIcon: { name: _props__WEBPACK_IMPORTED_MODULE_2__["default"].arrowIcon.value },
        };
        this.relations = {
            '../dropdown-item/dropdown-item': {
                type: 'child',
            },
        };
        this.lifetimes = {
            ready() {
                this.getAllItems();
            },
        };
        this.observers = {
            arrowIcon(v) {
                this.setData({
                    _arrowIcon: (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.calcIcon)(v),
                });
            },
            activeIdx(v) {
                this.triggerEvent(v === -1 ? 'close' : 'open');
            },
        };
        this.methods = {
            toggle(index) {
                const { activeIdx, duration } = this.data;
                const prevItem = this.$children[activeIdx];
                const currItem = this.$children[index];
                if (currItem === null || currItem === void 0 ? void 0 : currItem.data.disabled)
                    return;
                if (activeIdx !== -1) {
                    prevItem.triggerEvent('close');
                    prevItem.setData({
                        show: false,
                    }, () => {
                        setTimeout(() => {
                            prevItem.triggerEvent('closed');
                        }, duration);
                    });
                }
                if (index == null || activeIdx === index) {
                    this.setData({
                        activeIdx: -1,
                    });
                }
                else {
                    currItem.triggerEvent('open');
                    this.setData({
                        activeIdx: index,
                    });
                    currItem.setData({
                        show: true,
                    }, () => {
                        setTimeout(() => {
                            currItem.triggerEvent('opened');
                        }, duration);
                    });
                }
            },
            getAllItems() {
                const menus = this.$children.map(({ data }) => ({
                    label: data.label || data.computedLabel,
                    disabled: data.disabled,
                }));
                this.setData({
                    menus,
                });
            },
            handleToggle(e) {
                const { index } = e.currentTarget.dataset;
                this.toggle(index);
            },
            noop() { },
        };
    }
};
DropdownMenu = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], DropdownMenu);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (DropdownMenu);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/dropdown-menu/dropdown-menu.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=dropdown-menu.js.map