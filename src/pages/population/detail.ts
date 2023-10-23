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
    const { id } = options;
    if (id) {
      this.getArticleDetail(id);
    }
  },

  getArticleDetail(id: string | number) {
    get('/population/detail', { id }).then(res => {
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
    });
  },

  onChange(e: any) {
    const { current, source } = e.detail;

    this.setData({
      current,
    });
  },

})
