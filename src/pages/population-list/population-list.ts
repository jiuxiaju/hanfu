// import { aPage } from '@ali/mor-core'
// import { post } from '../../services'

// aPage({
//   data: {
//     // types: [
//     //   {
//     //     label: '全部',
//     //     value: 'all',
//     //   },
//     //   {
//     //     label: '上衣下裳',
//     //     value: '1',
//     //   },
//     //   {
//     //     label: '上下连裳',
//     //     value: '2',
//     //   },
//     //   {
//     //     label: '上下通裁',
//     //     value: '3',
//     //   },
//     // ],
//     recommendArticles: {},
//   },
//   onLoad() {
//     post('/population/list').then((dataSource) => {
//       this.setData({ dataSource })
//     })
//   },
//   onTap(info: any) {
//     console.log('=====  onTap', info)
//     my.navigateTo({
//       url: `/pages/article-detail/article-detail?id=${info.key}`,
//       fail: () => {
//         my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
//       },
//     })
//   },
// })
import { aPage } from '@ali/mor-core'
import { get } from '../../services'



// 获取全局 app 实例
const app = getApp()
interface InfoList {
  label: string
  value: any
  key: string
}
aPage({
  data: {
    infoList: [],
  },
  onLoad() {
    this.getpopulationList()
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
        path: '/pages/home',
        promise 
      }
    },
    //转发到朋友圈
    onShareTimeline:function(){
      return{
        title:'快来看看'
      }
    },
  onPullDownRefresh() {
    this.getpopulationList()
  },

 // 获取科普列表
 //对简介进行复文本处理，失败了
  getpopulationList() {
    get('/population/list').then((data) => {
      console.log('===== data', data);
      this.setData({
        infoList: data.map((o: any) => ({
          ...o,
          title: o.style_name,
          src: o.pic_1,
          desc:this.getRitch(o.detail)
        })),
      });
    }).catch((error) => {
      console.log('获取活动列表失败:', error);
      // 在这里处理错误，例如显示一个错误提示给用户
    });
  },
  getRitch(rich:any) {
    if (!rich) {
      return ''
    }
    const richClone = rich.replace(/<[^>]*>/g, "")
    return richClone;
  },
  

  onTapActivity(Populationobj: any) {
    my.navigateTo({ url: `/pages/population/detail?PopulationById=${Populationobj._id}` })
  },
})


