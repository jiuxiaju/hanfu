import { aPage } from '@ali/mor-core'
import { post, get } from '../../services'

import dayjs from 'dayjs'

// 获取全局 app 实例
const app = getApp()

aPage({
  data: {
    swiperList: [],
    activityList: [],
    recommendArticles: [],
  },
  onLoad() {
    // 获取广告位图片
    get('/home/getBannerImgs').then((data) => {
      this.setData({ swiperList: data.map((o: any) => o.url) })
    })

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

    // 获取推荐文章
    get('/home/getArticles').then((recommendArticles) => {
      console.log('=====  data', recommendArticles)
      this.setData({ recommendArticles })
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
