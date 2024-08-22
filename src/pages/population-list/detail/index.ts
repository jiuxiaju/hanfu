import { aPage } from '@ali/mor-core';

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    current: 0,
    duration: 600,
    interval: 5000,
    swiperList: [],
    rowColsImage: [{ height: '400px', width: '80%', type: 'rect' }],
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }], // 定义骨架屏内容部分的占位
    isLoadingSwiper: true,
    isLoadingContent: true

  },
  onLoad(options) {
    console.log('页面参数 options:', options);
    const { PopulationById, style } = options;
    console.log(options,'')
    console.log('PopulationById:', PopulationById);  // 打印的内容会是字符串
    console.log('style:', style);  // 打印的内容会是字符串
    if (PopulationById) {
      console.log(PopulationById,'PopulationById-PopulationById')
      this.setData({ PopulationById ,style}); // 设置 PopulationById 到数据中
      this.PopulationById = PopulationById;
      this.style = style;
      this.getArticleDetail();
    }else{
      console.log(style,'style-style')
      this.setData({ style}); // 设置 PopulationById 到数据中
      this.style = style;
      this.getArticleDetail();
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
  getArticleDetail() {
    const { PopulationById,style } = this.data; // 访问数据中的 PopulationById 和 styleName
    console.log(style,'style')
    wx.cloud.callFunction({
      // 云函数名称
      name: 'population-detail',
      // 传给云函数的参数
      data: {
        PopulationById, // 传递筛选结果
        style
      },
    }).then(res => {
      const result=res.result;
      const data = result.data[0];
      this.setData({
        ...data,
        swiperList:data.images,
        product:data,
        config: result.config,
        detail: data.detail,
        isLoadingSwiper: false,
        isLoadingContent: false
      });
    })
  },
  previewImage(event) {
    const index = event.currentTarget.dataset.index;
    wx.previewImage({
      current: this.data.swiperList[index], // 当前显示图片的http链接
      urls: this.data.swiperList // 需要预览的图片http链接列表
    });
  },
  onChange(e: any) {
    const { current, source } = e.detail;

    this.setData({
      current,
    });
  },

})
