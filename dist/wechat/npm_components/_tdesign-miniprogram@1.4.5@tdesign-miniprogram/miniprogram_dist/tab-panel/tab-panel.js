"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/tab-panel"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/tab-panel.js":
/*!**************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/tab-panel.js ***!
  \**************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/props.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-tab-panel`;
let TabPanel = class TabPanel extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.relations = {
            '../tabs/tabs': {
                type: 'ancestor',
            },
        };
        this.options = {
            multipleSlots: true,
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.data = {
            prefix,
            classPrefix: name,
            active: false,
            hide: true,
            id: '',
        };
        this.observers = {
            'label, badgeProps, disabled, icon, panel, value'() {
                this.update();
            },
        };
    }
    setId(id) {
        this.setData({ id });
    }
    getComputedName() {
        if (this.properties.value != null) {
            return `${this.properties.value}`;
        }
        return `${this.index}`;
    }
    update() {
        var _a;
        (_a = this.$parent) === null || _a === void 0 ? void 0 : _a.updateTabs();
    }
    render(active, parent) {
        this.setData({
            active,
            hide: !parent.data.animation && !active,
        });
    }
};
TabPanel = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], TabPanel);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (TabPanel);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tab-panel/tab-panel.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=tab-panel.js.map