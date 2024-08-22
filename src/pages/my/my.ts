import { aPage } from '@ali/mor-core';

// 获取全局 app 实例
const app = getApp()
const jumpId = '962d008f65104fda03efc6ac35f7769b';
const path = `/pages/my/center?id=${jumpId}`;

const jumpList = [
  {
    path,
    text: '关于我们',
    key: 'about_us',
  },
  {
    path,
    text: '常见问题',
    key: 'FAQ',
  },
  {
    path,
    text: '更新日志',
    key: 'log',
  },
  {
    path: 'suggesst',
    text: '意见反馈',
    key: 'suggest',
  },
];

aPage({
  data: {
    jumpList,
    tIconClass: ['my-icon'],
    userInfo: {},
  },
  onLoad() {
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
      path: '',
      promise
    }
  },
  jump2Page(e: any) {
    const { path, detailkey } = e.currentTarget.dataset || {};
    if (detailkey === 'suggest') {
      my.openEmbeddedMiniProgram({
        appId: "wx8abaf00ee8c3202e",
        extraData: {
          // 产品ID
          id: "612747",
          // 自定义参数，具体参考文档
          customData: {}
        }
      });
    } else {
      my.navigateTo({
        url: `${path}&detailKey=${detailkey}`,
        fail: () => {
          my.navigateTo({ url: '/pages/pageNotFound/pageNotFound' })
        }
      });
    }
  },
  //点击头像区域，触发登陆流程。
  onTapLogin: function () {
    // 调用 wx.login 获取临时登录凭证 (code)
    // wx.login({
    //   success: loginRes => {
    //     if (loginRes.code) {
    //       // 调用云函数进行登录
    //       wx.cloud.callFunction({
    //         name: 'login',
    //         data: { code: loginRes.code },
    //         success: res => {
    //           // 这里得到云函数返回的结果，包括用户的 openId 等
    //           console.log('云函数登录成功：', res);
    //         },
    //         fail: err => {
    //           console.error('云函数调用失败', err);
    //         }
    //       });
    //     } else {
    //       console.error('wx.login 失败', loginRes.errMsg);
    //     }
    //   },
    //   fail: err => {
    //     console.error('wx.login 接口调用失败', err);
    //   }
    // });
    console.log('获取')
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.setData({

          userInfo: res.userInfo,

    
        })

      }
    })
  
    
  },
  onTapLogo() {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    console.log('获取')
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo)
        this.setData({

          userInfo: res.userInfo,

    
        })

      }
    })
  },

})
