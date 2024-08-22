import { aPage } from '@ali/mor-core'
import { get } from '../../../services'

// 获取全局 app 实例
const app = getApp()
interface InfoList {
  label: string
  value: any
  key: string
}
aPage({
  data: {
    infoList: [],
    stickyProps: {
    },
    isFirstLoad: true ,       // 标志是否为初次加载
    filteredData: {},
    config: {
      "knowledge_set": {
        "fields": ["chaodai", "tags", "seasons", "detail"],
        "displayValuesOnly": ["tags", "seasons", "detail"],
        "fieldLabels": { "chaodai": "朝代" },
        "styles": {
          "chaodai": {
            "background-color": "#a866001a",
            "color": "#A86600"
          },
          "seasons": {
            "background-color": "#e0ffe0",
            "color": "#53A101"
          }
        }
      },
    },
    mergedData: {},
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsImage: [{ size: '100px', type: 'rect' }],    // 定义骨架屏图像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    showLoading: true,        // 用于显示加载动画
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    list: [],
  },
  onLoad() {
    this.getpopulationList()
  },
  //分享给好友
  onShareAppMessage() {
    const app = getApp(); // 获取全局应用实例

    const promise = new Promise(resolve => {
      app.generateShareInfo().then(shareInfo => {
        // 在这里处理生成的分享信息
        resolve(shareInfo);
      });
    });
    return {
      title: '九霞裾',
      path: '/pages/home', // 这个值会被 promise 里面的 pathWithArgs 覆盖
      promise
    };
  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  onPullDownRefresh() {
    this.getpopulationList()
  },
  onStickyScroll(event) {
    console.log(event.detail);
  },
  onScrollViewScroll: function (e) {
    const scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
    const scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
    const scrollViewHeight = 700; // scroll-view 的固定高度
    const triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）

    // 检查是否接近底部，并触发数据加载
    if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
      console.log('接近底部，加载更多数据...');
      // this.loadMoreData();
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
    }
  },
  // 获取科普列表
  getpopulationList(filteredData = {}) {
    console.log(filteredData,'filteredData')
    wx.cloud.callFunction({
      name: 'onsearchpopulation',
      data: {
        filteredData // 将 filteredData 传递给云函数作为过滤条件
      }
    }).then(data => {
      console.log(data, 'data')
      const result = data.result;
      const cardList = result.data;
      // 判断是否为初次加载，更新 mergedData
      const newMergedData = this.data.isFirstLoad ? result.mergedData : this.data.mergedData;
      this.setData({
        list: cardList,
        displayList: cardList.slice(0, this.data.batchSize),
        showLoading: false,
        currentDisplayCount: 10,
        mergedData:newMergedData,
        config:result.configTemplates
      })
      console.log(this.data.config, 'config')
    })
  },
  handleDynamicChange(event) {
    const filteredData = event.detail;
    // 打印调试信息
    console.log(filteredData, 'filteredData-dynamicFilters')
    this.setData({
      isFirstLoad: false,// 设置为非初次加载
      filterObject: filteredData
    }, () => {
      this.getpopulationList(filteredData);
    });
  },
  //返回顶部
  handleToTop: function () {
    this.setData({ scrollTop: 0 })
  },
  getRitch(rich: any) {
    if (!rich) {
      return ''
    }
    const richClone = rich.replace(/<[^>]*>/g, "")
    return richClone;
  },
  handleItemClick(event) {
    const Item = event.detail;
    my.navigateTo({ url: `/pages/population-list/detail/index?PopulationById=${Item._id}` })
  },
})


