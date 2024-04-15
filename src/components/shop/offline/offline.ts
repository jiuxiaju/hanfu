/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:23
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/components/shop/offline/offline.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aComponent } from '@ali/mor-core'
import { searchOfflineShop } from '../../../services/shop';

aComponent({
  props: {
    className: '',
    data: {},
    onClick: () => { },
  },
  data: {
    support: [],
    options: [
      { label: '妆造', value: 'makeup' },
      { label: '摄影', value: 'photo_shoot' },
    ],
    region: [],
    list: [],
    supportLabel: '全部',
    areaLabel: '地区选择'
  },
  didMount() {
    this.onSearch();
  },
  methods: {
    onClick() {
    },
    handleSupportChange(event) {
      const { value } = event.detail;
      this.setData({
        support: event.detail.value,
        supportLabel: value?.length ? value.map((v: string) => this.data.options.find(item => item.value === v)?.label).join(',') : '全部'
      });
      this.onSearch();
    },
    handleRegionChange(event) {
      const { value = [] } = event.detail || {};
      const areaValue = value?.filter((item: any) => item);
      this.setData({
        region: value,
        areaLabel: areaValue?.length ? areaValue.join('-') : '地区选择',
      });
      this.onSearch();
    },
    onSearch() {
      const [city = '', province = ''] = this.data.region;
      const params: any = {
        city,
        province,
      }
      this.data.support.forEach((key) => {
        if (key) {
          params[key] = true;
        }
      })
      console.log(params)
      wx.cloud
        .callFunction({
          // 云函数名称
          name: "searchOfflineShop",
          // 传给云函数的参数
          data: params,
        })
        .then(res => {
          // console.log(res.result); // 3
          const result = res.result; // 云函数返回的结果
          if (result && result.success) {
            this.setData({
              list: result.data as any,
              showNoData: !(result.data && result.data.length > 0) // 判断搜索结果是否为空
            }) 
            else {
            this.setData({
              showNoData: true
            });
          }
        }
        })
    }
  }
})


