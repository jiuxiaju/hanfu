import { aPage } from '@ali/mor-core'
import { post } from '../../services'

aPage({
  data: {
    types: [
      {
        label: '全部',
        value: 'all',
      },
      {
        label: '上衣下裳',
        value: '1',
      },
      {
        label: '上下连裳',
        value: '2',
      },
      {
        label: '上下通裁',
        value: '3',
      },
    ],
    dataSource: {},
  },
  onLoad() {
    post('/population/list').then((dataSource) => {
      this.setData({ dataSource })
    })
  },
  onTap(info: any) {
    console.log('=====  onTap', info)
    my.navigateTo({
      url: `/pages/article-detail/article-detail?id=${info.key}`,
      fail: () => {
        my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
      },
    })
  },
})
