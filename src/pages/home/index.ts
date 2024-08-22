import { aPage } from '@ali/mor-core'
import { get } from '../../services'

import dayjs from 'dayjs'

aPage({
  data: {
    swiperList: [],
    activityList: [],
    recommendArticles: [],
    isLoadingSwiper: true,       // 用于控制骨架屏显示的变量
    titleBarHeight: 0,
    isLoadingContent: true,
    statusBarHeight: 0,
    currentTab: '',
    text: '',
    currentPlaceholder: '汉服是什么',
    currentQuery: '', // 当前选中的 query
    currentText: '', // 当前选中的 text
    stickyProps: {
      offsetTop: 38,
    },
    swiperData:[],
    tabs: [],
    placeholder: "",
    placeholderWords: [
      { query: "汉服", text: "汉服活动推荐", currentTab: "5" },
      { query: "北京", text: "北京的汉服实体店推荐", currentTab: "1" },
      { query: "汉服运动", text: "汉服运动是什么", currentTab: "0" },
      { query: "汉服是什么", text: "汉服是什么" }
    ],
    articleList: [],
    isGlobalDataReady: false, // 是否已加载全局数据
    containerHeight: 0,
    searchInputHeight: 0,
    searchButtonHeight: 0,
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    rowColsImage: [{ height: '192px', width: '100%', type: 'rect' }],
    currentSwiperIndex: 0,
    visible: true, config: {
      "activity_set": {
        "fields": ["address",],
        "displayValuesOnly": ["tags", "seasons"],
        "fieldLabels": { "address": "地址" }
      }
    },
    suggestionMapping: []
  },
  onLoad() {
    let that = this;
    this.getActivities();
    wx.cloud.callFunction({
      name: 'suggestion', // 云函数名称
      success: function (res) {
        // 把获取到的数组赋值给页面数据中的mockData
        const result = res.result;
        console.log(result, 'result')
        that.setData({
          suggestionMapping: result.simpleArray
        });
      },
      fail: function (error) {
        console.error('Cloud function call failed: ', error);
      }
    });
    const app = getApp<IAppOption>();

    this.setDataFromDefault();
    this.waitForGlobalData().then(() => {
      this.setDataFromGlobalData();
      this.setPlaceholderWord();
      this.setData({ isGlobalDataReady: true });
    }).catch(error => {
      console.error('全局数据加载失败:', error);
    });

    this.startPlaceholderUpdateTimer(); // 启动定期更新定时器
    //判断场景值
    const launchOptions = wx.getLaunchOptionsSync()
    const scene = launchOptions.scene

    // 检查是否为场景值1089（从其他小程序返回）
    if (scene !== 1089) {
      // 不是从其他小程序返回，可以显示`t-notice-bar`
      this.setData({ visible: true })
      // 设置定时器3秒后隐藏`t-notice-bar`
      setTimeout(() => {
        this.setData({ visible: false })
      }, 3000)
    } else {
      // 是从其他小程序返回的场景，不显示`t-notice-bar`
      this.setData({ visible: false })
    }
    // 获取手机基础信息(状态栏高度)
    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight
    const titleBarHeight = this.getTitleBarHeight(statusBarHeight)
    this.setData({
      titleBarHeight: titleBarHeight,
      statusBarHeight: statusBarHeight,
    }, () => {
      console.log("状态栏高度（statusBarHeight）:", this.data.statusBarHeight);
      console.log("标题栏高度（titleBarHeight）:", this.data.titleBarHeight);
    }


    )
    // 获取广告位图片
    get('/home/getBannerImgs').then((data) => {
      this.setData({
        swiperList: data.map((o: any) => o.url),
        swiperData: data,
        isLoadingSwiper: false
      })
      console.log(data, 'dat1a')
    })
    wx.cloud.callFunction({
      name: 'onsearchArticle', // 云函数名称
      success: function (res) {
        // 把获取到的数组赋值给页面数据中的mockData
        const result = res.result;
        console.log(result, 'result')
        that.setData({
          articleList: result.data,
          config: result.config
        });
        that.processData(that.data.articleList);
      },
      fail: function (error) {
        console.error('Cloud function call failed: ', error);
      }
    });
  },
  startPlaceholderUpdateTimer() {
    setInterval(() => {
      if (this.data.isGlobalDataReady) {
        this.setPlaceholderWord();
      } else {
        console.log('使用本地默认占位符');
        this.setDataFromDefault();
      }
    }, 5000);
  },
  setDataFromDefault() {
    this.setPlaceholderWord();
  },

  waitForGlobalData() {
    const app = getApp<IAppOption>();
    return new Promise<void>((resolve, reject) => {
      const checkInterval = setInterval(() => {
        if (app.globalData.dataReady) {
          clearInterval(checkInterval);
          resolve();
        }
      }, 500);

      setTimeout(() => {
        clearInterval(checkInterval);
        if (app.globalData.dataReady) {
          resolve();
        } else {
          reject(new Error('全局数据加载超时'));
        }
      }, 10000);
    });
  },
  setDataFromGlobalData() {
    const app = getApp<IAppOption>();
    const placeholderWords = app.globalData.placeholderWords || [];

    if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
      this.setData({
        queryHistoryArr: app.globalData.queryHistoryArr || [],
        placeholderWords
      });

      console.log('页面更新时获得的 placeholderWords:', this.data.placeholderWords);

      this.setPlaceholderWord();
    } else {
      console.error('全局数据 placeholderWords 无效或未初始化');
    }
  },
  setPlaceholderWord() {
    const { placeholderWords } = this.data;

    if (Array.isArray(placeholderWords) && placeholderWords.length > 0) {
      const randomIndex = Math.floor(Math.random() * placeholderWords.length);
      const selectedPlaceholder = placeholderWords[randomIndex];

      if (selectedPlaceholder) {
        this.setData({
          placeholder: selectedPlaceholder.text,
          currentQuery: selectedPlaceholder.query,
          currentText: selectedPlaceholder.text,
          currentTab: selectedPlaceholder.currentTab,
          currentPlaceholder: selectedPlaceholder.text,
        });
      } else {
        console.error('选中的 placeholder 无效');
      }
    } else {
      console.error('placeholderWords 数据无效或为空');
    }
  },
  // 处理数据，将推荐文章和按artype分开的文章分开，不处理数据内容
  processData: function (data) {
    const recommendArticles = [];
    const artypeArticlesMap = {};
    // 定义所有类型和标签
    const labels = ['推荐', '穿搭', '妆造', '文学', '六艺', '其他'];
    const artypeValues = ['recommend', '穿搭', '妆造', '文学', '六艺', '其他'];

    // 初始化每个artype的类别
    artypeValues.slice(1).forEach(artype => {
      artypeArticlesMap[artype] = [];
    });

    // 分类数据 - 处理推荐
    data.forEach(article => {
      if (article.recommend) {
        recommendArticles.push(article);
      }
    });

    // 分类数据 - 处理具体类型
    data.forEach(article => {
      const artype = article.artype;
      if (artypeValues.includes(artype)) {
        artypeArticlesMap[artype].push(article);
      } else {
        console.warn(`Unrecognized artype: ${artype}`, article);
      }
    });

    // 生成 Tabs 数据
    const tabs = [
      { label: '推荐', value: '0', articles: recommendArticles },
      ...artypeValues.slice(1).map((artype, index) => {
        const label = labels[index + 1];
        return {
          label: label,
          value: artype,
          articles: artypeArticlesMap[artype] || [] // 确保无数据时为[]
        };
      })
    ];
    this.setData({
      tabs: tabs,
      isLoadingContent: false
    });
  },
  getActivities() {
    wx.cloud.callFunction({
      name: 'getActivities', // 云函数名称
    }).then((res) => {
      const result = res.result; // 云函数返回的结果
      console.log(result, 'result')
      // 更新组件的 state
      this.setData({
        activityList: result.data,
        config: res.result.config,
        isLoadingContent: false
      });
      // 打印处理后的数据列表
      console.log('Updated Info List:', this.data.activityList);
    }).catch((error) => {
      console.error('Error calling cloud function:', error);
      // this.setData({ showLoading: false }); // 处理错误时, 隐藏加载动画
    });

  },
  // 计算titleBar的高度，微信小程序无法自动提供
  getTitleBarHeight: function (statusBarHeight) {
    try {
      const { top, height } = wx.getMenuButtonBoundingClientRect()
      return (top - statusBarHeight) * 2 + height
    } catch (error) {
      return 48 // 默认标题栏高度
    }
  },
  //分享给好友
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
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看',
    }
  },
  //悬浮指引点击事件，点击取消
  click(e) {
    const { trigger } = e.detail
    console.log(`click on the ${trigger} area`)
    this.setData({
      visible: false,
    })
  },
  //组件库轮播图有bug，
  onTapSwiper: function (e) {
    const index = e.currentTarget.dataset.index // 获取点击的图片索引
    const { jump, jump_link,appId,extraData} = this.data.swiperData[index]
    // console.log('点击的轮播图数据:', this.data.swiperData[index])
    switch (jump) {
      case '1':
        // 这里假设 jump_link 已经是一个有效的相对路径
        wx.navigateTo({
          url: `${jump_link}`,
          fail: () => {
            wx.navigateTo({ url: '/pages/home/index' })
          },
        })
        break
      case '2':
        // 这里假设 appId 和 path 已经在 swiperData 中定义
        wx.openEmbeddedMiniProgram({
          appId: appId,
          path: jump_link,
          extraData:extraData,
          success(res) {
            console.log('跳转成功', res);
          },
          fail(err) {
            console.error('跳转失败', err);
            wx.showToast({
              title: '跳转失败，请稍后再试',
              icon: 'none',
              duration: 2000
            });
          }
        });
      default:
        // 如果没有定义跳转逻辑，可以在这里处理
        break
    }
  },
  handleItemClick(e) {
    const item = e.detail;
    // 判断 item.source，根据两种情况分别跳转页面
    if (item.source === 'activity_set') {
      // 跳转到页面1
      my.navigateTo({
        url: `/pages/activity-list/detail/index?activityId=${item._id}`,
      });
    } else if (item.source === 'article') {
      // 跳转到页面2
      my.navigateTo({
        url: `/pages/article/detail?articleId=${item._id}`,
      });
    }
  },
  //对富文本进行处理
  getRitch(rich: any) {
    if (!rich) {
      return ''
    }
    const richClone = rich.replace(/<[^>]*>/g, '')
    return richClone
  },
  // 跳转页面的统一函数
  jump2Page(e: any) {
    const pathKey = e.currentTarget.dataset.path; // 获取key值
    // const routePath = this.data.routeMap[pathKey]; // 根据key获取路径
    console.log(pathKey, 'pathKey', e.currentTarget)
    if (pathKey === 'sports') {
      // 如果 pathKey 是 'sports'，跳转到 sports 页面
      my.navigateTo({
        url: '/pages/sports/index'
      });
    } else if (pathKey === 'population-list') {
      my.navigateTo({
        url: '/pages/population-list/index/index'
      });
    } else {
      my.navigateTo({
        url: '/pages/activity-list/index/index'
      });
    }
  },
  // 跳转到活动详情页面
  jump2ActivityDetailPage(e: any) {
    const { _id } = e.currentTarget.dataset.item
    my.navigateTo({
      url: `/pages/activity/detail?activityId=${_id}`,
    })
  },
  // 跳转到文章详情页面
  jump2ArticleDetailPage(e: any) {
    const { _id } = e.currentTarget.dataset.item
    my.navigateTo({
      url: `/pages/article/detail?articleId=${_id}`,
    })
  },
  onJump2Search() {
    my.navigateTo({ url: '/pages/search/search' })
  },
  onSearchButtonClick() {
    const text = this.data.currentPlaceholder; // 如果 query 为空，使用默认占位符
    const currentTab = this.data.currentTab;
    const query = this.data.currentQuery;
    console.log(query, currentTab, text)
    this.handleSearch(query, currentTab, text)
  },
  queryInfos(query, currentTab = '0', text = '') {
    console.log('query:', query, 'currentTab:', currentTab, text);
    if (!text) {
      text = query;
    }
    my.navigateTo({
      url: `/pages/result/result?query=${encodeURIComponent(query)}&currentTab=${currentTab}&text=${encodeURIComponent(text)}`
    });
  },
  handleSearch: function (query, currentTab, text) {
    // 检查输入(query)是否为空
    // 在suggestionMapping数组中查找匹配项
    const matchingItem = this.data.suggestionMapping.find(item => item.fieldA === query);
    if (matchingItem) {
      // 如果找到匹配项，导航到matchingItem指定的URL
      my.navigateTo({
        url: matchingItem.link
      });
    } else {
      // 如果没有找到匹配项，执行查询Infos逻辑显示搜索结果
      this.queryInfos(query, currentTab, text);
    }
    // 更新查询历史记录，可能会将query加入到某个存储搜索历史的数组
  },
})
