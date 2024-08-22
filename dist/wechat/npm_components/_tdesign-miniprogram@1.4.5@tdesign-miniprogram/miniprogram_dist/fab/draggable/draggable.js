"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/draggable"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/draggable.js":
/*!******************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/draggable.js ***!
  \******************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




const systemInfo = wx.getSystemInfoSync();
const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-draggable`;
let Draggable = class Draggable extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.externalClasses = [`${prefix}-class`];
        this.data = {
            prefix,
            classPrefix: name,
        };
        this.lifetimes = {
            ready() {
                this.computedRect();
            },
        };
        this.methods = {
            onTouchStart(e) {
                if (this.properties.direction === 'none')
                    return;
                this.startX = e.touches[0].clientX + systemInfo.windowWidth - this.rect.right;
                this.startY = e.touches[0].clientY + systemInfo.windowHeight - this.rect.bottom;
                this.triggerEvent('start', { startX: this.startX, startY: this.startY, rect: this.rect, e });
            },
            onTouchMove(e) {
                if (this.properties.direction === 'none')
                    return;
                let x = this.startX - e.touches[0].clientX;
                let y = this.startY - e.touches[0].clientY;
                if (this.properties.direction === 'vertical') {
                    x = systemInfo.windowWidth - this.rect.right;
                }
                if (this.properties.direction === 'horizontal') {
                    y = systemInfo.windowHeight - this.rect.bottom;
                }
                this.triggerEvent('move', { x, y, rect: this.rect, e });
            },
            onTouchEnd(e) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (this.properties.direction === 'none')
                        return;
                    yield this.computedRect();
                    this.triggerEvent('end', { rect: this.rect, e });
                });
            },
            computedRect() {
                return __awaiter(this, void 0, void 0, function* () {
                    this.rect = { right: 0, bottom: 0, width: 0, height: 0 };
                    this.rect = yield (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getRect)(this, `.${this.data.classPrefix}`);
                });
            },
        };
    }
};
Draggable = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Draggable);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Draggable);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/fab/draggable/draggable.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=draggable.js.map