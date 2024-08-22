import { aPage } from '@ali/mor-core';
import { get } from '../../../services';
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
    showOverlay: false, // 控制覆盖层显示的数据绑定变量
    essentialInfo: [],
    sponsor: '',
    time: '',
    address: '',
  },
  onLoad(options) {
    this.getCurrentPagePathWithArgs()
    const { activityId } = options;
    if (activityId) {
      this.getActivityDetail(activityId);
    };
  },
  getCurrentPagePathWithArgs() {
    const pages = getCurrentPages(); // 获取加载的页面
    const currentPage = pages[pages.length - 1]; // 获取当前页面的对象
    const url = `/${currentPage.route}`; // 当前页面url

    // 获取页面参数
    const options = currentPage.options;
    const queryParameters = Object.keys(options)
      .map(key => `${key}=${options[key]}`)
      .join('&');
    const aa = `${url}?${queryParameters}`;
    console.log('aa', aa)
    return `${url}?${queryParameters}`;
  }
  ,
  showOverlay() {
    // 假设infoList是已经在data中或作为实例属性定义好的
    const { infoList } = this.data;  // 或使用 this.infoList 如果infoList是实例属性
    // 从infoList数组中获取需要的数据
    const sponsor = infoList.find(item => item.key === 'sponsor')?.value || '未知主办方';
    const time = infoList.find(item => item.key === 'time')?.value || '未知时间';
    const address = infoList.find(item => item.key === 'address')?.value || '未知地址';

    // 设置获取到的值以及显示覆盖层
    this.setData({
      sponsor: sponsor,
      time: time,
      address: address,
      showOverlay: true, // 显示覆盖层
    });
    console.log(time),
      // 设置3秒后自动隐藏覆盖层
      setTimeout(() => {
        this.setData({
          showOverlay: false, // 隐藏覆盖层
        });
      }, 40000); // 3000毫秒后执行
  },
  // 转发至好友
  onShareAppMessage() {
    const app = getApp(); // 获取全局应用实例

    const promise = new Promise(resolve => {
      app.generateShareInfo().then(shareInfo => {
        // 在这里处理生成的分享信息
        resolve(shareInfo);
      });
    });

    return {
      title: '九霞裾',
      path: '/pages/home', // 这个值会被 promise 里面的 pathWithArgs 覆盖
      promise
    };
  },
  //转发到朋友圈
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  getActivityDetail(activityId: string | number) {
    console.log('我开始了1')
    get('/activity/detail', { activityId }).then(res => {
      console.log('我开始了1')
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
  handleTap() {
    this.showOverlay(); // 先调用 showOverlay
    //希望在点击的时候，海报先显示出来，然后保存。
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
