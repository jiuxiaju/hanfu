import { aPage } from '@ali/mor-core'
import { get } from '../../services';

// 获取全局 app 实例
const app = getApp();
const titleMap: any = {
  about_us: '关于我们',
  FAQ: '常见问题',
  log: '更新日志',
}

aPage({
  data: {
    title: '',
    detail: '',
  },
  onLoad(options: { id: string, detailKey: string}) {
    const { id, detailKey } = options;
    if (id && detailKey) {
      const title = titleMap[detailKey] || '九霞裾';
      my.setNavigationBar({
        title,
      });
      this.setData({
        title,
      })
      this.getDetail({ detailKey, id });
    }
  },
  getDetail(params: { detailKey: string | number, id: string | number}) {
    get('/my/center/detail', params).then(res => {
      const { data = {}, success } = res;
      if (data && success) {
        console.log("🚀 ~ file: detail.ts:28 ~ get ~ detail:", data);
        const convertDetail = app.convertRichText(data.detail);

        this.setData({
          detail: convertDetail,
        });
      }
    });
  },
})
