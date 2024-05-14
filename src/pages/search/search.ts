import { aPage } from '@ali/mor-core'

aPage({
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
    query: '',
    currentTab: 'all',
    types: [
      {
        label: '综合',
        value: 'all',
        infoList: [],
      },
      {
        label: '实体店',
        value: '1',
        infoList: [],
      },
      {
        label: '网店',
        value: '2',
        infoList: [],
      },
      {
        label: '科普',
        value: '3',
        infoList: [],
      },
      {
        label: '活动',
        value: '4',
        infoList: [],
      },
      {
        label: '文章',
        value: '5',
        infoList: [],
      },
    ],
    knowledgeKeyMap: {
      title: 'style_name',
      src: 'pic_1',
    },
    activityKeyMap: {
      title: 'name',
      src: 'cover',
    },
  },
  onLoad() {},
  queryInfos(query: string = this.data.query, tab: string = this.data.currentTab) {
    my.showLoading({ content: '搜索中' })
    wx.cloud
      .callFunction({
        // 云函数名称
        name: 'hui',
        // 传给云函数的参数
        data: {
          query, // 这是要传递的query
          tab: tab === 'all' ? undefined : tab,
        },
      })
      .then((res) => {
        // 拆解搜索结果
        this.setData({
          infos: res.result,
          currentTab: tab,
          query,
        })
        my.hideLoading()
      })
      .catch(() => {
        my.hideLoading()
      })
  },
  onTabsChange(e) {
    this.queryInfos(this.data.query, e.detail.value)
  },
  onTapKnowledge(item: any) {
    my.navigateTo({
      url: `/pages/population/detail?PopulationById=${item._id}`,
    })
  },
  onTapActivity(item: any) {
    my.navigateTo({
      url: `/pages/activity/detail?activityId=${item._id}`,
    })
  },
  onTapArticle(article: any) {
    my.navigateTo({
      url: `/pages/article/detail?articleId=${article._id}`,
    })
  },
})
