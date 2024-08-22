"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/icon"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/icon.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/icon.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
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




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-icon`;
let Icon = class Icon extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.data = {
            componentPrefix: prefix,
            classPrefix: name,
            isImage: false,
            iconStyle: undefined,
        };
        this.observers = {
            'name, color, size, style'() {
                this.setIconStyle();
            },
        };
        this.methods = {
            onTap(event) {
                this.triggerEvent('click', event.detail);
            },
            setIconStyle() {
                return __awaiter(this, void 0, void 0, function* () {
                    const { name, color, size, classPrefix } = this.data;
                    const isImage = name.indexOf('/') !== -1;
                    const sizeValue = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.addUnit)(size);
                    const colorStyle = color ? { color: color } : {};
                    const fontStyle = size ? { 'font-size': sizeValue } : {};
                    const iconStyle = Object.assign(Object.assign({}, colorStyle), fontStyle);
                    if (isImage) {
                        const { height } = yield (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.getRect)(this, `.${classPrefix}`);
                        const iconSize = sizeValue || (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.addUnit)(height);
                        iconStyle.width = iconSize;
                        iconStyle.height = iconSize;
                    }
                    this.setData({
                        isImage,
                        iconStyle: `${(0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.styles)(iconStyle)}`,
                    });
                });
            },
        };
    }
};
Icon = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Icon);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Icon);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/icon/icon.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=icon.js.map