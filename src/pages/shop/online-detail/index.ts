
import { aPage } from '@ali/mor-core'
aPage({
  data: {
    list: [],// 当完整的数据列表
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    shopInfo: {},
    dianming: '',
    menuData: [],
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    rowColsImage: [{ size: '100px', type: 'rect' }],    // 定义骨架屏图像部分的占位
    isLoadingContent: true,
    config: {
      "hanfu_style": {
        // "fields": ['brand', 'sizes', 'delivery_time'],
        // "displayValuesOnly": [],
        // "fieldLabels": { 'brand': "品牌", 'sizes': "尺码", 'delivery_time': '发货周期' },
        // "styles": {
        //   "brand": {
        //     "background-color": "#6dd40033",
        //     "color": "#53A101"
        //   }
        // }
        fields: ['brand', 'size', 'delivery_time', 'gender'],
        displayValuesOnly: [],
        fieldLabels: { 'brand': "品牌", 'size': "尺码", 'delivery_time': '发货周期', 'gender': '适宜性别' },
        styles: {
            brand: {
                "background-color": "#6dd40033",
                "color": "#53A101"
            }
        }
        , search: {
        },
        imageStyles: {
            width: "70%"  // 默认图像宽度为100%
        }
      },
    },
    filteredData: {},
    mergedData:[]
  },
  onLoad(query) {
    this.stylelist();
    this.fetchMenuData();
    const itemId = query.itemId || '';
    this.setData({
      itemId: itemId
    });
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "online-detail",
        data: {
          itemId
        }
      })
      .then((res) => {
        console.log(res, 'res')
        const result = res.result;
        this.setData({
          shopInfo: result.data[0],
        });
        console.log(this.data.shopInfo, 'shopInfo')
      })
  },
  methods: {
    onShareAppMessage() {
      const promise = new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            title: '九霞裾',
          })
        }, 20)
      })
      return {
        title: '九霞裾',
        path: '/pages/home',
        promise,
      }
    },
    onShareTimeline: function () {
      return {
        title: '快来看看',
      }
    },
    handleMultipleSelect(e) {
      this.setData({
        'multipleSelect.value': e.detail.value,
      });
    }
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
  //监控页面滚动
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
  handleItemClick(event) {
    const item = event.detail;
    const itemId = event.detail._id;
    console.log(itemId, 'itemId')

    // 检查 shouldNavigate 字段
    if (!item.hasOwnProperty('shouldNavigate') || !item.shouldNavigate) {
      my.showToast({ title: '该款式不可跳转', icon: 'none' });
      return;
    }
    my.navigateTo({
      url: `/pages/shop/style/index?itemId=${itemId}`,
    })
  },
  fetchMenuData() {
    wx.cloud.callFunction({
      name: 'menuOptions', // 请替换成您的云函数名
    }).then((res) => {
      const result = res.result; // 这里接收到的result应该是一个数组
      console.log(result, 'rmenuDataesult'); // 查看返回数据
      this.setData({
        menuData: result
      })
    })
  },
  stylelist(filteredData = {}) {
    const itemId = this.data.itemId;
    console.log(itemId, filteredData,'itemId')
    wx.cloud
      .callFunction({
        // 云函数名称
        name: "stylelist",
        data: {
          itemId,
          filteredData
        }
      }).then((res) => {
        console.log(res, 'res1')
        const result = res.result;
        const styleList = result.data;
        const newProducts = styleList.filter(item => item.isNew);
        this.setData({
          config: result.config,
          currentDisplayCount: 10,
          list: styleList,
          newProducts: newProducts,
          displayList: styleList.slice(0, this.data.batchSize),
          isLoadingContent: false,
        });
        console.log(newProducts, this.data.config,'newProducts')
      })
  },
  handleMenuData(event) {
    const filterData = event.detail;
    this.setData({
      filteredData: filterData
    });
    const filteredData = this.data.filteredData;
    console.log('filteredData12', filteredData)
    this.stylelist(filteredData)
  },
  navigateToUrl(event) {
    const style = event.currentTarget.dataset.style;
    console.log('navigateToUrl:', style); // 调试输出
    my.navigateTo({
      url: `/pages/population-list/detail/index?style=${style}`,
    })
  }
})



