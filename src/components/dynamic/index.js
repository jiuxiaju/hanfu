// JavaScript (组件定义)
import { aComponent } from '@ali/mor-core';

aComponent({
  properties: {
    mergedData: {
      type: Object, // 或者 String 看你的具体情况
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
    tabs: [], // 存储生成的标签信息
    totalTabs: 0,
    selectedSingleValueTabs: [],
    selectedTabs: [],
    activeTab: null, // 当前激活的标签
    isPanelOpen: false, // 控制遮罩层的显示
    selectedValues: {}, // 存储用户选择的值，键值对。键是标签名，值是数组
    selectedItems: [], // 存储当前选中的项目，初始为空数组
    finalValues: {}, // 最终的结果对象
    hasSelectedItems: false,// 是否有选中的项目，用于控制按钮的禁用状态
    singleValueTabs: [], // 存储单个值的标签信息
    activeSingleValueTab: [], // 当前激活的单一值标签
  },
  lifetimes: {
    attached() {
    }
  },
  methods: {
    // 初始化标签的方法
    initializeTabs() {
      const { mergedData } = this.data;
      const fieldTranslations = mergedData.fieldTranslations;
      const tabsData = mergedData.tabsData;
      const tabs = [];
      const singleValueTabs = [];
      Object.keys(tabsData).forEach(key => {
        const dataContent = tabsData[key];
        // 仅处理非空的属性项
        if (dataContent && dataContent.length > 0) {
          const translatedLabel = fieldTranslations[key] || key; // 使用字段映射
          if (dataContent.length === 1) {
            singleValueTabs.push({
              label: translatedLabel,
              content: dataContent[0],
              value: key // 保留原始键值
            });
          } else {
            tabs.push({
              label: translatedLabel,
              content: this.chunkArray(dataContent, 3),
              value: key // 保留原始键值
            });
          }
        }
      });
      const totalTabs = singleValueTabs.length + tabs.length;
      this.setData({
        tabs, singleValueTabs
        , totalTabs
      });
    },
    // 将数组分块的方法
    chunkArray(myArray, chunk_size) {
      const tempArray = [];
      for (let index = 0; index < myArray.length; index += chunk_size) {
        let myChunk = myArray.slice(index, index + chunk_size);
        tempArray.push(myChunk);
      }
      return tempArray;
    },
    // 处理单个值标签点击事件
    onSingleValueTabClick(event) {
      const { value, content } = event.currentTarget.dataset;
      const { finalValues, selectedSingleValueTabs = [] } = this.data; // 默认值为空数组
      if (selectedSingleValueTabs.includes(value)) {
        // 如果当前选项已被选中，再次点击时重置为未选中状态
        const updatedSelectedSingleValueTabs = selectedSingleValueTabs.filter(item => item !== value);
        delete finalValues[value];
        this.setData({
          finalValues,
          selectedSingleValueTabs: updatedSelectedSingleValueTabs
        });
      } else {
        // 否则，将选中的值添加到finalValues并更新为选中状态
        selectedSingleValueTabs.push(value);
        finalValues[value] = content;

        this.setData({
          finalValues,
          selectedSingleValueTabs
        });
      }
      this.onDynamicFilter(finalValues)
    },
    // 处理多项标签点击事件
    // 处理多项标签点击事件
    onTabClick(event) {
      const { tabs, finalValues, selectedItems, selectedValues } = this.data;
      const clickedTabValue = event.currentTarget.dataset.value; // 获取点击的标签的label
      console.log(selectedValues,'selectedValues')
      if (this.data.activeTab === clickedTabValue) {
        // 如果点击的标签是当前激活的标签，则关闭选项区域
        this.setData({
          activeTab: null,
          isPanelOpen: false,
          selectedItems: [],
          hasSelectedItems: false
        });
      } else {
        // 每次重新打开标签时，都从 finalValues 初始化 selectedValues
        const newSelectedValues = { ...selectedValues };
        newSelectedValues[clickedTabValue] = [...(finalValues[clickedTabValue] || [])];
        const previousActiveTab = this.data.activeTab;
        // 清空未确认的选项
        if (previousActiveTab) {
          selectedValues[previousActiveTab] = finalValues[previousActiveTab] || [];
        }
        this.setData({
          activeTab: clickedTabValue,
          isPanelOpen: true,
          selectedItems: newSelectedValues[clickedTabValue],
          hasSelectedItems: (newSelectedValues[clickedTabValue] || []).length > 0,
          selectedValues:newSelectedValues,
        });
      }
    },// 关闭面板的方法
    closePanel() {
      this.setData({
        activeTab: null,
        isPanelOpen: false
      });
    },
    // 处理项目选择事件
    // 处理项目选择事件
    onItemSelect(event) {
      const { value } = event.currentTarget.dataset;
      const { activeTab, selectedValues } = this.data;
      const currentAttribute = activeTab;
      let selectedItems = selectedValues[currentAttribute] || [];
      console.log(selectedItems, 'selectedItems')
      const index = selectedItems.indexOf(value);
      if (index > -1) {
        selectedItems.splice(index, 1); // 移除已选项
      } else {
        selectedItems.push(value); // 添加新选项
      }
      selectedValues[currentAttribute] = selectedItems;
      console.log(selectedValues, 'selectedValues', selectedItems)
      this.setData({
        selectedItems,
        selectedValues,
        hasSelectedItems: selectedItems.length > 0
      });
    },
    // 重置选择项的方法
    // 重置选择项的方法
    onReset() {
      const { activeTab, selectedValues, finalValues } = this.data;
      const currentAttribute = activeTab;
      // 清空当前标签的选择项
      selectedValues[currentAttribute] = [];
      // 更新最终结果对象
      finalValues[currentAttribute] = [];
      this.setData({
        currentAttribute,
        selectedValues: { ...selectedValues },
        finalValues: { ...finalValues },
        hasSelectedItems: Object.values(this.data.finalValues).some(arr => arr.length > 0),
        selectedItems: []
      });
      this.onDynamicFilter(finalValues)
      console.log(finalValues, 'finalValues-finalValues',this.data.selectedItems)
    },
    // 确认选择的方法
    onConfirm() {
      const { selectedValues, finalValues } = this.data;
      // 将当前的键值对添加到最终结果对象
      Object.keys(selectedValues).forEach(key => {
        finalValues[key] = selectedValues[key];
      });
      this.setData({
        finalValues,
        selectedItems: [],
      })
      this.closePanel(); // 关闭面板
      this.onDynamicFilter(finalValues)
    },
    onDynamicFilter() {
      this.triggerEvent('dynamicData', this.data.finalValues);

    }
  }
});
