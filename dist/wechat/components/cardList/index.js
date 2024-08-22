"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/cardList/index"],{

/***/ "./components/cardList/index.ts":
/*!**************************************!*\
  !*** ./components/cardList/index.ts ***!
  \**************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);


(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    properties: {
        // 定义组件的属性
        config: {
            type: Object,
            value: {}
        },
        cardData: {
            type: Object,
            value: {},
            observer: function (newVal) {
                // 每次 `items` 变化时执行，这里可以处理逻辑
                if (!newVal.hasOwnProperty('processed')) {
                    this.setCardData(newVal);
                }
            }
        },
    },
    data: {
        formattedItem: {},
        displayedItems: {},
        infoValueStyle: '',
        swiperMaxHeight: '',
        imageClass: '',
    },
    observer: function () {
    },
    lifetimes: {
        attached: function () {
            // 组件实例进入页面节点树时触发
            // this.setCardData();
            this.printProps(); // 在组件布局完成后（含外层节点）打印 properties
        },
        detached: function () {
            // 当组件实例被从页面节点中移除时执行
            this.printProps(); // 在组件布局完成后（含外层节点）打印 properties
        },
        ready: function () {
            // 假设这个生命周期表示渲染完成
            this.triggerEvent('renderComplete', { id: this.data.cardData._id });
        }
    },
    methods: {
        onCardTap: function (event) {
            // console.log(event, 'evu222en')
            var item = this.properties.cardData;
            this.triggerEvent('itemClick', item);
        },
        printProps: function () {
            // const { config, cardData, mappingRules } = this.properties;
            // console.log('Config:', config);
            // console.log('Card Data:', cardData);
            // console.log('Card mappingRules:', mappingRules);
        },
        // 定义组件的方法
        /**
 * 设置卡片数据，根据当前时间调整每个卡片的状态。
 * 此函数处理cardData数组，根据每个项的source属性和当前时间，
 * 更新其状态，并根据配置信息格式化卡片的其他属性。
 */
        setCardData: function () {
            // 解构获取cardData和config数据
            var _a = this.properties, cardData = _a.cardData, config = _a.config;
            // 获取当前时间戳
            console.log(cardData, 'cardData-cardData', config);
            var currentTime = Date.now();
            var processedData = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, cardData);
            // 处理 activity_set 类型的 activityStatus 
            if (cardData.source === 'activity_set') {
                if (cardData.startTime && cardData.endTime) {
                    if (cardData.startTime > currentTime) {
                        processedData.activityStatus = "未开始";
                    }
                    else if (cardData.endTime < currentTime) {
                        processedData.activityStatus = "已结束";
                    }
                    else {
                        processedData.activityStatus = "进行中";
                    }
                }
                else {
                    console.warn("Missing startTime or endTime for activity_set item");
                }
            }
            var selectedConfig = config[cardData.source];
            // 格式化卡片项，包括标题、标志和信息
            var formattedItem = {
                title: cardData.title,
                images: cardData.images,
                info: config[cardData.source] ? this.processInfo(cardData, config[cardData.source]) : [],
                activityStatus: processedData.activityStatus,
                source: cardData.source,
                style: cardData.style,
                processed: true,
                imageClass: this.generateImageClass(selectedConfig.imageStyles.width || '100%'),
                _id: cardData._id,
                shouldNavigate: cardData.shouldNavigate
            };
            this.setData({
                infoValueStyle: this.generateInfoValueStyle(selectedConfig.infoValueStyles),
                swiperMaxHeight: selectedConfig.logoSwiper.maxHeight, // 使用默认高度，必要时可进行条件判断切换
            });
            // 如果是 activity_set 类型且有开始和结束时间，添加日期范围信息
            if (cardData.source === 'activity_set' && cardData.startTime && cardData.endTime) {
                var dateInfo = this.formatDateRange(cardData.startTime, cardData.endTime);
                formattedItem.info.push(dateInfo);
            }
            // 更新组件数据
            this.setData({
                processedInfo: formattedItem.info,
                cardData: formattedItem,
                formattedItem: formattedItem
            });
        },
        /**
         * 处理信息项，根据配置提取和格式化信息。
         * @param item 待处理的信息对象。
         * @param config 配置对象，包括需要提取的字段、显示策略、字段标签和样式。
         * @returns 返回一个格式化后的信息数组，每个元素包含字段的标签、值、是否显示标签、样式和值是否为数组等信息。
         */
        //对info区域进行处理
        processInfo: function (item, config) {
            var _this = this;
            if (config === void 0) { config = {}; }
            // 解构配置对象，默认值包括空数组和空对象。
            var _a = config.fields, fields = _a === void 0 ? [] : _a, _b = config.displayValuesOnly, displayValuesOnly = _b === void 0 ? [] : _b, _c = config.fieldLabels, fieldLabels = _c === void 0 ? {} : _c, _d = config.styles, styles = _d === void 0 ? {} : _d;
            var infoArray = [];
            fields.forEach(function (field) {
                // 检查字段在item中是否存在且不为空
                if (item.hasOwnProperty(field) && item[field] !== undefined && item[field] !== null) {
                    var fieldValue = item[field];
                    var label = fieldLabels[field] || "";
                    var displayLabel = !displayValuesOnly.includes(field);
                    // 根据字段和来源类型，处理富文本字段
                    if ((field === 'detail' && (item.source === 'activity_set' || item.source === 'knowledge_set')) ||
                        (field === 'article' && item.source === 'article')) {
                        fieldValue = _this.getRitch(fieldValue); // 特殊处理富文本字段并截取前100个字符
                    }
                    // 合并默认样式和自定义样式
                    var defaultStyles = {
                        color: "#000", // 默认颜色
                        // backgroundColor: '#fff' // 默认背景颜色
                    };
                    var customStyles = styles[field] || {};
                    var combinedStyles = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)((0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, defaultStyles), customStyles);
                    // 特殊处理store字段
                    if (field === 'store') {
                        infoArray.push({
                            label: '店铺来源',
                            value: item.store.label,
                            displayLabel: displayLabel,
                            styles: _this.convertStylesToString(combinedStyles),
                            isArray: false,
                            icon: item.store.icon || '' // 添加icon字段，值为item.icon
                        });
                    }
                    else {
                        // 添加处理后的字段信息到结果数组
                        infoArray.push({
                            label: label,
                            value: fieldValue,
                            displayLabel: displayLabel,
                            styles: _this.convertStylesToString(combinedStyles),
                            isArray: Array.isArray(fieldValue) // 标记是否为数组
                        });
                    }
                }
            });
            return infoArray;
        },
        // 辅助函数: 将时间戳转换为格式化的日期字符串
        formatDateRange: function (startTime, endTime) {
            var startDate = new Date(startTime);
            var endDate = new Date(endTime);
            var formatDate = function (date) {
                return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, '0') + "-" + String(date.getDate()).padStart(2, '0');
            };
            return {
                label: "日期",
                value: formatDate(startDate) + "~" + formatDate(endDate),
                displayLabel: true,
                styles: {}
            };
        },
        // 辅助函数: 去除富文本的 HTML 标签并截取前100个字符
        getRitch: function (rich) {
            if (!rich)
                return '';
            var richClone = rich.replace(/<[^>]*>/g, '');
            return richClone.slice(0, 100); // 截取前100个字符
        },
        // 转换样式对象为字符串
        convertStylesToString: function (styles) {
            return Object.entries(styles).map(function (_a) {
                var key = _a[0], value = _a[1];
                return key + ": " + value;
            }).join(";");
        },
        generateInfoValueStyle: function (styleConfig) {
            return "\n              -webkit-line-clamp: " + (styleConfig.lineClamp || 3) + ";\n              line-height: " + (styleConfig.lineHeight || '1.5em') + ";\n              max-height: " + (styleConfig.lineClamp ? parseFloat(styleConfig.lineHeight) * styleConfig.lineClamp + 'em' : '4.5em') + ";\n            ";
        },
        generateImageClass: function (width) {
            switch (width) {
                case '100%':
                    return 'logo-image-100';
                case '70%':
                    return 'logo-image-70';
                default:
                    console.warn("Unexpected image width: " + width + ", falling back to 70%.");
                    return 'logo-image-100';
            }
        },
        // 合并样式
        mergeStyles: function (baseStyle, additionalStyle) {
            return baseStyle + " " + additionalStyle;
        }
    },
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/cardList/index.ts"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map