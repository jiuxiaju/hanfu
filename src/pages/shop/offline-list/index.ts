/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:23
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/components/shop/offline/offline.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aComponent } from '@ali/mor-core'
// import { searchOfflineShop } from '../../../services/shop';
aComponent({
  props: {
    className: '',
    data: {},
    onClick: () => { },
  },
  data: {
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsImage: [{ size: '100px', type: 'rect' }],    // 定义骨架屏图像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }] , // 定义骨架屏内容部分的占位
    filteredData: {},
    cur: {},
    position: [
      { value: 'top', text: '顶部弹出' },
      { value: 'left', text: '左侧弹出' },
      { value: 'center', text: '中间弹出' },
      { value: 'bottom', text: '底部弹出' },
      { value: 'right', text: '右侧弹出' },
    ],
    support: [],
    // visible: false ,// 控制弹窗显示状态
    options: [
      { label: '妆造', value: 'makeup' },
      { label: '摄影', value: 'photo_shoot' },
    ],
    dynamicFilters:{},
    mergedData:{},
    menuData: [],
    currentTab: 1,
    region: [],
    showLoading: true,        // 用于显示加载动画
    list: [],// 当完整的数据列表
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    showNoData: false,// 是否还有更多数据可显示
    supportLabel: '全部',
    areaLabel: '地区选择',
    config: {}
  },
  didMount() {
    this.onSearch();
    this.fetchMenuData();
  },
  methods: {
    handlePopup(e) {
      const { item } = e.currentTarget.dataset;

      this.setData(
        {
          cur: item,
        },
        () => {
          this.setData({ visible: true });
        },
      );
    },
    onVisibleChange(e) {
      this.setData({
        visible: e.detail.visible,
      });
    },
    onClick() {
    },
    onScrollViewScroll: function (e) {
      const scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
      const scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
      const scrollViewHeight = 700; // scroll-view 的固定高度
      const triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
      // 检查是否接近底部，并触发数据加载
      if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
        this.onScrollToLower();
      }
    },
    //监控页面滚动
    onScrollToLower: function () {
      // 当滑动到页面底部时触发
      const { list, displayList, currentDisplayCount, batchSize } = this.data;
      const nextDisplayCount = currentDisplayCount + batchSize;
      if (currentDisplayCount < list.length) {
        // 有更多数据可以加载
        const moreData = list.slice(currentDisplayCount, nextDisplayCount);
        this.setData({
          displayList: displayList.concat(moreData),
          currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
        });
      } 
    },
    handleItemClick(event) {
      const item = event.detail;
      // 检查 shouldNavigate 字段
      if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
        my.showToast({ title: '该店铺不可跳转', icon: 'none' });
        return;
      }
      const itemId = item._id;
      my.navigateTo({
        url: `/pages/shop/offline-detail/index?itemId=${itemId}`,
      })
    },
      //返回顶部
  handleToTop: function () {
    this.setData({ scrollTop: 0 })
  },
    // handleMenuData(event) {
    //   const filterData = event.detail;
    //   this.setData({
    //     filteredData: filterData
    //   });
    //   const filteredData = this.data.filteredData;
    //   console.log('filteredData12', filteredData)
    //   this.onSearch(filteredData)
    // },
    // handleDynamicChange(event) {
    //   const dynamicData = event.detail;
    //   this.setData({
    //     dynamicFilters: dynamicData
    //   });
    //   const filteredData = {
    //     ...this.data.menuFilters,
    //     ...dynamicData
    //   };
    //   console.log(filteredData, 'filteredData-dynamicFilters')
    //   this.queryInfoss(this.data.query, this.data.currentTab, filteredData, true);
    // },

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
    this.onSearch(filteredData,true)
    console.log(filteredData, 'filteredData-dynamicFilters')
  },
    onSearch(filteredData = {},isDynamicFilter = false) {
      console.log(filteredData,'filteredData2')
      wx.cloud. callFunction({
        // 云函数名称
        name: 'onsearchOfflineShop',
        // 传给云函数的参数
        data: {
          filteredData, // 传递筛选结果
        },
      })
        .then(res => {
          const result = res.result;
          if (result) {
            const dataList = result.data;
            if (dataList && dataList.length > 0) {
              const newData = {
                config: result.config,
                list: dataList,
                displayList: dataList.slice(0, this.data.batchSize),
                showLoading: false, // 数据加载完毕，隐藏加载动画
                showNoData: false,
                currentDisplayCount: 10
              };
              if (!isDynamicFilter) {
                newData.mergedData = result.mergedData || {};  // 仅在非动态筛选时更新 mergedData
              }
              this.setData(newData);
            } else {
              this.setData({
                showNoData: true,
                showLoading: false, // 数据加载完毕但是无数据，隐藏加载动画
              });
            }
          } else {
            this.setData({
              showNoData: true,
              showLoading: false, // 数据加载失败，显示无数据提示
            });
          }
        })
        .catch(err => {
          console.error(err);
          this.setData({
            showNoData: true,
            showLoading: false, // 请求失败，显示无数据提示
          });
        });
    }
  },

})


