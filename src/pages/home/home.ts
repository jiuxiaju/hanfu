import { aPage } from '@ali/mor-core'
import { get } from '../../services'

import dayjs from 'dayjs'

aPage({
  data: {
    swiperList: [],
    swiperData: [],
    activityList: [],
    recommendArticles: [],
    titleBarHeight: 0,
    statusBarHeight: 0,
    stickyProps: {
      offsetTop: 276
    },
    marginTop: 0,
    currentSwiperIndex: 0,
    visible: true,
  },
  onLoad() {
    const launchOptions = wx.getLaunchOptionsSync();
    const scene = launchOptions.scene;
  
    // 检查是否为场景值1089（从其他小程序返回）
    if (scene !== 1089) {
      // 不是从其他小程序返回，可以显示`t-notice-bar`
      this.setData({ visible: true });
  
      // 设置定时器3秒后隐藏`t-notice-bar`
      setTimeout(() => {
        this.setData({ visible: false });
      }, 3000);
    } else {
      // 是从其他小程序返回的场景，不显示`t-notice-bar`
      this.setData({ visible: false });
    }
    // 获取手机基础信息(状态栏高度)
    const statusBarHeight = wx.getSystemInfoSync().statusBarHeight;
    const titleBarHeight = this.getTitleBarHeight(statusBarHeight);
    const marginTop = titleBarHeight + statusBarHeight;
    this.setData({
      titleBarHeight: titleBarHeight,
      statusBarHeight: statusBarHeight,
      marginTop: marginTop,
    }, () => {
      // 打印信息
      console.log('statusBarHeight2:', statusBarHeight);
      console.log('titleBarHeight2:', titleBarHeight);
      console.log('marginTop:', marginTop);
    });
    // 获取广告位图片
    get('/home/getBannerImgs').then((data) => {
      this.setData({ swiperList: data.map((o: any) => o.url), swiperData: data })
      console.log(data)
    })

    // 获取近期活动
    get('/home/getActivities', {}).then((data) => {
      this.setData({
        activityList: data.map((o: any) => ({
          ...o,
          title: o.name,
          desc: this.getRitch(o.detail),
          url: o.cover,
          rangeDate: `${dayjs(o.startTime).format('MM月DD日')}~${dayjs(o.emdTime).format(
            'MM月DD日'
          )}`,
        })),
      })
    })
    // 获取推荐文章/配置文章
    //这里是把文章的推荐、分类放一个数组了，需要分开可以分开
    get('/home/getArticles').then((data: any) => {
      const data0 = data[0].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const data1 = data[1].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const data2 = data[2].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const data3 = data[3].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const data4 = data[4].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const data5 = data[5].map((o: any) => ({ ...o, article2: this.getRitch(o.article) }));
      const recommendArticles: any = [data0, data1, data2, data3, data4, data5];
      this.setData({
        recommendArticles
      })
    })
  },
  // 计算titleBar的高度，微信小程序无法自动提供
  getTitleBarHeight: function (statusBarHeight) {
    try {
      const { top, height } = wx.getMenuButtonBoundingClientRect();
      return (top - statusBarHeight) * 2 + height;
    } catch (error) {
      return 48; // 默认标题栏高度
    }
  },
  //分享给好友
  onShareAppMessage() {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve({
          title: '九霞裾'
        })
      }, 20)
    })
    return {
      title: '九霞裾',
      path: '/pages/home',
      promise
    }
  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  click(e) {
    const { trigger } = e.detail;
    console.log(`click on the ${trigger} area`);
    this.setData({
      visible: false
    });
  },
  //组件库轮播图有bug，
  onTapSwiper: function (e) {
    const index = e.currentTarget.dataset.index; // 获取点击的图片索引
    const { jump, jump_link } = this.data.swiperData[index];
    console.log('点击的轮播图数据:', this.data.swiperData[index]);
    switch (jump) {
      case '1':
        // 这里假设 jump_link 已经是一个有效的相对路径
        wx.navigateTo({
          url: `/pages${jump_link}`,
          fail: () => {
            wx.navigateTo({ url: '/pages/home/home' });
          },
        });
        break;
      default:
        // 如果没有定义跳转逻辑，可以在这里处理
        break;
    }
  },
  getRitch(rich: any) {
    if (!rich) {
      return ''
    }
    const richClone = rich.replace(/<[^>]*>/g, "")
    return richClone;
  },
  // 跳转页面的统一函数
  jump2Page(e: any) {
    const path = e.currentTarget.dataset.path
    my.navigateTo({
      url: `/pages/${path}/${path}`,
      fail: () => {
        my.navigateTo({ url: '/pages/home/pageNotFound' })
      },
    })
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

})
