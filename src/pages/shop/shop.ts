/*
 * @Author: 兼爱
 * @Date: 2023-09-18 20:49:48
 * @LastEditTime: 2023-11-15 03:05:57
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/pages/shop/shop.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aPage } from '@ali/mor-core'
enum ShopType {
  offline = 'offline',
  online = 'online',
};

const tabList = [{
  key: ShopType.offline,
  label: '实体店',
}, {
  key: ShopType.online,
  label: '网店'
}]

aPage({
  data: {
    tabList,
    filter: {},
    list: [] as any[],
    stickyProps: {},
    currentTab: ShopType.offline,
    showLoading: true // 初始时显示加载动画
  },
  onLoad() {
    setTimeout(() => {
      this.setData({
        showLoading: false // 1.5秒后隐藏加载动画
      });
    }, 500); 
  },
  onTabsChange(e) {
    this.setData({
      currentTab: e.detail.value
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
});
