import { aPage } from '@ali/mor-core'

aPage({
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
    query: '',
    text: '',
    currentTab: 0, // 默认值
    navbarHeight: 0,
    showSearchResult: false, // 是否展示搜索结果
    stickyProps: {
      offsetTop: 80,
    },
    renderMarker: [],  // 标记每个item是否已经渲染
    showLoading: true, // 用于显示加载动画
    list: [],// 当完整的数据列表
    backTopTheme: 'round', // 示例值，可根据需求调整
    backTopText: '顶部', // 示例值，可根据需求调整
    scrollTop: 0, // 示例值，可根据需求调整
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    showNoData: false,// 是否还有更多数据可显示
    scrollTimeoutId: null,
    config: {
      "offline_shop_set": {
        "fields": ["tags", "adress"],
        "displayValuesOnly": ["adress", "tags"],
        "fieldLabels": {},
        "styles": {
          "tags": {
            "background-color": "#6dd40033",
            "color": "#53A101"
          }
        }
      },
      "activity_set": {
        "fields": ["address",],
        "displayValuesOnly": ["tags", "seasons"],
        "fieldLabels": { "address": "地址" }
      },
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
      "hanfu_style": {
        "fields": ['brand', 'sizes', 'delivery_time'],
        "displayValuesOnly": [],
        "fieldLabels": { 'brand': "品牌", 'sizes': "尺码", 'delivery_time': '发货周期' },
        "styles": {
          "brand": {
            "background-color": "#6dd40033",
            "color": "#53A101"
          }
        }
      },
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
    menuData: [],
    // 存储每步的时间情况
    stepTimes: [],
    menuFilters: {},
    dynamicFilters: {},
    scrollTopUpdates: [],
    showCard: false,
    targetWord: '汉服', // 这里设定你想要匹配的词
    filteredData: {
    },
  },
  onLoad: function (options) {
      // 获取系统信息
      // 使用选择器查询组件
      const query = wx.createSelectorQuery();
      query.select('#navbar').boundingClientRect();
      query.exec((res) => {
        if (res[0]) {
          const navbarHeight = res[0].height + 42; // 导航栏高度加100
          this.setData({
            navbarHeight,
          });
        }
      });
    console.log(this.data.navbarHeight,'navbarHeight')
    const { currentTab, text } = options;
    console.log(currentTab, 'currentTab', text);
    this.setData({
      currentTab: currentTab,
      text: text
    });
    if (options.query) {
      const query = decodeURIComponent(options.query);
      this.setData({
        query: query,
      });
      //接受参数，进行结果搜索。
      this.queryInfoss(query);
      this.fetchMenuData();
    }
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
  // 分享好友
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
  onInputFocus: function (e) {
    // 返回上一页
    wx.navigateBack({
      delta: 1 // 返回上一级页面
    });
  },
  onScrollViewScroll: function (e) {
    const scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
    const scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
    const scrollViewHeight = 700; // scroll-view 的固定高度
    const triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）
    // 检查是否接近底部，并触发数据加载
    if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
      this.onScrollToLower()
    }
  },
  //监控页面滚动
  onScrollToLower: function () {
    // 当滑动到页面底部时触发
    const { list, displayList, currentDisplayCount, batchSize } = this.data;
    const nextDisplayCount = currentDisplayCount + batchSize;
    console.log(currentDisplayCount, 'currentDisplayCount')
    if (currentDisplayCount < list.length) {
      // 有更多数据可以加载
      const moreData = list.slice(currentDisplayCount, nextDisplayCount);
      // 将新的数据追加到现有的 displayList 中
      const updatedDisplayList = this.data.displayList.concat(moreData);
      this.setData({
        displayList: updatedDisplayList,
        currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
        showNoData: nextDisplayCount >= list.length // 当没有更多数据时显示提示，否则不显示
      });
    } else {
      // 如果没有更多的数据来加载
      this.setData({
        showNoData: true
      });
    }
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
    this.queryInfoss(this.data.query, this.data.currentTab, filteredData);
    this.handleToTop();
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
    console.log(filteredData, 'filteredData-dynamicFilters')
    this.queryInfoss(this.data.query, this.data.currentTab, filteredData, true);
    this.handleToTop();
  },
  // 搜索和筛选函数
  queryInfoss(query = this.data.query, tab = this.data.currentTab, filteredData = {}, isDynamicFilter = false) {
    // 立即显示加载提示
    wx.showLoading({ title: '搜索中' });
    wx.cloud.callFunction({
      name: 'search',
      data: {
        query,
        tab: tab === 'all' ? undefined : tab,
        filteredData
      }
    })
      .then(res => {
        wx.hideLoading(); // 搜索成功后隐藏加载提示
        const result = res.result;
        this.setData({
          list: result.data,
          currentTab: tab,
          config: result.config,
          query,
          currentDisplayCount: 10,
          showSearchResult: true,
          displayList: result.data.slice(0, this.data.batchSize), // 初始显示第一批数据
        })
        // 仅在非动态筛选时更新 tabsData
        if (!isDynamicFilter) {
          this.setData({
            mergedData: result.mergedData || {}, // 默认值为空对象
          })
        }
      })
      .catch(err => {
        console.error(err);
      });
  },
  //返回顶部
  handleToTop: function () {
    console.log(this.data.displayList, '测试分步加载一场')
    this.setData({ scrollTop: 0 })
  },
  // handleToTop() {
  //   wx.pageScrollTo({
  //     scrollTop: 0,
  //     duration: 500  // 滚动动画的持续时间，默认是 300ms
  //   });
  // },
  // onRenderComplete(e) {
  //   const { id } = e.detail;
  //   const { renderMarker, displayList } = this.data;
  //   console.log('已完成',id)
  
  //      // 如果 renderMarker 中没有此 id，则标记其为已渲染
  //      if (!renderMarker.includes(id)) {
  //       renderMarker.push(id);
        
  //       // 更新 displayList 中对应 id 的项，增加已处理字段
  //       const updatedDisplayList = displayList.map(item => 
  //         item._id === id ? { ...item, isRendered: true } : item
  //       );
  //       this.setData({ 
  //         renderMarker,
  //         displayList: updatedDisplayList 
  //       });
  //       // 在调用 setData 后立即检查是否更新
  //       console.log('updatedDisplayList:', updatedDisplayList);
  //       console.log('displayList after update:', this.data.displayList);
  //     }
  // },
  //tab切换之后，再次搜索。
  onTabsChange(e: { detail: { value: string | undefined } }) {
    this.setData({
      filteredData: {
      }
    })
    this.queryInfoss(this.data.query, e.detail.value);
    this.handleToTop();
  },
  // 检查是否可跳转的方法
  checkShouldNavigate(item, successCallback) {
    if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
      my.showToast({ title: '该卡片不可跳转', icon: 'none' });
      return;
    }
    successCallback();
  },

  handleItemClick(event) {
    const Item = event.detail;
    // // 根据不同的source进行不同的跳转或逻辑处理
    switch (Item.source) {
      case 'activity_set':
        my.navigateTo({
          url: `/pages/activity-list/detail/index?activityId=${Item._id}`,
        })
        break;
      case 'offline_shop_set':
        this.checkShouldNavigate(Item, () => {
          my.navigateTo({
            url: `/pages/shop/offline-detail/index?itemId=${Item._id}`,
          });
        });
        break;
      case 'article':
        my.navigateTo({
          url: `/pages/article/detail?articleId=${Item._id}`,
        })
        break;
      case 'knowledge_set':
        my.navigateTo({
          url: `/pages/population-list/detail/index?PopulationById=${Item._id}`,
        })
        break;
      case 'online_shop_set':
        this.checkShouldNavigate(Item, () => {
          my.navigateTo({
            url: `/pages/shop/online-detail/index?itemId=${Item._id}`,
          });
        });
        break;
      case 'hanfu_style':
        this.checkShouldNavigate(Item, () => {
          my.navigateTo({
            url: `/pages/shop/style/index?itemId=${Item._id}`,
          });
        });
        break;
      // 添加更多 case 根据不同的 source 处理不同的跳转或逻辑
      default:
        console.log('暂时没有')
        break;
    }
  }
})
