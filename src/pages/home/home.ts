import { aPage } from '@ali/mor-core'
import { post } from '../../services';

// 获取全局 app 实例
const app = getApp()
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images';
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
];

aPage({
  data: {
    swiperList,
    activityList: [],
    articleMap: {},
  },
  onLoad() {
    
  },
  jump2Page(e:any) {
    const path = e.currentTarget.dataset.path;
    my.navigateTo({
      url: `/pages/${path}/${path}`,
      fail: () => {
        my.navigateTo({url: '/pages/pageNotFound/pageNotFound'})
      }
    });
  },
})
