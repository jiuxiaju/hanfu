"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/skeleton"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/skeleton.js":
/*!************************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/skeleton.js ***!
  \************************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/props.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_1__["default"];
const name = `${prefix}-skeleton`;
const ThemeMap = {
    avatar: [{ type: 'circle', size: '96rpx' }],
    image: [{ type: 'rect', size: '144rpx' }],
    text: [
        [
            { width: '24%', height: '32rpx', marginRight: '32rpx' },
            { width: '76%', height: '32rpx' },
        ],
        1,
    ],
    paragraph: [1, 1, 1, { width: '55%' }],
};
let Skeleton = class Skeleton extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.externalClasses = [`${prefix}-class`, `${prefix}-class-col`, `${prefix}-class-row`];
        this.properties = _props__WEBPACK_IMPORTED_MODULE_2__["default"];
        this.data = {
            prefix,
            classPrefix: name,
            parsedRowcols: [],
        };
        this.observers = {
            rowCol() {
                this.init();
            },
            'loading, delay'() {
                this.isShowSkeleton();
            },
        };
        this.lifetimes = {
            attached() {
                this.init();
                this.isShowSkeleton();
            },
        };
        this.methods = {
            init() {
                const { theme, rowCol } = this.properties;
                const rowCols = [];
                if (rowCol.length) {
                    rowCols.push(...rowCol);
                }
                else {
                    rowCols.push(...ThemeMap[theme || 'text']);
                }
                const parsedRowcols = rowCols.map((item) => {
                    if ((0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.isNumber)(item)) {
                        return [
                            {
                                class: this.getColItemClass({ type: 'text' }),
                                style: {},
                            },
                        ];
                    }
                    if (Array.isArray(item)) {
                        return item.map((col) => {
                            return Object.assign(Object.assign({}, col), { class: this.getColItemClass(col), style: this.getColItemStyle(col) });
                        });
                    }
                    const nItem = item;
                    return [
                        Object.assign(Object.assign({}, nItem), { class: this.getColItemClass(nItem), style: this.getColItemStyle(nItem) }),
                    ];
                });
                this.setData({
                    parsedRowcols,
                });
            },
            getColItemClass(obj) {
                return (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.classNames)([
                    `${name}__col`,
                    `${name}--type-${obj.type || 'text'}`,
                    `${name}--animation-${this.properties.animation}`,
                ]);
            },
            getColItemStyle(obj) {
                const styleName = [
                    'width',
                    'height',
                    'marginRight',
                    'marginLeft',
                    'margin',
                    'size',
                    'background',
                    'backgroundColor',
                    'borderRadius',
                ];
                const style = {};
                styleName.forEach((name) => {
                    if (name in obj) {
                        const px = (0,_common_utils__WEBPACK_IMPORTED_MODULE_3__.isNumber)(obj[name]) ? `${obj[name]}px` : obj[name];
                        if (name === 'size') {
                            [style.width, style.height] = [px, px];
                        }
                        else {
                            style[name] = px;
                        }
                    }
                });
                return style;
            },
            isShowSkeleton() {
                const { loading, delay } = this.properties;
                if (!loading || delay === 0) {
                    this.setData({
                        isShow: loading,
                    });
                    return;
                }
                setTimeout(() => {
                    this.setData({
                        isShow: loading,
                    });
                }, delay);
            },
        };
    }
};
Skeleton = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Skeleton);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Skeleton);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/skeleton/skeleton.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=skeleton.js.map