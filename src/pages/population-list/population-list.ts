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
    stickyProps:{
    },
    types: [
      {
        label: '全部',
        value: 'all',
        infoList: [],
      },
      {
        label: '上衣下裳',
        value: '1',
        infoList: [],
      },
      {
        label: '上下连裳',
        value: '2',
        infoList: [],
      },
      {
        label: '上下通裁',
        value: '3',
        infoList: [],
      },
    ],

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
  onStickyScroll(event) {
    console.log(event.detail);
  },

 // 获取科普列表
 //对简介进行复文本处理，失败了
  // getpopulationList() {
  //   // get('/population/list')
  //      // 将HTTP请求修改为调用微信小程序云函数
  // wx.cloud.callFunction({
  //   // 云函数名称
  //   name: 'getpopulationList',
  //   // 传递给云函数的参数（如果有需要）
  // })
  // .then((data) => {
  //     console.log('===== data', data);
  //     const types:any = [...this.data.types];
      // types[0].infoList = data.map((o: any) => ({
      //   ...o,
      //   title: o.style_name,
      //   src: o.pic_1,
      //   desc:this.getRitch(o.detail)
      // }));
      // data.forEach((o: any) => {
      //   types[Number(o.type_name)].infoList.push({
      //     ...o,
      //     title: o.style_name,
      //     src: o.pic_1,
      //     desc:this.getRitch(o.detail)
      //   })
      // });
  //     this.setData({types})
  //   }).catch((error) => {
  //     console.log('获取活动列表失败:', error);
  //     // 在这里处理错误，例如显示一个错误提示给用户
  //   });
  // },

getpopulationList() {
  wx.cloud.callFunction({
    name: 'getpopulationList',
  }).then(data => {
    console.log('云函数返回值的类型:', typeof data.result); // 应该输出 'object'
    console.log('云函数返回了一个数组:', Array.isArray(data.result)); // 应该输出 true
    const types:any = [...this.data.types];
    types[0].infoList = data.result.map((o: any) => ({
      ...o,
      title: o.style_name,
      src: o.pic_1,
      desc:this.getRitch(o.detail)
    }));
    data.result.forEach((o: any) => {
      types[Number(o.type_name)].infoList.push({
        ...o,
        title: o.style_name,
        src: o.pic_1,
        desc:this.getRitch(o.detail)
      })
    });
    this.setData({types})
  }).catch(error => {
    console.error('获取活动列表失败:', error);
    // 错误处理
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


