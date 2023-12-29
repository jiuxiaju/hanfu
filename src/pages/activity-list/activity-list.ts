import { aPage } from '@ali/mor-core'
import { get } from '../../services'
import dayjs from 'dayjs'
import area from './area'
import { TRGNodeAny } from 'XrFrame/render-graph/RGNode'

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

const STATUS_KEY_MAP:any = {
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
    provinceList: [],
    filter: {
      type: '',
      status: '',
      area: ['', ''],
    },
    value: ['0', '0-0'],
    infoList: [],
    area: ['', ''],
  },
  onLoad() {
    this.getArea()
    this.getActivityList()
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
    this.getActivityList({})
  },

  getArea() {
    const provinceList:any = area.provinceList.map((province: any) => ({
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
    get('/activity/list', requestParam).then((data) => {
      this.setData({
        infoList: data.map((o: any) => ({
          ...o,
          title: o.name,
          src: o.cover,
          rangeDate: `${dayjs(o.startTime).format('YYYY-MM-DD')}~${dayjs(o.emdTime).format(
            'YYYY-MM-DD'
          )}`,
          // statusKey: STATUS_KEY_MAP[o.status],
          status: calculateStatus(o.startTime, o.emdTime),
          statusKey: STATUS_KEY_MAP[calculateStatus(o.startTime, o.emdTime)],
        })),
      })
    })
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

  onTapActivity(activityObj: any) {
    my.navigateTo({ url: `/pages/activity/detail?activityId=${activityObj._id}` })
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
})


