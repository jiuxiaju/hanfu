import { aPage } from '@ali/mor-core'
import { get } from '../../services'

import dayjs from 'dayjs'

aPage({
  data: {
    swiperList: [],
    swiperData: [],
    activityList: [],
    recommendArticles: [],
  },
  onLoad() {
    // 获取广告位图片
    get('/home/getBannerImgs').then((data) => {
      this.setData({ swiperList: data.map((o: any) => o.url), swiperData: data })
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

    // 获取推荐文章
    get('/home/getArticles').then((data:any) => {
      const data0 = data[0].map((o:any) => ({...o, article2: this.getRitch(o.article)}));
      const data1 = data[1].map((o:any) => ({...o, article2: this.getRitch(o.article)}));
      const data2 = data[2].map((o:any) => ({...o, article2: this.getRitch(o.article)}));
      const recommendArticles:any = [data0, data1, data2];
      this.setData({
        recommendArticles
      })
    })
  },
  onTapSwiper(e: any) {
    const { jump, jump_link }: any = this.data.swiperData[e.detail.index]
    console.log('=====  this.data.swiperList[index]', this.data.swiperData[e.detail.index])
    switch (jump) {
      case '1':
        my.navigateTo({
          url: `/pages${jump_link}`,
          fail: () => {
            my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
          },
        })
        break
      default:
        break
    }
  },
  getRitch(rich:any) {
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
        my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
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
