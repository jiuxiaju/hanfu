import { aPage } from '@ali/mor-core'

aPage({
  data: {
    image: 'https://tdesign.gtimg.com/mobile/demos/empty1.png',
    query: '',
    currentTab: 'all',
    showSearchResult: false, // 是否展示搜索结果
    queryHistoryArr: [] as string[], // 搜索历史
  },
  onLoad() {
    const { data: queryHistoryArr } = my.getStorageSync({ key: 'queryHistory' }) as any
    this.setData({ queryHistoryArr: queryHistoryArr || [] })
  },
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
        this.setData({
          infos: res.result,
          currentTab: tab,
          query,
          showSearchResult: true,
        })
        this.updateQueryHistory(query)
        my.hideLoading()
      })
      .catch(() => {
        my.hideLoading()
      })
  },
  onTabsChange(e: { detail: { value: string | undefined } }) {
    this.queryInfos(this.data.query, e.detail.value)
  },
  // 更新历史搜索记录
  updateQueryHistory(query?: string) {
    if (!query) {
      return
    }
    const queryHistoryArr = [...this.data.queryHistoryArr]
    const queryIndex = queryHistoryArr.indexOf(query)
    if (queryIndex !== -1) {
      queryHistoryArr.splice(queryIndex, 1)
    }
    const newLen = queryHistoryArr.unshift(query)
    if (newLen > 50) {
      queryHistoryArr.pop()
    }
    this.setData({ queryHistoryArr })
    my.setStorage({
      key: 'queryHistory',
      data: queryHistoryArr,
    })
  },
  onSearchHistory(e: { currentTarget: { dataset: { query: string | undefined } } }) {
    this.queryInfos(e.currentTarget.dataset.query)
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
