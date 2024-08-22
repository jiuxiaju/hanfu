import { aPage } from '@ali/mor-core'
import { get } from '../../../services'
import dayjs from 'dayjs'
// import area from './area'
import area from '/assets/area'
// import { TRGNodeAny } from 'XrFrame/render-graph/RGNode'

// 获取全局 app 实例
const app = getApp()

function calculateStatus(startTime, endTime) {
  const now = dayjs();
  const start = dayjs(startTime);
  const end = dayjs(endTime);

  if (now.isBefore(start)) {
    return '未开始'; // 活动尚未开始
  } else if (now.isAfter(end)) {
    return '已结束'; // 活动已经结束
  } else {
    return '进行中'; // 活动正在进行中
  }
}

const STATUS_KEY_MAP: any = {
  '已结束': 3,
  '未开始': 1,
  '进行中': 2,
}

aPage({
  data: {
    typeList: [
      {
        value: '',
        label: '所有类型',
      },
      {
        value: '1',
        label: '文化体验类',
      },
      {
        value: '2',
        label: '教育研习类',
      },
      {
        value: '3',
        label: '社交联谊类',
      },
    ],
    statusList: [
      {
        value: '',
        label: '所有状态',
      },
      {
        value: '未开始',
        label: '未开始',
      },
      {
        value: '进行中',
        label: '进行中',
      },
      {
        value: '已结束',
        label: '已结束',
      },
    ],
    showLoading: true,        // 用于显示加载动画
    provinceList: [],
    filter: {
      type: '',
      status: '',
      area: ['', ''],
    },
    value: ['0', '0-0'],
    list: [],
    area: ['', ''],
    config: {
      "activity_set": {
        "fields": ["detail","address"],
        "displayValuesOnly": ["detail"],
        "fieldLabels": { "address": "地址" }
      },
    }, 
    displayList: [], //每次加载的数据
    batchSize: 10, // 每批次加载的数据量
    currentDisplayCount: 0, // 当前已显示的数据数量
    cardData:[
    ],
    rowColsAvatar: [{ size: '100px', type: 'circle' }], // 定义骨架屏头像部分的占位
    rowColsImage: [{ size: '100px', type: 'rect' }],    // 定义骨架屏图像部分的占位
    rowColsContent: [{ width: '80%' }, { width: '100%' }, { width: '80%' }] , // 定义骨架屏内容部分的占位
  },
  onLoad() {
    this.getArea()
    this.getActivityList()
    this.getCurrentPagePath();
  },
  //分享给好友
  onShareAppMessage() {
    this.getCurrentPagePath();
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
  onShareTimeline: function () {
    return {
      title: '快来看看'
    }
  },
  onScrollViewScroll: function (e) {
    const scrollTop = e.detail.scrollTop; // 用户当前已滚动的距离
    const scrollHeight = e.detail.scrollHeight; // scroll-view 内容的总高度
    const scrollViewHeight = 700; // scroll-view 的固定高度
    const triggerHeight = 200; // 触发加载数据的提前量（距底部 200px）

    // 检查是否接近底部，并触发数据加载
    if (scrollTop + scrollViewHeight >= scrollHeight - triggerHeight) {
      console.log('接近底部，加载更多数据...');
      // this.loadMoreData();
      this.onScrollToLower();
    }
  },
  onScrollToLower: function () {
    // 当滑动到页面底部时触发
    console.log('我执行了')
    const { list, displayList, currentDisplayCount, batchSize } = this.data;
    console.log(currentDisplayCount, 'currentDisplayCount',)
    const nextDisplayCount = currentDisplayCount + batchSize;
    if (currentDisplayCount < list.length) {
      // 有更多数据可以加载
      const moreData = list.slice(currentDisplayCount, nextDisplayCount);
      this.setData({
        displayList: displayList.concat(moreData),
        currentDisplayCount: nextDisplayCount, // 更新已显示的数据数量
      });
    }
  },
  getCurrentPagePath() {
    const pages = getCurrentPages();  //获取加载的页面
    const currentPage = pages[pages.length - 1];  //获取当前页面的对象
    const url = `/${currentPage.route}`;  //当前页面url

    console.log(url,'url')
    return url;
  
  },
  onPullDownRefresh() {
    this.getActivityList({})
  },
  getArea() {
    const provinceList: any = area.provinceList.map((province: any) => ({
      label: province.fullName,
      value: province.fullName,
      children: province.directCityList.map((city: any) => ({
        label: city.fullName,
        value: city.fullName,
      })),
    }))
    this.setData({ provinceList });
  },
  getActivityList(filter?: any) {
    const requestParam = filter || this.data.filter
    if (!requestParam.type) {
      delete requestParam.type
    }
    if (!requestParam.status) {
      delete requestParam.status
    }
    // 调整area的入参格式
    if (requestParam.area) {
      requestParam.region = requestParam.area.join(',')
    }
    if (requestParam.region === ',') {
      delete requestParam.region
    }
    delete requestParam.area
    console.log(requestParam)
    wx.cloud.callFunction({
      name: 'onsearchActicity', // 云函数名称
      data: requestParam, // 携带的参数
    }).then((res) => {
      const result = res.result.data; // 云函数返回的结果
  console.log(result,'result')
      // 更新组件的 state
      this.setData({
        list: result,      
        displayList: result.slice(0, this.data.batchSize),// 初始分批显示的数据
        showLoading: false,     // 数据加载完毕，隐藏加载动画
        currentDisplayCount:10,
        config:res.result.config
      });
      // 打印处理后的数据列表
      console.log('Updated Info List:', this.data.displayList);
    }).catch((error) => {
      console.error('Error calling cloud function:', error);
      this.setData({ showLoading: false }); // 处理错误时, 隐藏加载动画
    });
    
  },
  onChangeTypeFilter(e: any) {
    const filter = {
      ...this.data.filter,
      type: e.detail.value,
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },

  onChangeStatusFilter(e: any) {
    const filter = {
      ...this.data.filter,
      status: e.detail.value,
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },
  onChangeAreaFilter(e: any) {
    const { value } = e.detail
    this.setData({ area: value })
  },
  defaultTap() {
    const filter = {
      ...this.data.filter,
      area: ['', ''],
    }
    this.setData({ filter, area: ['', ''] })
    this.getActivityList(filter)
    this.mockCloseDropDownMenu();
  },
  primaryTap() {
    const filter = {
      ...this.data.filter,
      area: this.data.area,
    }
    this.setData({ filter })
    this.getActivityList(filter)
    this.mockCloseDropDownMenu();
  },
  mockCloseDropDownMenu() {
    const drowItemRef = this.selectComponent('#test');
    drowItemRef.$parent?.setData({
      activeIdx: -1,
    });
    drowItemRef.setData({
      show: false,
    });
    drowItemRef.triggerEvent('close');
  },
  handleItemClick(event) {
    const Item = event.detail;
    console.log(Item._id,'Item._id')
    my.navigateTo({
      url: `/pages/activity-list/detail/index?activityId=${Item._id}`,
    })
  }
})


