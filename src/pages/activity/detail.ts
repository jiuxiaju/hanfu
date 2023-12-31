import { aPage } from '@ali/mor-core';
import { get } from '../../services';
import dayjs from 'dayjs';

// 获取全局 app 实例
const app = getApp()
interface InfoList {
  label: string,
  value: any,
  key: string,
}

aPage({
  data: {
    infoList: [],
  },
  onLoad(options) {
    const { activityId } = options;
    if (activityId) {
      this.getActivityDetail(activityId);
    }
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
  getActivityDetail(activityId: string | number) {
    get('/activity/detail', { activityId }).then(res => {
      const { data = {}, success } = res;
      if (data && success) {
        const acData = this.handleDetailData(data);
        console.log("🚀 ~ file: detail.ts:28 ~ get ~ detail:", acData)

        this.setData({
          ...acData,
        });
      }
    });
  },
  

  handleDetailData(acData: any) {
    const { startTime, emdTime, address, sponsor, tele } = acData;
    const startTimeFormat = dayjs(startTime).format('YYYY-MM-DD HH:mm');
    const endTimeFormat = dayjs(emdTime).format('YYYY-MM-DD HH:mm');

    const infoList: Array<InfoList> = [
      {
        value: sponsor,
        label: '主办方',
        key: 'sponsor',
      },
      {
        value: `${startTimeFormat}-${endTimeFormat}`,
        label: '活动时间',
        key: 'time',
      },
      {
        value: address,
        label: '活动地址',
        key: 'address',
      },
      {
        value: tele,
        label: '联系方式',
        key: 'tele',
      },
    ];

    return Object.assign(acData, {
      detail: app.convertRichText(acData.detail),
      infoList,
    });
  },
})
