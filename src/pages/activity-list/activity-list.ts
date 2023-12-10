import { aPage } from '@ali/mor-core'
import { get } from '../../services'
import dayjs from 'dayjs'
import area from './area'
import { TRGNodeAny } from 'XrFrame/render-graph/RGNode'

// 获取全局 app 实例
const app = getApp()
interface InfoList {
  label: string
  value: any
  key: string
}

const chineseNumber = '一二三四五六七八九十'.split('')

const generateTree = function (deep = 0, count = 10, prefix?: any) {
  const ans = []

  for (let i = 0; i < count; i += 1) {
    const value = prefix ? `${prefix}-${i}` : `${i}`
    const rect: any = {
      label: `选项${chineseNumber[i]}`,
      value,
    }

    if (deep > 0) {
      rect.children = generateTree(deep - 1, 10, value)
    }
    ans.push(rect)
  }

  return ans
}

const STATUS_KEY_MAP:any = {
  '已结束': 3,
  '未开始': 1,
  '进行中': 2,
}

aPage({
  data: {
    type: [
      {
        value: '',
        label: '所有类型',
      },
      {
        value: '1',
        label: '第一类',
      },
      {
        value: '2',
        label: '第二类',
      },
      {
        value: '3',
        label: '第三类',
      },
    ],
    status: [
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
    options: generateTree(1),
    value: ['0', '0-0'],
    infoList: [],
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
    requestParam.region = requestParam.area.join(',')
    if (requestParam.region === ',') {
      delete requestParam.region
    }
    delete requestParam.area
    get('/activity/list', requestParam).then((data) => {
      console.log('=====  data', data)
      this.setData({
        infoList: data.map((o: any) => ({
          ...o,
          title: o.name,
          src: o.cover,
          rangeDate: `${dayjs(o.startTime).format('YYYY-MM-DD')}~${dayjs(o.emdTime).format(
            'YYYY-MM-DD'
          )}`,
          statusKey: STATUS_KEY_MAP[o.status],
        })),
      })
    })
  },

  onChangeTypeFilter(e: any) {
    console.log('=====  onChangeTypeFilter', e.detail.value)
    const filter = {
      ...this.data.filter,
      type: e.detail.value,
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },

  onChangeStatusFilter(e: any) {
    console.log('=====  onChangeStatusFilter', e.detail.value)
    const filter = {
      ...this.data.filter,
      status: e.detail.value,
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },

  onChangeAreaFilter(e: any) {
    const { value, level } = e.detail
    const filter = {
      ...this.data.filter,
    }
    if (level) {
      filter.area = value
    } else {
      filter.area = [value[0], '']
    }
    this.setData({ filter })
  },
  defaultTap() {
    const filter = {
      ...this.data.filter,
      area: ['', ''],
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },
  primaryTap() {
    const filter = {
      ...this.data.filter,
    }
    this.setData({ filter })
    this.getActivityList(filter)
  },

  onTapActivity(activityObj: any) {
    my.navigateTo({ url: `/pages/activity/detail?activityId=${activityObj._id}` })
  },
})


