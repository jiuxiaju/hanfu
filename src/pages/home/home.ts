import { aPage } from '@ali/mor-core'
import { post, get } from '../../services'
import dayjs from 'dayjs'

// 获取全局 app 实例
const app = getApp()
const imageCdn = 'https://tdesign.gtimg.com/miniprogram/images'
const swiperList = [
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
  `${imageCdn}/swiper2.png`,
  `${imageCdn}/swiper1.png`,
]

aPage({
  data: {
    swiperList,
    activityList: [],
    articleMap: {},
  },
  onLoad() {
    // 获取近期活动
    get('/home/getActivities', {}).then((data) => {
      this.setData({
        activityList: data.map((o: any) => ({
          title: o.name,
          desc: o.detail.replace('<p>', '').replace('</p>', ''),
          url: o.cover,
          rangeDate: `${dayjs(o.startTime).format('MM月DD日')}~${dayjs(o.emdTime).format(
            'MM月DD日'
          )}`,
        })),
      })
    })
  },
  jump2Page(e: any) {
    const path = e.currentTarget.dataset.path
    my.navigateTo({
      url: `/pages/${path}/${path}`,
      fail: () => {
        my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
      },
    })
  },
})
