import { aApp } from '@ali/mor-core'

aApp({
  todos: [
    { text: 'Learning Javascript', completed: true },
    { text: 'Learning ES2016', completed: true },
    { text: 'Learning 支付宝小程序', completed: false },
  ],

  userInfo: null as unknown as Record<string, any>,

  getUserInfo() {
    return new Promise((resolve, reject) => {
      if (this.userInfo) resolve(this.userInfo)

      my.getAuthCode({
        scopes: ['auth_user'],
        success: (authcode) => {
          console.info(authcode)

          my.getOpenUserInfo({
            success: (res) => {
              this.userInfo = res
              resolve(this.userInfo)
            },
            fail: () => {
              reject({})
            },
          })
        },
        fail: () => {
          reject({})
        },
      })
    })
  },

  onLaunch() {
    console.log("🚀 ~ file: app.ts:39 ~ onLaunch ~ onLaunch:")
    this.initCloud();
  },

  initCloud() {
    wx.cloud.init({
      env: 'jiuxiaju-7ghefl5n6fc39431',
    });
    console.log("🚀 ~ file: app.ts:47 ~ initCloud ~ wx.cloud:", wx.cloud)
  },
  /**
   * 转换富文本text
   * @param text
   * @returns
   */
  convertRichText(text: string){
    if (text && typeof text === 'string') {
      // 处理图片宽度
      return text.replace(/<(img).*?(\/>|<\/img>)/g, function (mats) {
        if (mats.indexOf('style') < 0) {
          return mats.replace(/<\s*img/, '<img style="max-width:100%;height:auto;"');
        } else {
          return mats.replace(/style=("|')/, 'style=$1max-width:100%;height:auto;')
        }
      });
    }
    return text
  },
})
