"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["npm_components/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/tabs"],{

/***/ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/tabs.js":
/*!****************************************************************************************************!*\
  !*** ../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/tabs.js ***!
  \****************************************************************************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var _common_src_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../common/src/index */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/src/index.js");
/* harmony import */ var _props__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./props */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/props.js");
/* harmony import */ var _common_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../common/config */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/config.js");
/* harmony import */ var _mixins_touch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../mixins/touch */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/mixins/touch.js");
/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../common/utils */ "../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/common/utils.js");
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





const { prefix } = _common_config__WEBPACK_IMPORTED_MODULE_2__["default"];
const name = `${prefix}-tabs`;
const getUniqueID = (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.uniqueFactory)('tabs');
let Tabs = class Tabs extends _common_src_index__WEBPACK_IMPORTED_MODULE_0__.SuperComponent {
    constructor() {
        super(...arguments);
        this.options = {
            pureDataPattern: /^currentLabels$/,
        };
        this.behaviors = [_mixins_touch__WEBPACK_IMPORTED_MODULE_3__["default"]];
        this.externalClasses = [
            `${prefix}-class`,
            `${prefix}-class-item`,
            `${prefix}-class-active`,
            `${prefix}-class-track`,
            `${prefix}-class-content`,
        ];
        this.relations = {
            '../tab-panel/tab-panel': {
                type: 'descendant',
                linked(target) {
                    this.children.push(target);
                    this.initChildId();
                    target.index = this.children.length - 1;
                    this.updateTabs();
                },
                unlinked(target) {
                    this.children = this.children.filter((item) => item.index !== target.index);
                    this.updateTabs(() => this.setTrack());
                    this.initChildId();
                },
            },
        };
        this.properties = _props__WEBPACK_IMPORTED_MODULE_1__["default"];
        this.controlledProps = [
            {
                key: 'value',
                event: 'change',
            },
        ];
        this.observers = {
            value(name) {
                if (name !== this.getCurrentName()) {
                    this.setCurrentIndexByName(name);
                }
            },
        };
        this.data = {
            prefix,
            classPrefix: name,
            tabs: [],
            currentLabels: [],
            currentIndex: -1,
            trackStyle: '',
            offset: 0,
            scrollLeft: 0,
            tabID: '',
            placement: 'top',
        };
        this.lifetimes = {
            created() {
                this.children = this.children || [];
            },
            attached() {
                wx.nextTick(() => {
                    this.setTrack();
                });
                (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this, `.${name}`).then((rect) => {
                    this.containerWidth = rect.width;
                });
                this.setData({
                    tabID: getUniqueID(),
                });
            },
        };
        this.methods = {
            onScroll(e) {
                const { scrollLeft } = e.detail;
                this.setData({
                    scrollLeft,
                });
            },
            updateTabs(cb) {
                const { children } = this;
                const tabs = children.map((child) => child.data);
                tabs.forEach((item) => {
                    if (typeof item.icon === 'string') {
                        item.icon = { name: item.icon };
                    }
                });
                this.setData({ tabs }, cb);
                this.setCurrentIndexByName(this.properties.value);
            },
            setCurrentIndexByName(name) {
                const { children } = this;
                const index = children.findIndex((child) => child.getComputedName() === `${name}`);
                if (index > -1) {
                    this.setCurrentIndex(index);
                }
            },
            setCurrentIndex(index) {
                if (index <= -1 || index >= this.children.length)
                    return;
                const Labels = [];
                this.children.forEach((child, idx) => {
                    const isActive = index === idx;
                    if (isActive !== child.data.active) {
                        child.render(isActive, this);
                    }
                    Labels.push(child.data.label);
                });
                const { currentIndex, currentLabels } = this.data;
                if (currentIndex === index && currentLabels.join('') === Labels.join(''))
                    return;
                this.setData({
                    currentIndex: index,
                    currentLabels: Labels,
                }, () => {
                    this.setTrack();
                });
            },
            getCurrentName() {
                if (this.children) {
                    const activeTab = this.children[this.data.currentIndex];
                    if (activeTab) {
                        return activeTab.getComputedName();
                    }
                }
            },
            calcScrollOffset(containerWidth, targetLeft, targetWidth, offset) {
                return offset + targetLeft - (1 / 2) * containerWidth + targetWidth / 2;
            },
            getTrackSize() {
                return new Promise((resolve, reject) => {
                    if (this.trackWidth) {
                        resolve(this.trackWidth);
                        return;
                    }
                    (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this, `.${prefix}-tabs__track`)
                        .then((res) => {
                        if (res) {
                            this.trackWidth = res.width;
                            resolve(this.trackWidth);
                        }
                    })
                        .catch(reject);
                });
            },
            setTrack() {
                return __awaiter(this, void 0, void 0, function* () {
                    const { children } = this;
                    if (!children)
                        return;
                    const { currentIndex } = this.data;
                    if (currentIndex <= -1)
                        return;
                    try {
                        const res = yield (0,_common_utils__WEBPACK_IMPORTED_MODULE_4__.getRect)(this, `.${prefix}-tabs__item`, true);
                        const rect = res[currentIndex];
                        if (!rect)
                            return;
                        let count = 0;
                        let distance = 0;
                        let totalSize = 0;
                        res.forEach((item) => {
                            if (count < currentIndex) {
                                distance += item.width;
                                count += 1;
                            }
                            totalSize += item.width;
                        });
                        if (this.containerWidth) {
                            const offset = this.calcScrollOffset(this.containerWidth, rect.left, rect.width, this.data.scrollLeft);
                            const maxOffset = totalSize - this.containerWidth;
                            this.setData({
                                offset: Math.min(Math.max(offset, 0), maxOffset),
                            });
                        }
                        if (this.data.theme === 'line') {
                            const trackLineWidth = yield this.getTrackSize();
                            distance += (rect.width - trackLineWidth) / 2;
                        }
                        this.setData({
                            trackStyle: `-webkit-transform: translateX(${distance}px);
            transform: translateX(${distance}px);
          `,
                        });
                    }
                    catch (err) {
                        this.triggerEvent('error', err);
                    }
                });
            },
            onTabTap(event) {
                const { index } = event.currentTarget.dataset;
                this.changeIndex(index);
            },
            onTouchStart(event) {
                if (!this.properties.swipeable)
                    return;
                this.touchStart(event);
            },
            onTouchMove(event) {
                if (!this.properties.swipeable)
                    return;
                this.touchMove(event);
            },
            onTouchEnd() {
                if (!this.properties.swipeable)
                    return;
                const { direction, deltaX, offsetX } = this;
                const minSwipeDistance = 50;
                if (direction === 'horizontal' && offsetX >= minSwipeDistance) {
                    const index = this.getAvailableTabIndex(deltaX);
                    if (index !== -1) {
                        this.changeIndex(index);
                    }
                }
            },
            onTouchScroll(event) {
                this._trigger('scroll', event.detail);
            },
            changeIndex(index) {
                const currentTab = this.data.tabs[index];
                const { value, label } = currentTab;
                if (!(currentTab === null || currentTab === void 0 ? void 0 : currentTab.disabled) && index !== this.data.currentIndex) {
                    this._trigger('change', { value, label });
                }
                this._trigger('click', { value, label });
            },
            getAvailableTabIndex(deltaX) {
                const step = deltaX > 0 ? -1 : 1;
                const { currentIndex, tabs } = this.data;
                const len = tabs.length;
                for (let i = step; currentIndex + step >= 0 && currentIndex + step < len; i += step) {
                    const newIndex = currentIndex + i;
                    if (newIndex >= 0 && newIndex < len && tabs[newIndex]) {
                        if (!tabs[newIndex].disabled) {
                            return newIndex;
                        }
                    }
                    else {
                        return currentIndex;
                    }
                }
                return -1;
            },
        };
    }
    initChildId() {
        this.children.forEach((item, index) => {
            item.setId(`${this.data.tabID}_panel_${index}`);
        });
    }
};
Tabs = __decorate([
    (0,_common_src_index__WEBPACK_IMPORTED_MODULE_0__.wxComponent)()
], Tabs);
/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (Tabs);


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("../node_modules/_tdesign-miniprogram@1.4.5@tdesign-miniprogram/miniprogram_dist/tabs/tabs.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=tabs.js.map