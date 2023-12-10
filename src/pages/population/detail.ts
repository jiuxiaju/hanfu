import { aPage } from '@ali/mor-core';
import { get } from '../../services';

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    current: 0,
    duration: 500,
    interval: 5000,
    swiperList: [],
  },
  onLoad(options) {
    console.log('页面参数 options:', options);
    const { PopulationById } = options;
    if (PopulationById) {
      // this.getArticleDetail(PopulationById);
      this.PopulationById = PopulationById;
      this.getArticleDetail();
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
    onShareTimeline:function(){
      return{
        title:'快来看看'
      }
    },

  getArticleDetail() {
    get('/population/detail', { PopulationById:this.PopulationById }).then(res => {
      const { data = {} } = res;
      console.log("🚀 ~ file: detail.ts:24 ~ get ~ data:", data)
      let swiperList: Array<string> = [];
      Object.keys(data).forEach((key: string) => {
        if (/^pic_/.test(key) && data[key]) {
          swiperList.push(data[key]);
        }
      })
      this.setData({
        ...data,
        swiperList,
        detail: app.convertRichText(data.detail),
      });
      // 使用形制名作为标题
      // wx.setNavigationBarTitle({
      //   title: this.data.style_name
      // });
    });
  },

  onChange(e: any) {
    const { current, source } = e.detail;

    this.setData({
      current,
    });
  },

})
