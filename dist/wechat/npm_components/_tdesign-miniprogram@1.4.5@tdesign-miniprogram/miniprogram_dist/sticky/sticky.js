"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/sticky"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/sticky.js":
/*!********************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/sticky.js ***!
  \********************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/props.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _mixins_page_scroll__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mixins/page-scroll */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/page-scroll.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-sticky`;
const ContainerClass = `.${name}`;
let Sticky = class Sticky extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-content`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.behaviors = [(0,_mixins_page_scroll__WEBPACK_IMPORTED_MODULE_3__["default"])()];
        this.observers = {
            'offsetTop, disabled, container'() {
                this.onScroll();
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            containerStyle: '',
            contentStyle: '',
        };
        this.methods = {
            onScroll(event) {
                const { scrollTop } = event || {};
                const { container, offsetTop, disabled } = this.properties;
                if (disabled) {
                    this.setDataAfterDiff({
                        isFixed: false,
                        transform: 0,
                    });
                    return;
                }
                this.scrollTop = scrollTop || this.scrollTop;
                if (typeof container === 'function') {
                    Promise.all([(0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this, ContainerClass), this.getContainerRect()]).then(([root, container]) => {
                        if (!root || !container)
                            return;
                        if (offsetTop + root.height > container.height + container.top) {
                            this.setDataAfterDiff({
                                isFixed: false,
                                transform: container.height - root.height,
                            });
                        }
                        else if (offsetTop >= root.top) {
                            this.setDataAfterDiff({
                                isFixed: true,
                                height: root.height,
                                transform: 0,
                            });
                        }
                        else {
                            this.setDataAfterDiff({ isFixed: false, transform: 0 });
                        }
                    });
                    return;
                }
                (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this, ContainerClass).then((root) => {
                    if (!root)
                        return;
                    if (offsetTop >= root.top) {
                        this.setDataAfterDiff({ isFixed: true, height: root.height });
                        this.transform = 0;
                    }
                    else {
                        this.setDataAfterDiff({ isFixed: false });
                    }
                });
            },
            setDataAfterDiff(data) {
                const { offsetTop } = this.properties;
                const { containerStyle: prevContainerStyle, contentStyle: prevContentStyle } = this.data;
                const { isFixed, height, transform } = data;
                wx.nextTick(() => {
                    let containerStyle = '';
                    let contentStyle = '';
                    if (isFixed) {
                        containerStyle += `height:${height}px;`;
                        contentStyle += `position:fixed;top:${offsetTop}px;left:0;right:0;`;
                    }
                    if (transform) {
                        const translate = `translate3d(0, ${transform}px, 0)`;
                        contentStyle += `-webkit-transform:${translate};transform:${translate};`;
                    }
                    if (prevContainerStyle !== containerStyle || prevContentStyle !== contentStyle) {
                        this.setData({ containerStyle, contentStyle });
                    }
                    this.triggerEvent('scroll', {
                        scrollTop: this.scrollTop,
                        isFixed,
                    });
                });
            },
            getContainerRect() {
                const nodesRef = this.properties.container();
                return new Promise((resolve) => nodesRef.boundingClientRect(resolve).exec());
            },
        };
    }
    ready() {
        this.onScroll();
    }
};
Sticky = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Sticky);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Sticky);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/sticky/sticky.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=sticky.js.map