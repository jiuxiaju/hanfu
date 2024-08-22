import { aApp } from '@ali/mor-core'

aApp({
  globalData: {
    placeholderWords: [{
      query: "搜索推荐词...", // 初始值
      updated: false, // 标志是否已经更新
      text: '',
      currentTab: ''
    },],
    queryHistoryArr: [],// 全局存储的搜索历史记录
    dataReady: false,
    dataReadyCallback: null
  },
  onLaunch() {
    console.log("🚀 ~ file: app.ts:39 ~ onLaunch ~ onLaunch:")
    this.initCloud();
    this.updatePlaceholderWord();
    this.loadQueryHistory().then(() => {
      console.log('我loadQueryHistory执行完了')
      // 调用 updatePlaceholderWord 更新占位词
      this.updatePlaceholderWord();

    }
    ),
      // 演示如何获取 queryHistoryArr
      console.log('初始化时的 queryHistoryArr:', this.globalData.queryHistoryArr);
    this.globalData.sysinfo = wx.getSystemInfoSync()
    const updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
    })
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    })
    updateManager.onUpdateFailed(function () {
      // 新的版本下载失败
      wx.showModal({
        title: '更新提示',
        content: '新版本下载失败',
        showCancel: false
      })
    })
  },
  globalData: {
    sysinfo: {},
  },
  loadQueryHistory() {
    // 获取本地存储的历史记录
    try {
      const queryHistoryArr = wx.getStorageSync('queryHistory') || [];
      this.globalData.queryHistoryArr = queryHistoryArr;
    } catch (e) {
      console.error("Failed to load query history:", e);
    }
  },

  saveQueryHistory(queryHistoryArr: string[]) {
    // 保存搜索历史记录到本地存储
    try {
      wx.setStorageSync('queryHistory', queryHistoryArr);
      this.globalData.queryHistoryArr = queryHistoryArr;
    } catch (e) {
      console.error("Failed to save query history:", e);
    }

  },
  updatePlaceholderWord() {
    const { queryHistoryArr } = this.globalData;
    console.log(queryHistoryArr, 'queryHistoryArr')
    wx.cloud.callFunction({
      name: 'getPlaceholderWords', // 云函数名称
      data: {
        queryHistoryArr
      },
      success: res => {
        const result = res.result;
        if (Array.isArray(result) && result.length > 0) {
          this.globalData.placeholderWords = result.map(word => ({
            ...word,
            updated: true
          }));
          // 标记数据已准备好，并调用回调函数
          this.globalData.dataReady = true;
          if (this.globalData.dataReadyCallback) {
            this.globalData.dataReadyCallback();
          }
        }

        // 打印完整的 placeholderWord
        console.log('更新后的 placeholderWord:', this.globalData.placeholderWords);
      },
      fail: error => {
        console.error('Cloud function call failed: ', error);
      }
    });
  },
  // 定义全局方法获取路径和参数
  getCurrentPagePathWithArgs() {
    const pages = getCurrentPages(); // 获取加载的页面
    const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    const url = `/${currentPage.route}`; // 当前页面url

    // 获取页面参数
    const options = currentPage.options;
    const queryParameters = Object.keys(options)
      .map(key => `${key}=${options[key]}`)
      .join('&');

    return `${url}?${queryParameters}`;
  },
  // 定义全局方法生成分享信息
  generateShareInfo() {
    return new Promise(resolve => {
      const pathWithArgs = this.getCurrentPagePathWithArgs(); // 获取当前页面的路径和参数
      resolve({
        title: '九霞裾',
        path: pathWithArgs,
        // imageUrl: '/path/to/share-image.jpg' // 分享的图片路径
      });
    });
  },
  initCloud() {
    wx.cloud.init({
      env: 'jiuxiaju-7ghefl5n6fc39431',
    });
    console.log("🚀 ~ file: app.ts:47 ~ initCloud ~ wx.cloud:", wx.cloud)
  },
  /**
   * 转换富文本text
   * @param text
   * @returns
   */
  convertRichText(text: string) {
    if (text && typeof text === 'string') {
      // 处理图片宽度
      return text.replace(/<(img).*?(\/>|<\/img>)/g, function (mats) {
        if (mats.indexOf('style') < 0) {
          return mats.replace(/<\s*img/, '<img style="max-width:100%;height:auto;"');
        } else {
          return mats.replace(/style=("|')/, 'style=$1max-width:100%;height:auto;')
        }
      });
    }
    return text
  },
})
