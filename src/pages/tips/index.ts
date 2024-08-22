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
aComponent({

  data: {
    buttons: [

  ]
  },
  didMount() {
    wx.cloud. callFunction({
      // 云函数名称
      name: 'tips',
      // 传给云函数的参数
    }).then(res => {
      // 处理云函数成功返回的结果
      console.log("云函数调用成功：", res);
      const result = res.result; // 这是云函数返回的数据
      console.log(result,'云函数调用成功：-data')
      this.setData({
        buttons:result.data,
        description:result.description
      })
    });
  },
  methods: {
    handlePopup(e) {
        const { item } = e.currentTarget.dataset;
        this.setData(
          {
            cur: item,
          },
          () => {
            this.setData({ visible: true });
          },
        );
      },
      onVisibleChange(e) {
        console.log('visiblevisiblevisiblevisibleddd')
        this.setData({
          visible: e.detail.visible,
        });
      },
      handleButtonTap(e) {
        const { type, appId, path,extraData } = e.currentTarget.dataset;
        if (type === 'external') {
          wx.openEmbeddedMiniProgram({
            appId: appId,
            path: path,
            extraData:extraData,
            success(res) {
              console.log('跳转成功', res);
            },
            fail(err) {
              console.error('跳转失败', err);
            }
          });
        } else if (type === 'internal') {
          wx.navigateTo({
            url: path
          });
        }
      }
  }
})