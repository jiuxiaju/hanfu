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
  },
  onLoad() {
  },
  jump2Page(e:any) {
    const { path, detailkey } = e.currentTarget.dataset || {};
    if (detailkey === 'suggest') {
      my.openEmbeddedMiniProgram({
        appId: "wx8abaf00ee8c3202e",
        extraData :{
          // 产品ID
          id : "612747",
          // 自定义参数，具体参考文档
          customData : {}
        }
      });
    } else {
      my.navigateTo({
        url: `${path}&detailKey=${detailkey}`,
        fail: () => {
          my.navigateTo({url: '/pages/pageNotFound/pageNotFound'})
        }
      });
    }
  },
})
