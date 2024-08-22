/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:18
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/components/shop/online/online.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aComponent } from '@ali/mor-core'
const options = [
  {
    value: '1',
    label: '淘宝',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01uRn4VL1Oy57aWZzRo_!!6000000001773-2-tps-24-24.png',
  }, {
    value: '2',
    label: '拼多多',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01awoIdD1fq9jnbj1aV_!!6000000004057-0-tps-24-24.jpg',
  }, {
    value: '3',
    label: '抖音',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01mT75pL1yJ9tvR5weD_!!6000000006557-2-tps-24-24.png',
  }, {// 4 及以后为假数据
    value: '4',
    label: '京东',
    icon: 'https://gw.alicdn.com/imgextra/i1/O1CN01to53GL1W8LJ2iMnkW_!!6000000002743-2-tps-24-24.png',
  }, {
    value: '5',
    label: '微店',
    icon: 'https://gw.alicdn.com/imgextra/i2/O1CN01ZmFC5H1rKLcQlutEv_!!6000000005612-2-tps-24-24.png',
  }, {
    value: '6',
    label: '小红书',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01NzvJMm1L70NKjP0FP_!!6000000001251-2-tps-24-24.png',
  }
];
aComponent({
  props: {
    className: '',
    data: {},
    onClick: () => { },
  },
  data: {
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsImage: [{ size: '100px', type: 'rect' }],    // 定义骨架屏图像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    source: [],
    options,
    dynamicFilters: {},
    showLoading: true,    // 用于显示加载动画
    styleOptions: [
      {
        value: '衣裳',
        label: '衣裳'
      }
    ],
    menuFilters: {},
    menuData: [],
    filteredData: {},
    list: [],
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    showNoData: false,// 是否还有更多数据可显示
    style: [],
    sourceLabel: '店铺来源',
    styleLabel: '形制',
    config: {
      "online_shop_set": {
        "fields": ["style", "store"],
        "displayValuesOnly": ["style"],
        "fieldLabels": {},
        "styles": {
          "style": {
            "background-color": "#a866001a",
            "color": "#A86600"
          }
        }
      },
    },
    mergedData: {},
  },
  didMount() {
    this.onSearch();
    this.fetchMenuData();
  },
  methods: {
    onClick() {
    },
    handleSourceChange(event) {
      const { value } = event.detail;
      this.setData({
        source: event.detail.value,
        sourceLabel: value?.length ? `店铺来源(${value.length})` : '店铺来源'
      });
      this.onSearch();
    },
    handleStyleChange(event) {
      const { value } = event.detail;
      this.setData({
        style: value,
        styleLabel: value?.length ? `形制(${value.length})` : '形制'
      });
      this.onSearch();
    },
    onScrollViewScroll: function (e) {
      const scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
      const scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
      const scrollViewHeight = 700; // scroll-view 的固定高度
      const triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
      // 检查是否接近底部，并触发数据加载
      if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
        console.log('接近底部，加载更多数据...');
        this.onScrollToLower();
      }
    },
    onScrollToLower: function () {
      // 当滑动到页面底部时触发
      const { list, displayList, currentDisplayCount, batchSize } = this.data;
      console.log(currentDisplayCount, 'currentDisplayCount',)
      const nextDisplayCount = currentDisplayCount + batchSize;
      if (currentDisplayCount < list.length) {
        // 有更多数据可以加载
        const moreData = list.slice(currentDisplayCount, nextDisplayCount);
        this.setData({
          displayList: displayList.concat(moreData),
          currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
        });
        console.log(displayList, 'displayList')
      }
    },
    handleItemClick(event) {
      const item = event.detail;
      console.log(item, 'item')

      // 检查 shouldNavigate 字段
      if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
        my.showToast({ title: '该店铺不可跳转', icon: 'none' });
        return;
      }
      const itemId = item._id;
      my.navigateTo({
        url: `/pages/shop/online-detail/index?itemId=${itemId}`,
      })
    },
    fetchMenuData() {
      wx.cloud.callFunction({
        name: 'menuOptions', // 请替换成您的云函数名
      }).then((res) => {
        const result = res.result; // 这里接收到的result应该是一个数组
        this.setData({
          menuData: result
        })
      })
    },
    //菜单筛选
    handleMenuData(event) {
      const menuData = event.detail;
      this.setData({
        menuFilters: menuData
      });
      const filteredData = {
        ...menuData,
        ...this.data.dynamicFilters
      };
      this.onSearch(filteredData)
    },
    handleDynamicChange(event) {
      const dynamicData = event.detail;
      this.setData({
        dynamicFilters: dynamicData
      });
      const filteredData = {
        ...this.data.menuFilters,
        ...dynamicData
      };
      this.onSearch(filteredData, true)
      console.log(filteredData, 'filteredData-dynamicFilters')
    },
    onSearch: function (filteredData = {}, isDynamicFilter = false) {
      console.log(filteredData, 'filteredData-filteredData')
      // 调用云函数
      wx.cloud.callFunction({
        // 云函数名称
        name: 'onsearchOnineShop',
        // 传给云函数的参数
        data: {
          filteredData, // 传递筛选结果
        },
      }).
        then(res => {
          const result = res.result;
          console.log(result, 'result-result')
          if (result) {
            const dataList = result.data;
            if (dataList && dataList.length > 0) {
              // const newState = {
              //   config: result.config,
              //   list: dataList,
              //   displayList: dataList.slice(0, this.data.batchSize),
              //   showLoading: false, // 数据加载完毕，隐藏加载动画
              //   showNoData: false,
              //   currentDisplayCount: 10
              // };
              // if (!isDynamicFilter) {
              //   newState.mergedData = result.mergedData || {}; // 默认值为空对象
              // }
              // this.setData(newState, () => {
              //   wx.nextTick(() => {
              //     console.log('Force update');
              //     // 强制更新视图

              //   });
              // });
              // console.log(newState,'newState')

              this.setData({
                list: dataList,
                displayList: dataList.slice(0, this.data.batchSize),
                showLoading: false,
                showNoData: false,
                config:result.config , 
                currentDisplayCount: 10

              });
              if (!isDynamicFilter) {
                this.setData({
                  mergedData:result.mergedData || {}
                })
              }
            } else {
              this.setData({
                showNoData: true,
                showLoading: false, // 数据加载完毕但是无数据，隐藏加载动画
              });
            }
          } else {
            // 请求失败或云函数执行不成功
            this.setData({
              showNoData: true,
              showLoading: false, // 数据加载失败，显示无数据提示
            });
          }
        }).catch(err => {
          console.error(err);
          // 处理任何在请求中发生的错误
          console.error('云函数调用失败：', err);
          this.setData({
            showNoData: true,
            showLoading: false, // 请求失败，显示无数据提示
          });
        });
    }
  }
})