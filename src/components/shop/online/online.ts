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
  initStyle () {
    wx.cloud.callFunction({
      name: 'searchShopStyle', // 请替换成您的云函数名
    }).then((res) => {
      console.log(res); // 查看返回数据
      const result = res.result; // 这里接收到的result应该是一个数组
      console.log(result); // 查看返回数据
      this.setData({
        styleOptions: result,
      })
    })
  }, 
    onSearch: function () {
      const params = {
        store_source: this.data.source,
        style: this.data.style,
      };
      // 调用云函数
      wx.cloud.callFunction({
        name: 'searchOnlineShop', // 您在云端定义的函数名
        data: params, // 携带的参数
      }).then(res => {
        const result = res.result; // 云函数返回的结果
        console.log("d")
        // 处理返回的结果，根据实际返回的结构可能需要调整
        if (result && result.success) {
          // 假设返回的列表在 result.data 中，这里也许需要根据实际情况调整
          this.setData({
            list: result.data.map(item => ({
              ...item,
              store: options.find(i => i?.value === item.store_source) || { label: '其他' }
            })),
            showNoData: !result.data.length // 判断搜索结果是否为空
          });
        } else {
          // 请求失败或云函数执行不成功
          this.setData({
            showNoData: true
          });
        }
      }).catch(err => {
        // 处理任何在请求中发生的错误
        console.error('云函数调用失败：', err);
        this.setData({
          showNoData: true
        });
      });
    }



  },
})