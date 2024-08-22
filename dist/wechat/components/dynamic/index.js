"use strict";
(wx["mor_modules"] = wx["mor_modules"] || []).push([["components/dynamic/index"],{

/***/ "./components/dynamic/index.js":
/*!*************************************!*\
  !*** ./components/dynamic/index.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) {

/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "../node_modules/_tslib@2.6.3@tslib/tslib.es6.mjs");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @ali/mor-core */ "../node_modules/_@ali_mor-core@2.10.5@@ali/mor-core/lib/index.js");
/* harmony import */ var _ali_mor_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__);

// JavaScript (组件定义)

(0,_ali_mor_core__WEBPACK_IMPORTED_MODULE_0__.aComponent)({
    properties: {
        mergedData: {
            type: Object,
            value: {},
            observer: function (newVal) {
                // 每次 `items` 变化时执行，这里可以处理逻辑
                if (!newVal.hasOwnProperty('processed')) {
                    this.initializeTabs(); // 初始化标签
                }
            }
        }
    },
    data: {
        tabs: [],
        totalTabs: 0,
        selectedSingleValueTabs: [],
        selectedTabs: [],
        activeTab: null,
        isPanelOpen: false,
        selectedValues: {},
        selectedItems: [],
        finalValues: {},
        hasSelectedItems: false,
        singleValueTabs: [],
        activeSingleValueTab: [], // 当前激活的单一值标签
    },
    lifetimes: {
        attached: function () {
        }
    },
    methods: {
        // 初始化标签的方法
        initializeTabs: function () {
            var _this = this;
            var mergedData = this.data.mergedData;
            var fieldTranslations = mergedData.fieldTranslations;
            var tabsData = mergedData.tabsData;
            var tabs = [];
            var singleValueTabs = [];
            Object.keys(tabsData).forEach(function (key) {
                var dataContent = tabsData[key];
                // 仅处理非空的属性项
                if (dataContent && dataContent.length > 0) {
                    var translatedLabel = fieldTranslations[key] || key; // 使用字段映射
                    if (dataContent.length === 1) {
                        singleValueTabs.push({
                            label: translatedLabel,
                            content: dataContent[0],
                            value: key // 保留原始键值
                        });
                    }
                    else {
                        tabs.push({
                            label: translatedLabel,
                            content: _this.chunkArray(dataContent, 3),
                            value: key // 保留原始键值
                        });
                    }
                }
            });
            var totalTabs = singleValueTabs.length + tabs.length;
            this.setData({
                tabs: tabs,
                singleValueTabs: singleValueTabs,
                totalTabs: totalTabs
            });
        },
        // 将数组分块的方法
        chunkArray: function (myArray, chunk_size) {
            var tempArray = [];
            for (var index = 0; index < myArray.length; index += chunk_size) {
                var myChunk = myArray.slice(index, index + chunk_size);
                tempArray.push(myChunk);
            }
            return tempArray;
        },
        // 处理单个值标签点击事件
        onSingleValueTabClick: function (event) {
            var _a = event.currentTarget.dataset, value = _a.value, content = _a.content;
            var _b = this.data, finalValues = _b.finalValues, _c = _b.selectedSingleValueTabs, selectedSingleValueTabs = _c === void 0 ? [] : _c; // 默认值为空数组
            if (selectedSingleValueTabs.includes(value)) {
                // 如果当前选项已被选中，再次点击时重置为未选中状态
                var updatedSelectedSingleValueTabs = selectedSingleValueTabs.filter(function (item) { return item !== value; });
                delete finalValues[value];
                this.setData({
                    finalValues: finalValues,
                    selectedSingleValueTabs: updatedSelectedSingleValueTabs
                });
            }
            else {
                // 否则，将选中的值添加到finalValues并更新为选中状态
                selectedSingleValueTabs.push(value);
                finalValues[value] = content;
                this.setData({
                    finalValues: finalValues,
                    selectedSingleValueTabs: selectedSingleValueTabs
                });
            }
            this.onDynamicFilter(finalValues);
        },
        // 处理多项标签点击事件
        // 处理多项标签点击事件
        onTabClick: function (event) {
            var _a = this.data, tabs = _a.tabs, finalValues = _a.finalValues, selectedItems = _a.selectedItems, selectedValues = _a.selectedValues;
            var clickedTabValue = event.currentTarget.dataset.value; // 获取点击的标签的label
            console.log(selectedValues, 'selectedValues');
            if (this.data.activeTab === clickedTabValue) {
                // 如果点击的标签是当前激活的标签，则关闭选项区域
                this.setData({
                    activeTab: null,
                    isPanelOpen: false,
                    selectedItems: [],
                    hasSelectedItems: false
                });
            }
            else {
                // 每次重新打开标签时，都从 finalValues 初始化 selectedValues
                var newSelectedValues = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, selectedValues);
                newSelectedValues[clickedTabValue] = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__spreadArray)([], (finalValues[clickedTabValue] || []), true);
                var previousActiveTab = this.data.activeTab;
                // 清空未确认的选项
                if (previousActiveTab) {
                    selectedValues[previousActiveTab] = finalValues[previousActiveTab] || [];
                }
                this.setData({
                    activeTab: clickedTabValue,
                    isPanelOpen: true,
                    selectedItems: newSelectedValues[clickedTabValue],
                    hasSelectedItems: (newSelectedValues[clickedTabValue] || []).length > 0,
                    selectedValues: newSelectedValues,
                });
            }
        },
        closePanel: function () {
            this.setData({
                activeTab: null,
                isPanelOpen: false
            });
        },
        // 处理项目选择事件
        // 处理项目选择事件
        onItemSelect: function (event) {
            var value = event.currentTarget.dataset.value;
            var _a = this.data, activeTab = _a.activeTab, selectedValues = _a.selectedValues;
            var currentAttribute = activeTab;
            var selectedItems = selectedValues[currentAttribute] || [];
            console.log(selectedItems, 'selectedItems');
            var index = selectedItems.indexOf(value);
            if (index > -1) {
                selectedItems.splice(index, 1); // 移除已选项
            }
            else {
                selectedItems.push(value); // 添加新选项
            }
            selectedValues[currentAttribute] = selectedItems;
            console.log(selectedValues, 'selectedValues', selectedItems);
            this.setData({
                selectedItems: selectedItems,
                selectedValues: selectedValues,
                hasSelectedItems: selectedItems.length > 0
            });
        },
        // 重置选择项的方法
        // 重置选择项的方法
        onReset: function () {
            var _a = this.data, activeTab = _a.activeTab, selectedValues = _a.selectedValues, finalValues = _a.finalValues;
            var currentAttribute = activeTab;
            // 清空当前标签的选择项
            selectedValues[currentAttribute] = [];
            // 更新最终结果对象
            finalValues[currentAttribute] = [];
            this.setData({
                currentAttribute: currentAttribute,
                selectedValues: (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, selectedValues),
                finalValues: (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__assign)({}, finalValues),
                hasSelectedItems: Object.values(this.data.finalValues).some(function (arr) { return arr.length > 0; }),
                selectedItems: []
            });
            this.onDynamicFilter(finalValues);
            console.log(finalValues, 'finalValues-finalValues', this.data.selectedItems);
        },
        // 确认选择的方法
        onConfirm: function () {
            var _a = this.data, selectedValues = _a.selectedValues, finalValues = _a.finalValues;
            // 将当前的键值对添加到最终结果对象
            Object.keys(selectedValues).forEach(function (key) {
                finalValues[key] = selectedValues[key];
            });
            this.setData({
                finalValues: finalValues,
                selectedItems: [],
            });
            this.closePanel(); // 关闭面板
            this.onDynamicFilter(finalValues);
        },
        onDynamicFilter: function () {
            this.triggerEvent('dynamicData', this.data.finalValues);
        }
    }
});


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ __webpack_require__.O(0, ["mor.v"], function() { return __webpack_exec__("./components/dynamic/index.js"); });
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=index.js.map