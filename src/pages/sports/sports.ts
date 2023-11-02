import { aPage } from '@ali/mor-core'
import { get } from '../../services'

aPage({
  data: {
    articles: {},
  },
  onLoad() {
    get('/sports/getSports').then((articles) => {
      console.log('=====  articles', articles)
      this.setData({ articles: articles[0] })
    })
  },
})
