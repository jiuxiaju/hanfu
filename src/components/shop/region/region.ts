/*
 * @Author: 兼爱
 * @Date: 2023-10-24 01:56:21
 * @LastEditTime: 2023-12-04 04:04:40
 * @LastEditors: 兼爱
 * @Description: 
 * @FilePath: /hanfu/src/components/shop/region/region.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
import { aComponent } from '@ali/mor-core'
import area from '/assets/province-city.json'

const generateTree = (list: any[]): any[] => {
  return list.map((item) => ({
    ...item,
    label: item.name,
    value: item.name,
    children: generateTree(item.children || [])
  }))
};

aComponent({
  props: {
    onSelect: (data) => {},
  },
  data: {
    options: generateTree(area),
    value: [,],
  },

  methods: {
    onChange(e) {
      this.props.onSelect(e);
      this.setData({
        value: e.detail.value,
      });
    },
    reset(e) {
      this.props.onSelect({
        detail: {
          value: [,],
        }
      })
      this.setData({
        value: [,],
      })
    }
  },
});
