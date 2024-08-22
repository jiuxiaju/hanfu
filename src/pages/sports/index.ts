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
        path: 'pages/shop/shop',
        promise 
      }
    },
    //转发到朋友圈
    onShareTimeline:function(){
      return{
        title:'快来看看'
      }
    },
})
