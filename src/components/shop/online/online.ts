/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-08 03:32:18
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/components/shop/online/online.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aComponent } from '@ali/mor-core'
import {  searchOnlineShop, searchShopStyle } from '../../../services/shop';
const options = [
  {
    value: '1',
    label: '淘宝',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01uRn4VL1Oy57aWZzRo_!!6000000001773-2-tps-24-24.png',
  },{
    value: '2',
    label: '拼多多',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01awoIdD1fq9jnbj1aV_!!6000000004057-0-tps-24-24.jpg',
  }, {
    value: '3',
    label: '抖音',
    icon: 'https://gw.alicdn.com/imgextra/i3/O1CN01mT75pL1yJ9tvR5weD_!!6000000006557-2-tps-24-24.png',
  }, {// 4 及以后为假数据
    value: '4',
    label: '京东',
    icon: 'https://gw.alicdn.com/imgextra/i1/O1CN01to53GL1W8LJ2iMnkW_!!6000000002743-2-tps-24-24.png',
  },{
    value: '5',
    label: '微店',
    icon: 'https://gw.alicdn.com/imgextra/i2/O1CN01ZmFC5H1rKLcQlutEv_!!6000000005612-2-tps-24-24.png',
  }, {
    value: '6',
    label: '小红书',
    icon: 'https://gw.alicdn.com/imgextra/i4/O1CN01NzvJMm1L70NKjP0FP_!!6000000001251-2-tps-24-24.png',
  }
];

aComponent({
  props: {
    className: '',
    data: {},
    onClick: () => {},
  },
  data: {
    source: [],
    options,
    styleOptions:[
      {
        value: '衣裳',
        label: '衣裳'
      }
    ],
    list: [],
    style: [],
    sourceLabel: '店铺来源',
    styleLabel: '形制',
  },
  didMount() {
    this.initStyle();
    this.onSearch();
  },
  methods: {
    onClick() {
    },
    handleSourceChange(event) {
      const { value } = event.detail;
      this.setData({
        source: event.detail.value,
        sourceLabel: value?.length ? `店铺来源(${value.length})`  : '店铺来源'
      });
      this.onSearch();
    },
    handleStyleChange(event) {
      const { value } = event.detail;
      this.setData({
        style: value,
        styleLabel: value?.length ? `形制(${value.length})`  : '形制'
      });
      this.onSearch();
    },
    initStyle() {
      searchShopStyle().then(res => {
        this.setData({
          styleOptions: res,
        })
      })
    },
    onSearch() {
      const params: any = {
        store_source: this.data.source,
        style: this.data.style,
      }
      searchOnlineShop(params).then(res => {
        if (res.success) {
          this.setData({
            list: res.data.map((item) => ({
              ...item,
              store: options.find((i: any) => i?.value === item.store_source) || {
                label: '其他'
              }
            })) as any,
          });
        }
      })
    }
  },
})
